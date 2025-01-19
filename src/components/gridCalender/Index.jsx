import React, { useEffect, useState } from "react";
import { useGetScheduleListQuery } from "../../redux/apiSlice";
import { operatoryList } from "../../constants/operatoryList";
import Table from "./Table";
import { formatTime } from "../../utils/FormatTime";
import { providerList } from "../../constants/providerList";
import { Icon } from "@iconify/react/dist/iconify.js";

const HighlightConfig = () => {
  const [highlightConfigData, setHighlightConfigData] = useState([]);
  const [highlightBlockoutData, setHighlightBlockoutData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-01-15");

  // Fetching scheduled slots using your redux query
  const {
    data: scheduledSlots,
    error,
    isLoading,
  } = useGetScheduleListQuery({
    date: selectedDate,
  });

  useEffect(() => {
    if (scheduledSlots && scheduledSlots?.result) {
      // process "Provider" slots
      const providerData = scheduledSlots.result.flatMap((slot) => {
        if (slot.schedule_type === "Provider" && slot.operatories) {
          // for the case of "operatory" : "4,9"
          const operatoriesArray = slot.operatories.split(","); //from api
          return operatoriesArray.flatMap((op) => {
            const matchingOperatory = operatoryList?.result.find(
              (operatory) =>
                operatory.pms_op_num.toString() === op.trim() &&  // here op is operatory: "4","9"
                !operatory.is_hidden
            );

            const matchingProvider = providerList.result.find(
              (provider) =>
                provider.pms_prov_num.toString() === slot.prov_num?.toString()
            );

            if (matchingOperatory && matchingProvider) {
              return {
                startTime: formatTime(slot.start_time),
                endTime: formatTime(slot.stop_time),
                operatory: matchingOperatory.name,
                provider: `${matchingProvider.pms_first_name} ${matchingProvider.pms_last_name}`,
              };
            }
            return null;
          });
        }
        return null;
      });

      // process "Blockout" slots
      const blockoutData = scheduledSlots.result.flatMap((slot) => {
        if (slot.schedule_type === "Blockout" && slot.operatories) {
          const operatoriesArray = slot.operatories.split(",");

          return operatoriesArray.flatMap((op) => {
            const matchingOperatory = operatoryList.result.find(
              (operatory) =>
                operatory.pms_op_num.toString() === op.trim() &&
                !operatory.is_hidden
            );

            if (matchingOperatory) {
              return {
                startTime: formatTime(slot.start_time),
                endTime: formatTime(slot.stop_time),
                operatory: matchingOperatory.name,
                title: slot?.blockout_type,
              };
            }
            return null;
          });
        }
        return null;
      });

      // filter out null values
      setHighlightConfigData(providerData.filter((item) => item !== null));
      setHighlightBlockoutData(blockoutData.filter((item) => item !== null));
    }
  }, [scheduledSlots]);

  console.log(highlightBlockoutData, "blockout");
  console.log(highlightConfigData, "schedules");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="p-4">
      <p className="text-center text-xl">Showing Schedules for {selectedDate}</p>
      <div className="flex justify-between items-center mb-4 top-0 z-10 sticky bg-white">
        <div className="text-lg font-bold">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col items-center gap-2 bg-white">
          <span className="font-medium">Practice ID:</span>
          <span className="bg-gray-100 px-4 py-2 rounded-lg text-sm">
            Xk4dm5x34k3SA
          </span>
        </div>
      </div>

      {
      isLoading ? <Icon icon="codex:loader" width="50" height="50" color="blue" /> :
      <div className="overflow-x-auto">
      <Table
        scheduleData={highlightConfigData}
        blockoutData={highlightBlockoutData}
      />
    </div>
     }
    </div>
  );
};

export default HighlightConfig;
