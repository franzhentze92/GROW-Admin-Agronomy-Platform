import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnalyses } from '@/lib/analysisApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertCircle, ChevronsUpDown, ArrowUp, ArrowDown, PlusCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import KpiCard from '@/components/metrics/KpiCard';
import { Calendar, CheckCircle2, CircleDot, FileText, Leaf } from 'lucide-react';
import { Gantt, Task as GanttTask, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnalysisFormDialog } from '@/components/analysis/AnalysisFormDialog';
import { ViewAnalysisDialog } from '@/components/analysis/ViewAnalysisDialog';
import { Analysis } from '@/lib/types';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabaseClient';
import { PostgrestResponse } from '@supabase/supabase-js';
import { CONSULTANTS, CROP_OPTIONS, CATEGORY_OPTIONS } from '@/lib/constants';

// UI Analysis interface for Gantt chart
export interface AnalysisTask {
  id: string;
  client_name: string;
  consultant: string;
  analysis_type: 'soil' | 'leaf';
  category: string;
  crop: string;
  status: 'Draft' | 'Ready to be Checked' | 'Checked Ready to be Emailed' | 'Emailed';
  startDate: Date;
  endDate: Date;
  created_at: string;
}

// Sorting types
type SortDirection = 'asc' | 'desc';
type SortableAnalysisKey = keyof AnalysisTask;
interface SortConfig {
  key: SortableAnalysisKey;
  direction: SortDirection;
}

const getStatusBadgeVariant = (status: AnalysisTask['status']): 'success' | 'warning' | 'destructive' | 'default' => {
    switch (status) {
        case 'Emailed': return 'success';
        case 'Checked Ready to be Emailed': return 'warning';
        case 'Ready to be Checked': return 'default';
        case 'Draft': return 'destructive';
        default: return 'default';
    }
};

// Custom components for Gantt Chart list view
const CustomTaskListHeader: React.FC<{ headerHeight: number; fontFamily: string; fontSize: string; rowWidth: string; }> = ({ headerHeight, fontFamily, fontSize, rowWidth }) => (
    <div className="gantt-task-list-header flex items-center bg-muted/50 border-b" style={{ height: headerHeight, fontFamily, fontSize, width: rowWidth }}>
        <div className="gantt-task-list-header-cell pl-2 font-semibold">Analysis</div>
    </div>
);

const CustomTaskListTable: React.FC<{ tasks: GanttTask[]; rowHeight: number; rowWidth: string; fontFamily: string; fontSize: string; }> = ({ tasks, rowHeight, rowWidth, fontFamily, fontSize }) => (
    <div style={{ width: rowWidth }}>
        {tasks.map(t => (
            <div className="gantt-task-list-table-row flex items-center border-b" style={{ height: rowHeight, fontFamily, fontSize }} key={t.id}>
                <div className="truncate pl-2" title={t.name}>{t.name}</div>
            </div>
        ))}
    </div>
);

