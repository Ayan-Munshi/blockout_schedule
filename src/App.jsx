import React, { useState } from "react";

function App() {
  // Time slots for rows
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
  ];

  // Operatory headers
  const operatories = ["OP 1", "OP 2", "OP 3", "OP 4", "OP 5"];

  // Dynamic Highlighting State
  const [highlightConfig, setHighlightConfig] = useState({
    startTime: "10:00 AM", // Highlight start time
    endTime: "3:00 PM",   // Highlight end time
    operatory: "OP 5",    // Operatory to highlight
  });

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Dynamic Schedule Highlighting</div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Practice ID:</span>
          <span className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
            Xk4dm5x34k3SA
          </span>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          {/* table Head */}
          <thead>
            <tr className="">
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                Time
              </th>
              {operatories.map((op, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 bg-gray-100 text-center "
                >
                  {op}
                </th>
              ))}
            </tr>
          </thead>

          {/* table Body */}
          <tbody>
            {timeSlots.map((time, rowIndex) => {
            
              const isWithinTimeRange =
                timeSlots.indexOf(highlightConfig.startTime) <= rowIndex &&
                rowIndex <= timeSlots.indexOf(highlightConfig.endTime)

              return (
                <tr key={rowIndex}>
                  {/* Time Column */}
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">
                    {time}
                  </td>

                  {/* Operatory Columns */}
                  {operatories.map((op, colIndex) => {
                    // Check if the current column is the target operatory
                    const isTargetOperatory =
                      op === highlightConfig.operatory;

                    // Highlight only cells that match both conditions
                    const isHighlighted =
                      isWithinTimeRange && isTargetOperatory;

                    return (
                      <td
                        key={colIndex}
                        data-time={time} // Add data attribute for time
                        data-operatory={op} // Add data attribute for operatory
                        className={`border border-gray-300 px-4 py-2 ${
                          isHighlighted ? "bg-yellow-200" : ""
                        }`}
                      ></td>
                    )
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
