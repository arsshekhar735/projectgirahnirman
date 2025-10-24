import React from "react";
import { ChatBubbleLeftRightIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const recentMessages = [
  { id: 1, sender: "Site Manager", message: "Materials have arrived at the site." },
  { id: 2, sender: "Project Manager", message: "Schedule inspection for next week." },
  { id: 3, sender: "Contractor", message: "Electrical wiring started today." },
];

const CommunicationHub = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Communication Hub</h2>
      <ul className="space-y-3 max-h-48 overflow-auto text-gray-700">
        {recentMessages.map(({ id, sender, message }) => (
          <li key={id} className="border-b border-gray-200 pb-2">
            <p className="font-semibold">{sender}</p>
            <p className="text-sm">{message}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <span>Chat</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
          <VideoCameraIcon className="h-5 w-5" />
          <span>Video Call</span>
        </button>
      </div>
    </div>
  );
};

export default CommunicationHub;
