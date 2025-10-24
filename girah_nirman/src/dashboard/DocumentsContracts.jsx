import React from "react";
import { DocumentArrowDownIcon, ShareIcon } from "@heroicons/react/24/outline";

const documents = [
  { id: 1, name: "Contract Agreement.pdf", uploadedOn: "2025-02-15" },
  { id: 2, name: "Land Permit.pdf", uploadedOn: "2025-03-01" },
  { id: 3, name: "Safety Approval.pdf", uploadedOn: "2025-04-10" },
];

const DocumentsContracts = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Documents & Contracts</h2>
      <ul className="divide-y divide-gray-200">
        {documents.map(({ id, name, uploadedOn }) => (
          <li key={id} className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium text-gray-900">{name}</p>
              <p className="text-sm text-gray-500">Uploaded on {uploadedOn}</p>
            </div>
            <div className="flex space-x-4">
              <button
                aria-label={`Download ${name}`}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <DocumentArrowDownIcon className="h-6 w-6" />
              </button>
              <button
                aria-label={`Share ${name}`}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <ShareIcon className="h-6 w-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsContracts;
