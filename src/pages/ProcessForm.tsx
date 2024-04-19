import { useEffect, useState } from "react";
import axios from "axios";
import SignaturePad from "../components/form/SignaturePad";
import { Company } from "model/Company";
import { Representative } from "model/Representative";
import { Employee } from "model/Employee";
import { Workplace } from "model/Workplace";
import { Service } from "model/Service";
import { Process } from "model/Process";
import { ProcessCreateRequestDTO } from "model/dto/ProcessCreateRequestDTO";

const ProcessForm = () => {
  const [companyId, setCompanyId] = useState<number>(0);
  const [representativeId, setRepresentativeId] = useState<number>(0);
  const [eSignature, setESignature] = useState<string>("");
  const [signDate, setSignDate] = useState<Date>(new Date());
  const [gpsLocation, setGPSLocation] = useState<string>("");
  const [workplacesIds, setWorkplacesIds] = useState<number[]>([]);
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);

  const [employees, loadingEmployees, errorEmployees] =
    useFetchData<Employee>("Employee");
  const [representatives, setRepresentatives] =
    useFetchData<Representative>("Representative");
  const [companies, setCompanies] = useFetchData<Company[]>("Company");
  const [workplaces, setWorkplaces] = useFetchData<Workplace[]>("Workplace");
  const [services, setService] = useFetchData<Service[]>("Service");

  const handleSignatureSave = (url: string) => {
    setESignature(url);
    setSignDate(new Date());
  };

  const handleSubmit = async () => {
    // Create the ProcessCreateRequestDTO object
    const processCreateRequestDTO: ProcessCreateRequestDTO = {
      signDate: new Date(),
      companyId: companyId,
      representativeId: representativeId,
      eSignature: eSignature,
      gpsLocation: gpsLocation,
      workplacesIds: workplacesIds,
      employeeIds: employeeIds,
      serviceIds: serviceIds,
    };

    try {
      const response = await axios.post(
        "http://localhost:5179/api/process",
        processCreateRequestDTO
      );
      console.log("Process submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting process:", error);
    }
  };

  return (
    <div className="border p-4 flex flex-col">
      <SignaturePad onSave={handleSignatureSave} />
      <hr className="border-1 border-slate-950 my-7"></hr>
      <div className=" p-2 self-end">
        <button
          className="bg-green-300 border-1 rounded py-3 px-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProcessForm;

function useFetchData<T>(url: string): [T[], boolean, any] {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5179/api/" + url);
        setData(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
}
