import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDocuments, deleteDocument, getDocumentUrl } from '@/lib/documentsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Search, Download, Trash2, X } from 'lucide-react';
import UploadDocumentDialog from '@/components/documents/UploadDocumentDialog'; 
import { toast } from '@/components/ui/use-toast';

const getCurrentUserId = (): string | null => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    const userData = JSON.parse(user);
    if (userData && typeof userData.id === 'string' && userData.id.length > 0) {
      return userData.id;
    }
  }
  return null;
};

function toKB(val: any): number {
  const num = Number(val);
  return isNaN(num) ? 0 : num / 1024;
}

function formatFileSize(val: any): string {
  const num = Number(val);
  return !isNaN(num) ? (num / 1024).toFixed(2) + ' KB' : '-';
}

const DocumentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [viewDoc, setViewDoc] = useState<Document | null>(null);

  useEffect(() => {
    setCurrentUserId(getCurrentUserId());
  }, []);

  const { data: documents = [], isLoading, error } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });

  // Debug: Log fetched documents
  console.log('Fetched documents from Supabase:', documents);

  const deleteMutation = useMutation({
    mutationFn: ({ docId, filePath }: { docId: string, filePath: string }) => deleteDocument(docId, filePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({ title: 'Success', description: 'Document deleted successfully.' });
    },
    onError: (error) => {
      toast({ title: 'Error', description: `Failed to delete document: ${error.message}`, variant: 'destructive' });
    },
  });

  const handleDelete = (docId: string, filePath: string) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      deleteMutation.mutate({ docId, filePath });
    }
  };

  const handleDownload = (filePath: string) => {
    const url = getDocumentUrl(filePath);
    if (url) {
      // In a real app, you might want to use a more robust download method
      // that handles cross-origin issues, but for simplicity, we'll open in a new tab.
      window.open(url, '_blank');
    } else {
      toast({ title: 'Error', description: 'Could not retrieve download URL.', variant: 'destructive' });
    }
  };

  const categories = ['all', ...Array.from(new Set(documents.map(d => d.category)))];
  const fileTypes = ['all', ...Array.from(new Set(documents.map(d => d.file_type).filter(Boolean)))];

  const filteredDocuments = documents
    .filter(doc => categoryFilter === 'all' || doc.category === categoryFilter)
    .filter(doc => fileTypeFilter === 'all' || doc.file_type === fileTypeFilter)
    .filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum: number, doc: { file_size?: number | string }) => sum + (typeof doc.file_size === 'number' ? doc.file_size : Number(doc.file_size) || 0), 0);
  const totalSizeKBDisplay = (() => {
    const num = Number(totalSize);
    // @ts-ignore
    return !isNaN(num) ? (Number(num) / 1024).toFixed(2) : '0.00';
  })();
  const uniqueCategories = Array.from(new Set(documents.map(d => d.category)));
  const mostRecent = documents.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents Library</h1>
        <p className="text-muted-foreground mt-1">Upload, search, and manage your important documents.</p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-start">
          <div className="text-sm text-muted-foreground mb-1">Total Documents</div>
          <div className="text-2xl font-bold">{totalDocuments}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-start">
          <div className="text-sm text-muted-foreground mb-1">Total Size</div>
          <div className="text-2xl font-bold">{totalSizeKBDisplay} KB</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-start">
          <div className="text-sm text-muted-foreground mb-1">Categories</div>
          <div className="text-2xl font-bold">{uniqueCategories.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-start">
          <div className="text-sm text-muted-foreground mb-1">Most Recent Upload</div>
          <div className="text-base font-semibold truncate w-full" title={mostRecent?.name || ''}>{mostRecent?.name || '—'}</div>
          <div className="text-xs text-gray-500">{mostRecent ? new Date(mostRecent.created_at).toLocaleDateString() : ''}</div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Documents</CardTitle>
            <Button onClick={() => setUploadOpen(true)} disabled={!currentUserId}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by document name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map(type => (
                  <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">Loading documents...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-red-500">
                      Error: {error.message}
                    </TableCell>
                  </TableRow>
                ) : filteredDocuments.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center">No documents found.</TableCell>
                    </TableRow>
                ) : (
                  filteredDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell className="max-w-xs truncate" title={doc.description}>{doc.description || '-'}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.file_type}</TableCell>
                      <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                      <TableCell>{doc.uploaded_by_user?.name || 'Unknown'}</TableCell>
                      <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.file_path)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setViewDoc(doc)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {currentUserId && (
        <UploadDocumentDialog 
          open={isUploadOpen} 
          onOpenChange={setUploadOpen} 
          currentUserId={currentUserId}
        /> 
      )}

      {/* Document Details Modal */}
      {viewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setViewDoc(null)}>
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-2">Document Details</h2>
            <div className="space-y-2">
              <div><span className="font-semibold">Name:</span> {viewDoc.name}</div>
              <div><span className="font-semibold">Description:</span> {viewDoc.description || '-'}</div>
              <div><span className="font-semibold">Category:</span> {viewDoc.category}</div>
              <div><span className="font-semibold">File Type:</span> {viewDoc.file_type}</div>
              <div><span className="font-semibold">Size:</span> {formatFileSize(viewDoc.file_size)}</div>
              <div><span className="font-semibold">Uploaded By:</span> {viewDoc.uploaded_by_user?.name || 'Unknown'}</div>
              <div><span className="font-semibold">Date Uploaded:</span> {new Date(viewDoc.created_at).toLocaleDateString()}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => handleDownload(viewDoc.file_path)}>
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <Button variant="outline" onClick={() => setViewDoc(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage; 