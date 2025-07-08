import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

type DataPoint = {
  name: string;
  [key: string]: string | number;
};

type LineChartProps = {
  data: DataPoint[];
  lines: Array<{
    dataKey: string;
    stroke?: string;
    name?: string;
    area?: { fill: string; fillOpacity?: number };
    strokeDasharray?: string;
  }>;
  xAxisDataKey?: string;
  title?: string;
  height?: number | string;
  className?: string;
};

export const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisDataKey = 'name',
  height = 300,
  className,
}) => {
  // Create config for the chart
  const chartConfig = lines.reduce((acc, line) => {
    acc[line.dataKey] = {
      label: line.name || line.dataKey,
      color: line.stroke,
    };
    return acc;
  }, {} as Record<string, { label: string; color?: string }>);

  return (
    <ChartContainer className={className} config={chartConfig} height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Legend />
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line.area && (
              <Area
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                fill={line.area.fill}
                fillOpacity={line.area.fillOpacity ?? 0.15}
                isAnimationActive={false}
              />
            )}
            <Line
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              activeDot={{ r: 8 }}
              strokeDasharray={line.strokeDasharray}
            />
          </React.Fragment>
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
};

export default LineChart;
