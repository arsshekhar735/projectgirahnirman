import React from "react";

const materials = [
  {
    id: 1,
    name: "Cement",
    ordered: 500,
    delivered: 350,
    pending: 150,
    supplier: "ABC Suppliers",
  },
  {
    id: 2,
    name: "Steel Rods",
    ordered: 200,
    delivered: 200,
    pending: 0,
    supplier: "SteelPro Ltd.",
  },
  {
    id: 3,
    name: "Wood",
    ordered: 300,
    delivered: 150,
    pending: 150,
    supplier: "Timber Co.",
  },
];

const MaterialResourceTracking = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Material & Resource Tracking</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-yellow-400 text-white">
            <th className="px-4 py-2 text-left">Material</th>
            <th className="px-4 py-2 text-right">Ordered</th>
            <th className="px-4 py-2 text-right">Delivered</th>
            <th className="px-4 py-2 text-right">Pending</th>
            <th className="px-4 py-2 text-left">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(({ id, name, ordered, delivered, pending, supplier }) => (
            <tr key={id} className="border-b border-gray-200 hover:bg-yellow-50">
              <td className="px-4 py-2">{name}</td>
              <td className="px-4 py-2 text-right">{ordered}</td>
              <td className="px-4 py-2 text-right">{delivered}</td>
              <td className="px-4 py-2 text-right">{pending}</td>
              <td className="px-4 py-2">{supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialResourceTracking;
