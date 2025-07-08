import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 }
];

const TestRechartsBarChart: React.FC = () => {
  return (
    <div style={{ width: 400, height: 300, margin: '2rem auto' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2e7d32" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TestRechartsBarChart; 