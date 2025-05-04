import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
    applicationsByWeek: Record<string, number>;
}
const WeeklyApplicationChart: React.FC<Props> = ({ applicationsByWeek }) => {
    const data = Object.entries(applicationsByWeek)
        .map(([week, count]) => ({ week, count }))
        .sort((a, b) => a.week.localeCompare(b.week));

    return (
        <div className="w-5/6 h-72 bg-stone-50 rounded-2xl pt-4 mx-auto">
            <h3 className="text-stone-600">Anzahl der Bewerbungen pro Woche</h3>
            <ResponsiveContainer>
                <LineChart data={data} className="bg-stone-50 rounded-2xl pt-4 mx-auto">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} Bewerbungen`, 'Anzahl']} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="count"
                        name="Anzahl der Bewerbung"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyApplicationChart;
