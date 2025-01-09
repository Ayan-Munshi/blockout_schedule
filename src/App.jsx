import React, { useState } from "react";

function App() {
  const timeSlots = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
  ];

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
      <div className="flex justify-between items-center mb-4 top-0 sticky bg-white">
        <div className="text-lg font-bold">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Practice ID:</span>
          <span className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
            Xk4dm5x34k3SA
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                Time
              </th>
              {operatories.map((op, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 bg-gray-100 text-center"
                >
                  {op}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">
                  {time}
                </td>
                {operatories.map((op, colIndex) => {
                  const isHighlighted = (highlightConfigData[selectedDate] || []).some(
                    (config) =>
                      timeSlots.indexOf(config.startTime) <= rowIndex &&
                      rowIndex <= timeSlots.indexOf(config.endTime) &&
                      op === config.operatory
                  );

                  return (
                    <td
                      key={colIndex}
                      data-time={time}
                      data-operatory={op}
                      className={`border border-gray-300 px-4 py-2 ${
                        isHighlighted ? "bg-yellow-200" : ""
                      }`}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
