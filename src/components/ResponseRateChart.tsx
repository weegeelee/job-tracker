import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  responseRate: number;
}
const ResponseRateChart: React.FC<Props> = ({ responseRate }) => {
  const percentRate = responseRate * 100;
  const data = [
    {
      name: 'ResponseRate',
      value: percentRate,
      fill: '#8884d8',
    }
  ];

  return (
    <div className="w-2/3 h-72 bg-stone-50 rounded-2xl pt-4 mx-auto">
      <h3 className="text-stone-600">ResponseRate</h3>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          data={data}
          startAngle={180}
          endAngle={0}
          className="bg-stone-50 rounded-2xl"
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
          >
            {percentRate.toFixed(1)}%
          </text>
          <Legend />
        </RadialBarChart>
        
      </ResponsiveContainer>
      
    </div>
  );
};

export default ResponseRateChart;