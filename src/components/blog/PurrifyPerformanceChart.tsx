'use client';

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const data = [
  {
    technology: 'Purrify Activated Carbon',
    ammoniaReduction: 92,
    odorNeutralization: 88,
  },
  {
    technology: 'Zeolite Blend',
    ammoniaReduction: 55,
    odorNeutralization: 48,
  },
  {
    technology: 'Baking Soda',
    ammoniaReduction: 41,
    odorNeutralization: 36,
  },
  {
    technology: 'Perfumed Silica',
    ammoniaReduction: 22,
    odorNeutralization: 18,
  },
];

const axisTickStyle = { fill: '#334155', fontSize: 12 };
const tooltipFormatter = (value: number) => `${value}%`;

export function PurrifyPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5F5" />
        <XAxis dataKey="technology" tick={axisTickStyle} interval={0} angle={-10} height={70} textAnchor="end" />
        <YAxis tick={axisTickStyle} tickFormatter={tooltipFormatter} width={48} />
        <Tooltip formatter={tooltipFormatter} labelStyle={{ fontWeight: 600 }} contentStyle={{ borderRadius: 8 }} />
        <Legend verticalAlign="top" height={32} iconType="circle" />
        <Bar dataKey="ammoniaReduction" name="Ammonia reduction (%)" fill="#FF3131" radius={[6, 6, 0, 0]} />
        <Bar dataKey="odorNeutralization" name="Odor neutralization score (%)" fill="#5B2EFF" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PurrifyPerformanceChart;
