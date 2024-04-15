import React from "react";

const ProcessTable = () => {
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
          {/* {processes.map((process) => (
            <tr key={process.id}>
              <td className="px-4 py-2 border border-gray-400">{process.id}</td>
              <td className="px-4 py-2 border border-gray-400">
                {process.date}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.company.name}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.eSignature}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                {process.gpsLocation}
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
