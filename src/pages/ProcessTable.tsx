import React, { useEffect, useState } from "react";
import { ProcessInfoDTO } from "../model/dto/ProcessInfoDTO";
import axios from "axios";

const ProcessTable = () => {
  const [processes, setProcesses] = useState<ProcessInfoDTO[]>([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const handleDeleteProcess = (id: number) => {
    axios
      .delete(`http://localhost:5179/process/${id}`)
      .then(() => {
        console.log("Process deleted successfully");
        setDeleteCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Failed to delete process:", error.response.data);
      });
  };

  useEffect(() => {
    axios
      .get<ProcessInfoDTO[]>("http://localhost:5179/processes")
      .then((res) => setProcesses(res.data))
      .catch((err) => {
        throw err.message;
      });
  }, [deleteCount]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Services</th>
            <th className="px-4 py-3">GPS Location</th>
            <th className="px-4 py-3">Delete process</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td className="px-4 py-3 border">{process.id}</td>
              <td className="px-4 py-3 border">
                {process.signDate.toString()}
              </td>
              <td className="px-4 py-3 border">{process.companyName}</td>
              <td className="px-4 py-3 border">
                {process.serviceNames.join(", ")}
              </td>
              <td className="px-4 py-3 border">{process.gpsLocation}</td>
              <td className="px-4 py-3 border">
                <button
                  className="bg-red-300 hover:bg-red-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteProcess(process.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
