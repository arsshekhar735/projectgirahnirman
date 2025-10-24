import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  { month: "Jan", progress: 10 },
  { month: "Feb", progress: 25 },
  { month: "Mar", progress: 45 },
  { month: "Apr", progress: 60 },
  { month: "May", progress: 75 },
  { month: "Jun", progress: 85 },
  { month: "Jul", progress: 95 },
];

const costData = [
  { category: "Labor", cost: 120000 },
  { category: "Materials", cost: 150000 },
  { category: "Equipment", cost: 80000 },
  { category: "Misc", cost: 20000 },
];

// Sample Risk Indicator
const riskLevel = "Moderate";

const ReportsAnalytics = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-6">Reports & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-2 text-gray-700">Project Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData}>
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-medium mb-2 text-gray-700">Cost Analysis</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cost" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4">
            <p className="font-semibold text-gray-700">Risk Level: <span className="text-yellow-600">{riskLevel}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
