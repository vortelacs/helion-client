import React, { useEffect, useState } from "react";
import { ProcessInfoDTO } from "../model/dto/ProcessInfoDTO";
import axios from "axios";

// const DOTNET_API_URL = process.env.REACT_APP_DOTNET_API_URL;

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
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">ID</th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">
              Date
            </th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">
              Company
            </th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">
              ESignature
            </th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">
              GPS Location
            </th>
            <th className="px-4 py-2 bg-gray-200 border border-gray-400">
              Delete process
            </th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td className="px-4 py-2 border border-gray-400">{process.id}</td>
              <td className="px-4 py-2 border border-gray-400">
                {process.signDate.toString()}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.companyName}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.eSignature}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.gpsLocation}
              </td>
              <td className="px-4 py-2 border flex  border-gray-400">
                <button
                  className="bg-red-300 border-solid border-1 self-center rounded py-3 px-4"
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
