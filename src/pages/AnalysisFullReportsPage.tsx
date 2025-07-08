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

const AnalysisFullReportsPage: React.FC = () => {
    // --- All state, handlers, and return block from EnterAnalysisPage.tsx go here ---
    // Please copy the full component code from EnterAnalysisPage.tsx, renaming the component as needed.
    return null; // Placeholder to fix linter error. Replace with the full return block from EnterAnalysisPage.tsx.
};

export default AnalysisFullReportsPage; 