import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Enum options for Status
const STATUS_OPTIONS = [
  'Deficient',
  'Optimal',
  'Excess',
  'Toxic',
  'Unknown',
];

interface Row {
  id: number;
  category: string;
  nutrient: string;
  status: string;
  explanation: string;
}

const initialRows: Row[] = [
  {
    id: 1,
    category: 'Organic Matter',
    nutrient: 'Organic Matter',
    status: 'Deficient',
    explanation:
      'The Soil Organic Matter (SOM) in your soil is below the recommended level, leading to reduced fertility and biological activity. Low SOM decreases water-holding capacity, making crops more susceptible to drought stress and increasing erosion risks. A lack of organic carbon limits microbial populations, slowing nutrient cycling and reducing nitrogen fixation. These conditions often result in compacted, lifeless soil that struggles to support healthy plant growth. To improve SOM, consider incorporating compost, manure, and cover crops, while minimizing soil disturbance to encourage carbon accumulation.',
  },
];

const SoilPlantLogicsPage: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Partial<Row>>({});

  const handleEdit = (row: Row) => {
    setEditingId(row.id);
    setEditRow(row);
  };

  const handleSave = () => {
    setRows((prev) =>
      prev.map((row) => (row.id === editingId ? { ...row, ...editRow } as Row : row))
    );
    setEditingId(null);
    setEditRow({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditRow({});
  };

  const handleChange = (field: keyof Row, value: string) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    const newId = Math.max(0, ...rows.map((r) => r.id)) + 1;
    setRows([
      ...rows,
      { id: newId, category: '', nutrient: '', status: 'Unknown', explanation: '' },
    ]);
    setEditingId(newId);
    setEditRow({ id: newId, category: '', nutrient: '', status: 'Unknown', explanation: '' });
  };

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditRow({});
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Soil & Plant Logics Table</h1>
        <Button onClick={handleAdd}>Add Row</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Nutrient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Explanation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editingId === row.id ? (
                  <Input
                    value={editRow.category || ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                  />
                ) : (
                  row.category
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Input
                    value={editRow.nutrient || ''}
                    onChange={(e) => handleChange('nutrient', e.target.value)}
                  />
                ) : (
                  row.nutrient
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Select
                    value={editRow.status || 'Unknown'}
                    onValueChange={(val) => handleChange('status', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  row.status
                )}
              </TableCell>
              <TableCell className="max-w-xs">
                {editingId === row.id ? (
                  <Textarea
                    value={editRow.explanation || ''}
                    onChange={(e) => handleChange('explanation', e.target.value)}
                    rows={4}
                  />
                ) : (
                  <span className="block whitespace-pre-line text-sm">{row.explanation}</span>
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(row.id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SoilPlantLogicsPage; 