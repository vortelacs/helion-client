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

  const handleDownloadProcess = (id: number) => {
    axios({
      url: `http://localhost:5179/process/pdf/${id}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `process_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log("Process downloaded successfully");
      })
      .catch((error) => {
        console.error(
          "Failed to download process:",
          error.response ? error.response.data : "Unknown error"
        );
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
    <div className="lg:my-2 relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Services</th>
            <th className="px-4 py-3">GPS Location</th>
            <th className="px-4 py-3">Download PDF</th>
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
                  className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDownloadProcess(process.id)}
                >
                  Download PDF
                </button>
              </td>
              <td className="px-4 py-3 border">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
