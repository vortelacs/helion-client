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
import Dropdown, { Option } from "components/common/Dropdown";

interface DataRetrieve<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

const ProcessForm = () => {
  const [companyId, setCompanyId] = useState<number>(0);
  const [representativeId, setRepresentativeId] = useState<number>(0);
  const [eSignature, setESignature] = useState<string>("");
  const [signDate, setSignDate] = useState<Date>(new Date());
  const [gpsLocation, setGPSLocation] = useState<string>("");
  const [workplacesIds, setWorkplacesIds] = useState<number[]>([]);
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [serviceIds, setServiceIds] = useState<number[]>([]);

  const companies: DataRetrieve<Company> = useFetchData<Company>("Company");
  const workplaces: DataRetrieve<Workplace> =
    useFetchData<Workplace>("Workplace");
  const services: DataRetrieve<Service> = useFetchData<Service>("Services");
  const representatives: DataRetrieve<Representative> =
    useFetchData<Representative>("Representative");
  const employees: DataRetrieve<Employee[]> =
    useFetchData<Employee[]>("Employee");

  const companyOptions: Option<number>[] = companies.data.map((company) => ({
    value: company.id,
    label: company.name,
    additionalInfo: `CUI: ${company.cui}`,
  }));

  const representativeOptions: Option<number>[] = representatives.data.map(
    (representative) => ({
      value: representative.id,
      label: representative.firstName + " " + representative.lastName,
      additionalInfo: `position: ${representative.position}`,
    })
  );

  const handleSelectCompany = (companyId: number) => {
    setCompanyId(companyId);
  };

  const handleSignatureSave = (url: string) => {
    setESignature(url);
    setSignDate(new Date());
  };

  const handleSubmit = async () => {
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
      <div className="my-4">
        <p>Choose the company</p>
        {companies.loading ? (
          <div>Loading Companies...</div>
        ) : companies.error ? (
          <div>Error loading companies: {companies.error.message}</div>
        ) : (
          <Dropdown options={companyOptions} onSelect={handleSelectCompany} />
        )}
      </div>
      <div className="my-4">
        {companies.loading ? (
          <div>Loading Representatives...</div>
        ) : representatives.error ? (
          <div>
            Error loading representatives: {representatives.error.message}
          </div>
        ) : (
          <Dropdown
            options={representativeOptions}
            onSelect={handleSelectCompany}
          />
        )}
      </div>
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

function useFetchData<T>(url: string): DataRetrieve<T> {
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

  return { data, loading, error };
}
