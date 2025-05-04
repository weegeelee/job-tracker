import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Props {
    statusCounts: Record<string, number>;
}
const ApplicationStatusChart: React.FC<Props> = ({ statusCounts }) => {

    const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
    const statusColors: Record<string, string> = {
        "pending": "#fde68a",   
        "Interview": "#93c5fd",  
        "rejected": "#fca5a5",    
        "Zusage": "#86efac",     
        "keine Rückmeldung": "#d1d5db", 
    };

    return (
        <div className="w-2/3 h-72 bg-stone-50 rounded-2xl pt-4 mx-auto">
            <h3 className="text-stone-600">Bewerbungsstatus</h3>
            <ResponsiveContainer>
                <PieChart className="bg-stone-50 rounded-2xl">
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={statusColors[entry.name] || "#8884d8"}/>
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} Bewerbungen`, 'Anzahl']} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ApplicationStatusChart;

