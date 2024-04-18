import React, { useEffect, useState } from "react";
import { ProcessInfoDTO } from "../model/dto/ProcessInfoDTO";
import axios from "axios";

// const DOTNET_API_URL = process.env.REACT_APP_DOTNET_API_URL;

const ProcessTable = () => {
  const [processes, setProcesses] = useState<ProcessInfoDTO[]>([]);

  useEffect(() => {
    axios
      .get<ProcessInfoDTO[]>("http://localhost:5179/processes")
      // .get<ProcessInfoDTO[]>(`DOTNET_API_URL` + "/processes")
      .then((res) => setProcesses(res.data))
      .catch((err) => {
        throw err.message;
      });
  }, []);
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
