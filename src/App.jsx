import React, { useState } from "react";

import Table from "./components/Table";

function App() {
  const operatoryData = {
    "2025-01-09": ["OP 1", "OP 2", "OP 3"],
    "2025-01-10": ["OP 4", "OP 5", "OP 6"],
  };

  const highlightConfigData = {
    "2025-01-09": [
      {
        startTime: "9:00 AM",
        endTime: "1:00 PM",
        operatory: "OP 2",
      },
    ],
    "2025-01-10": [
      {
        startTime: "11:00 AM",
        endTime: "3:00 PM",
        operatory: "OP 5",
      },
      {
        startTime: "5:00 PM",
        endTime: "8:00 PM",
        operatory: "OP 5",
      },
      {
        startTime: "10:00 PM",
        endTime: "11:00 PM",
        operatory: "OP 5",
      },
      {
        startTime: "9:00 AM",
        endTime: "1:00 PM",
        operatory: "OP 4",
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const operatories = operatoryData[selectedDate] || [];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 top-0 z-2 sticky bg-gray-300">
        <div className="text-lg font-bold">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2 bg-white">
          <span className="font-medium">Practice ID:</span>
          <span className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
            Xk4dm5x34k3SA
          </span>
        </div>
      </div>

      <Table
        operatories={operatories}
        highlightConfigData={highlightConfigData}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;