const AnalysisManagementPage: React.FC = () => {
    const [viewingAnalysis, setViewingAnalysis] = useState<Analysis | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [selectedConsultant, setSelectedConsultant] = useState('all');
    const [selectedAnalysisType, setSelectedAnalysisType] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const allStatuses: AnalysisTask['status'][] = useMemo(() => ['Draft', 'Ready to be Checked', 'Checked Ready to be Emailed', 'Emailed'], []);
    const [selectedStatuses, setSelectedStatuses] = useState<AnalysisTask['status'][]>(allStatuses);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week);
    const [selectedMonth, setSelectedMonth] = useState('all');

    const { data: analyses = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['analyses'],
        queryFn: getAnalyses,
    });

    const queryClient = useQueryClient();

    // Delete analysis mutation
    const deleteAnalysisMutation = useMutation({
        mutationFn: async (analysisId: string) => {
            console.log('Attempting to delete analysis with ID:', analysisId);
            const { data, error } = (await supabase
                .from('analysis_tracker')
                .delete()
                .eq('id', analysisId)) as PostgrestResponse<any>;
            if (error) throw new Error(error.message);
            return data;
        },
        onSuccess: (data) => {
            console.log('Delete successful:', data);
            queryClient.invalidateQueries({ queryKey: ['analyses'] });
        },
        onError: (error) => {
            console.log('Delete error:', error);
            alert('Failed to delete analysis: ' + error.message);
        }
    });

    // Convert Analysis to AnalysisTask for Gantt chart
    const analysisTasks: AnalysisTask[] = useMemo(() => {
        return analyses.map((analysis: Analysis) => {
            const createdDate = new Date(analysis.created_at);
            // Estimate end date based on status (you can adjust these durations)
            let endDate = new Date(createdDate);
            switch (analysis.status) {
                case 'Draft':
                    endDate.setDate(createdDate.getDate() + 3); // 3 days for draft
                    break;
                case 'Ready to be Checked':
                    endDate.setDate(createdDate.getDate() + 5); // 5 days to ready check
                    break;
                case 'Checked Ready to be Emailed':
                    endDate.setDate(createdDate.getDate() + 7); // 7 days to checked
                    break;
                case 'Emailed':
                    endDate.setDate(createdDate.getDate() + 10); // 10 days to completion
                    break;
            }
            
            return {
                id: analysis.id,
                client_name: analysis.client_name,
                consultant: analysis.consultant,
                analysis_type: analysis.analysis_type,
                category: analysis.category,
                crop: analysis.crop,
                status: analysis.status,
                startDate: createdDate,
                endDate: endDate,
                created_at: analysis.created_at,
            };
        });
    }, [analyses]);

    const consultants = useMemo(() => [...new Set(analysisTasks.map(task => task.consultant))].filter(Boolean), [analysisTasks]);

    const stats = useMemo(() => {
        const filtered = analysisTasks
            .filter(t => selectedConsultant === 'all' || t.consultant === selectedConsultant)
            .filter(t => selectedAnalysisType === 'all' || t.analysis_type === selectedAnalysisType)
            .filter(t => selectedStatuses.includes(t.status));

        return {
          total: filtered.length,
          emailed: filtered.filter(t => t.status === 'Emailed').length,
          checked: filtered.filter(t => t.status === 'Checked Ready to be Emailed').length,
          ready: filtered.filter(t => t.status === 'Ready to be Checked').length,
          draft: filtered.filter(t => t.status === 'Draft').length,
        };
    }, [analysisTasks, selectedConsultant, selectedAnalysisType, selectedStatuses]);

    const displayedAnalyses = useMemo(() => {
        let filteredAnalyses = analysisTasks;

        if (selectedConsultant !== 'all') {
            filteredAnalyses = filteredAnalyses.filter(task => task.consultant === selectedConsultant);
        }
        
        if (selectedAnalysisType !== 'all') {
            filteredAnalyses = filteredAnalyses.filter(task => task.analysis_type === selectedAnalysisType);
        }
        
        if (selectedCategory !== 'all') {
            filteredAnalyses = filteredAnalyses.filter(task => task.category === selectedCategory);
        }
        
        // Filter by month
        if (selectedMonth !== 'all') {
            filteredAnalyses = filteredAnalyses.filter(task => {
                const taskMonth = task.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                return taskMonth === selectedMonth;
            });
        }
        
        filteredAnalyses = filteredAnalyses.filter(task => selectedStatuses.includes(task.status));

        if (sortConfig !== null) {
            filteredAnalyses.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredAnalyses;
    }, [analysisTasks, selectedConsultant, selectedAnalysisType, selectedCategory, selectedMonth, selectedStatuses, sortConfig]);

    // ...rest of the code (UI rendering, dialogs, Gantt chart, etc.)

    return (
        <div className="max-w-7xl mx-auto py-8 space-y-8">
            {/* Add your UI rendering here, similar to EnterAnalysisPage */}
            {/* This will include filters, KPIs, Gantt chart, table/list, and dialogs */}
        </div>
    );
};

export default AnalysisManagementPage; 