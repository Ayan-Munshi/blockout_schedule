import React from "react";
import { timeSlots } from "../../constants/timeSlots";
import * as Tooltip from "@radix-ui/react-tooltip";
import { calculatePosition } from "../../utils/PositionCalculator";

const Schedule = ({ scheduleData, blockoutData }) => {
  // generate list of all operators from schedule and blockout both (unique)
  const operatories = [
    ...new Set([ // i am using here set because set object automatically removes duplicate values and the spread operator (...) is used to convert the Set back into an array because Set itself is not an array and cannot be directly iterated over as needed later in the code.
      ...scheduleData.map((item) => item.operatory),
      ...blockoutData.map((item) => item.operatory),
    ]),
  ];

  // group schedule and blockout data by operator
  const groupedData = operatories.map((opr) => ({
    opr,
    appointments: scheduleData.filter((item) => item.operatory === opr), 
    blockouts: blockoutData.filter((item) => item.operatory === opr),
  }));

  return (
    <div className="flex flex-col p-4">
      {/* Header */}
      <div className="flex ml-16 w-max">
        {groupedData.map((op) => (
          <div
            key={op.opr}
            className="text-center w-[450px] bg-red-200 border p-2 font-bold"
          >
            {op.opr}
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div className="flex relative w-max">
        {/* Time Column */}
        <div className="w-16 flex flex-col bg-white">
          {timeSlots.map((time) => (
            <div
              key={time}
              className="sticky left-0 top-0 h-16 w-16 text-xs flex items-start justify-center border-b border-gray-300"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Operator Columns */}
        {groupedData.map((op) => ( // on operatory column
          <div key={op.opr} className="border-l border-gray-300 relative">
            {/* blank Slots for each operatory column*/}
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-16 border-b w-[450px] border-gray-300 bg-gray-200"
              ></div>
            ))}

            {/* Appointment Blocks */}
            {op.appointments.map((appt) => {
              const { top, height } = calculatePosition(
                appt.startTime,
                appt.endTime
              );
              return (
                <>
                  <Tooltip.Provider delayDuration={0} skipDelayDuration={500}>
                    <Tooltip.Root>
                      {/* Tooltip Trigger */}
                      <Tooltip.Trigger asChild>
                        <div
                          key={appt.title}
                          className="absolute mx-2 flex flex-col justify-end items-end left-0 right-0 bg-white bg-opacity-60 text-black border border-white shadow-md p-2 overflow-hidden"
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <span className="text-sm font-semibold break-words">
                            {appt.provider}
                          </span>
                          <span className="text-sm font-semibold break-words">
                            {appt.title}
                          </span>
                        </div>
                      </Tooltip.Trigger>

                      {/* Tooltip content */}
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="flex flex-col gap-3 bg-gray-800 text-white p-2 rounded-md max-w-[300px]"
                          sideOffset={5}
                        >
                           <span className="text-center font-bold">Schedules</span>
                          <span>Provider : {appt.provider}</span>
                          <span className="text-[10px] text-end">{ appt.startTime} to {appt.endTime} </span>
                          
                          <Tooltip.Arrow className="fill-gray-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </>
              );
            })}

            {/* Blockout Blocks */}
            {op.blockouts.map((blockout) => {
              const { top, height } = calculatePosition(
                blockout.startTime,
                blockout.endTime
              );
              return (
                <>
                  <Tooltip.Provider delayDuration={0} skipDelayDuration={500}>
                    <Tooltip.Root>
                      {/* Tooltip Trigger */}
                      <Tooltip.Trigger asChild>
                        <div
                          key={blockout.title}
                          className="absolute flex flex-col justify-start mx-4 px-2 left-0 right-0 text-black text-start bg-white border-2 border-blue-700 rounded shadow-md overflow-hidden"
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <span className="text-[12px] font-semibold break-words">
                            {blockout.title}
                          </span>
                        </div>
                      </Tooltip.Trigger>

                      {/* Tooltip content */}
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="flex flex-col gap-3 bg-gray-800 text-white p-2 rounded-md max-w-[300px] "
                          sideOffset={5}
                        >
                          <span className="text-center font-bold">Block out</span>
                          <span>Blockout Type : {blockout.title}</span>
                          <span className="text-[10px] text-end">{ blockout.startTime} to {blockout.endTime} </span>
                          <Tooltip.Arrow className="fill-gray-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
