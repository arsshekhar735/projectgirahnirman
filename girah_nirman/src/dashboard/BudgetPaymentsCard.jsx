import React from "react";

const BudgetDonutChart = ({ used, total }) => {
  const usedPercent = (used / total) * 100;
  const circumference = 2 * Math.PI * 60; // radius 60 for bigger chart
  const offset = circumference - (usedPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="180" height="180" className="animate-fadeIn">
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r="60"
          stroke="#e5e7eb"
          strokeWidth="18"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx="90"
          cy="90"
          r="60"
          stroke="#f59e0b"
          strokeWidth="18"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          className="transition-all duration-1000 ease-out"
        />
        {/* Percentage label */}
        <text
          x="90"
          y="95"
          textAnchor="middle"
          className="text-2xl font-bold fill-yellow-600"
        >
          {Math.round(usedPercent)}%
        </text>
        {/* Subtext */}
        <text
          x="90"
          y="120"
          textAnchor="middle"
          className="text-sm fill-gray-500"
        >
          Budget Used
        </text>
      </svg>
    </div>
  );
};

const BudgetPaymentsCard = () => {
  const budgetUsed = 350000;
  const budgetTotal = 500000;
  const payments = [
    { milestone: "Initial deposit", due: "2025-01-15", status: "Paid" },
    { milestone: "Foundation work", due: "2025-03-01", status: "Paid" },
    { milestone: "Roof installation", due: "2025-06-20", status: "Upcoming" },
    { milestone: "Final inspection", due: "2025-11-30", status: "Upcoming" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 p-10">
      {/* Page Container */}
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Budget & Payments</h1>
          <p className="text-gray-500 mt-1">
            Track your financial milestones and project expenses in real-time.
          </p>
        </header>

        {/* Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1">
          {/* Left: Donut Chart Section */}
          <div className="flex justify-center items-center bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
            <BudgetDonutChart used={budgetUsed} total={budgetTotal} />
          </div>

          {/* Right: Payment Milestones */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Payment Milestones
            </h2>
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
              {payments.map(({ milestone, due, status }, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition-all duration-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{milestone}</p>
                    <p className="text-sm text-gray-500">{due}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {status}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BudgetPaymentsCard;
