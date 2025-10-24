import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How to update project status?",
    answer: "Go to the project details page and update the progress milestones.",
  },
  {
    id: 2,
    question: "How to upload documents?",
    answer: "Use the Documents & Contracts section to upload or share files securely.",
  },
  {
    id: 3,
    question: "Who to contact for support?",
    answer: "You can raise a ticket here or contact customer support directly.",
  },
];

const SupportHelp = () => {
  const [ticket, setTicket] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticket.trim()) {
      // For now, just simulate submission
      setSubmitted(true);
      setTicket("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Support & Help</h2>

      <div className="mb-8">
        <h3 className="font-medium mb-2">FAQ</h3>
        <ul className="divide-y divide-gray-200">
          {faqs.map(({ id, question, answer }) => (
            <li key={id} className="py-3">
              <p className="font-semibold">{question}</p>
              <p className="text-gray-600 text-sm">{answer}</p>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="ticket" className="block font-medium">
          Raise a Support Ticket
        </label>
        <textarea
          id="ticket"
          rows="4"
          className="w-full border rounded-md p-2 resize-none focus:outline-yellow-500 focus:ring-1 focus:ring-yellow-500"
          placeholder="Describe your issue or question here..."
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Submit
        </button>
        {submitted && (
          <p className="text-green-600 font-semibold mt-2">Ticket submitted!</p>
        )}
      </form>
    </div>
  );
};

export default SupportHelp;
