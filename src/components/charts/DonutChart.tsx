import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type DataPoint = {
  name: string;
  value: number;
  color?: string;
};

type DonutChartProps = {
  data: DataPoint[];
  dataKey?: string;
  nameKey?: string;
  title?: string;
  height?: number | string;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  colors?: string[];
};

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  height = 300,
  className,
  innerRadius = 60,
  outerRadius = 80,
  colors = DEFAULT_COLORS,
}) => {
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return <div className="flex items-center justify-center h-40 text-muted-foreground">No data available</div>;
  }

  // Create config for the chart
  const chartConfig = data.reduce((acc, entry, index) => {
    acc[entry.name] = {
      label: entry.name,
      color: entry.color || colors[index % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer className={className} config={chartConfig}>
      <RechartsPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label={({ name, percent }) => {
            if (percent === 0) return '';
            return `${name}: ${(percent * 100).toFixed(0)}%`;
          }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || colors[index % colors.length]} 
            />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
      </RechartsPieChart>
    </ChartContainer>
  );
};

export default DonutChart;