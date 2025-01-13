import React from 'react'
import {timeSlots} from "../constants/timeSlots"

const Table = ({operatories,highlightConfigData,selectedDate}) => {
  return (
    <div className="overflow-x-auto bg-white">
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left ">
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

          <tbody className="">
            {timeSlots.map((time, rowIndex) => (
              <tr key={rowIndex} className="">
                <td className="border border-gray-300 px-4 py-2 text-gray-600 w-[200px]">
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
  )
}

export default Table
