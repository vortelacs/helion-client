import { useEffect, useState } from "react";
import axios from "axios";
import SignaturePad from "../components/form/SignaturePad";
import { Company } from "model/Company";
import { Representative } from "model/Representative";
import { Employee } from "model/Employee";
import { Workplace } from "model/Workplace";
import { Service } from "model/Service";
import { ProcessCreateRequestDTO } from "model/dto/ProcessCreateRequestDTO";
import { Option } from "components/common/Dropdown";
import { formatOptionLabel } from "components/common/CheckBoxDropdown";
import Select from "react-select";
import { toast } from "react-toastify";
import CustomCompanyForm from "components/form/CompanyForm";
import { CompanyCreateRequestDTO } from "model/dto/CompanyCreateRequest";
import GenericForm, { FieldMetadata } from "components/form/GenericForm";

interface DataRetrieve<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

const companyFields: FieldMetadata[] = [
  { name: "id", label: "ID", type: "number" },
  { name: "cui", label: "CUI", type: "number" },
  { name: "name", label: "Name", type: "text" },
];

<GenericForm
  fields={companyFields}
  initialData={{ id: 0, cui: 0, name: "" }}
  onSubmit={(data) => console.log(data)}
/>;

const ProcessForm = () => {
  const [companyId, setCompanyId] = useState<number>(0);
  const [companyName, setCompanyName] = useState("");
  const [companyCUI, setCompanyCUI] = useState(0);
  const [representativeId, setRepresentativeId] = useState<number>(0);
  const [eSignature, setESignature] = useState<string>("");
  const [signDate, setSignDate] = useState<Date>(new Date());
  const [gpsLocation, setGPSLocation] = useState<string>("");
  const [workplacesIds, setWorkplacesIds] = useState<number[]>([]);
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [servicesIds, setServicesIds] = useState<number[]>([]);
  const [isCustomCompanyVisible, setIsCustomCompanyVisible] = useState(false);
  const companies: DataRetrieve<Company> = useFetchData<Company>("Company");
  const representatives: DataRetrieve<Representative> =
    useFetchData<Representative>("Representative");
  const workplaces: DataRetrieve<Workplace> =
    useFetchData<Workplace>("Workplace");
  const services: DataRetrieve<Service> = useFetchData<Service>("Service");
  const employees: DataRetrieve<Employee> = useFetchData<Employee>("Employee");

  const workplaceOptions: Option<number>[] = workplaces.data.map(
    (workplace) => ({
      value: workplace.id,
      label: workplace.name,
      description: `Address: ${workplace.zone} ${workplace.city} ${workplace.address}`,
    })
  );

  const handleNewCompanyCreation = async (company: {
    name: string;
    cui: number;
  }) => {
    console.log("New Company Created:", company);

    const companyDTO: CompanyCreateRequestDTO = {
      name: company.name,
      cui: company.cui,
    };

    try {
      const response = await axios.post(
        "http://localhost:5179/api/Company",
        companyDTO
      );
      console.log(response);
      toast("Company submitted successfully:", response.data);
      const newCompany: Company = response.data;
      setCompanyId(newCompany.id);
    } catch (error: any) {
      if (error.response) {
        toast("Error data");
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        toast("No response received");
        console.error("No response received:", error.request);
      } else {
        toast("Error! Try later");
        console.error("Error", error.message);
      }
    }
  };

  const handleCustomCompanyIsVisibleChange = () => {
    setIsCustomCompanyVisible(!isCustomCompanyVisible);
  };

  const serviceOptions: Option<number>[] = services.data.map((service) => ({
    value: service.id,
    label: service.name,
  }));

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

  const employeeOptions: Option<number>[] = employees.data.map((employee) => ({
    value: employee.id,
    label: employee.firstName + " " + employee.lastName,
    additionalInfo: `position: ${employee.position}`,
  }));

  const handleSelectCompany = (selectedValue: number) => {
    setCompanyId(companyId);
  };

  const handleSelectRepresentative = (RepresentativeId: number) => {
    setRepresentativeId(RepresentativeId);
  };

  function handleSelectWorkplaces(selectedValue: Workplace[]): void {
    const ids = selectedValue.map((workplace) => workplace.id);
    setWorkplacesIds(ids);
  }

  function handleSelectServices(selectedValue: Service[]): void {
    const ids = selectedValue.map((service) => service.id);
    setServicesIds(ids);
  }

  function handleSelectEmployees(selectedValue: number[]): void {
    setEmployeeIds(selectedValue);
  }

  const handleSignatureSave = (
    url: string,
    coordinates: GeolocationCoordinates
  ) => {
    setESignature(url);
    setGPSLocation(coordinates.latitude + " " + coordinates.longitude);
    setSignDate(new Date());
  };

  const resetStates = () => {
    setCompanyId(0);
    setRepresentativeId(0);
    setESignature("");
    setSignDate(new Date()); // Reset to current date or specific initial date if needed
    setGPSLocation("");
    setWorkplacesIds([]);
    setEmployeeIds([]);
    setServicesIds([]);
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
      serviceIds: servicesIds,
    };

    if (isCustomCompanyVisible)
      handleNewCompanyCreation({ name: companyName, cui: companyCUI });

    try {
      const response = await axios.post(
        "http://localhost:5179/process",
        processCreateRequestDTO
      );
      toast("Process submitted successfully:", response.data);
      resetStates();
    } catch (error: any) {
      if (error.response) {
        toast("Error data");
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        toast("No response received");
        console.error("No response received:", error.request);
      } else {
        toast("Error! Try later");
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="border p-4 m-4 flex flex-col">
      <div className="my-4">
        <p>Choose the company</p>
        {companies.loading ? (
          <div>Loading Companies...</div>
        ) : companies.error ? (
          <div>Error loading companies: {companies.error.message}</div>
        ) : (
          <Select
            isDisabled={isCustomCompanyVisible}
            options={companyOptions}
            onChange={handleSelectCompany as any}
            isMulti={false}
            required={true}
          />
        )}
      </div>
      <label className="flex my-2">
        <input
          type="checkbox"
          checked={isCustomCompanyVisible}
          onChange={handleCustomCompanyIsVisibleChange}
        ></input>
        <p className="px-2">My company is not in the list</p>
      </label>
      <CustomCompanyForm
        isVisible={isCustomCompanyVisible}
        setName={setCompanyName}
        setCui={setCompanyCUI}
      ></CustomCompanyForm>
      <div className="my-4">
        <p>Choose the representative</p>
        {companies.loading ? (
          <div>Loading the representatives...</div>
        ) : representatives.error ? (
          <div>
            Error loading representatives: {representatives.error.message}
          </div>
        ) : (
          <Select
            options={representativeOptions}
            onChange={handleSelectRepresentative as any}
            isMulti={false}
          />
        )}
      </div>
      <div className="my-4">
        <p>Choose the employees</p>
        {companies.loading ? (
          <div>Loading employees...</div>
        ) : employees.error ? (
          <div>Error loading employees: {employees.error.message}</div>
        ) : (
          <Select
            options={employeeOptions}
            onChange={handleSelectEmployees as any}
            isMulti={true}
          />
        )}
      </div>
      <div className="my-4">
        <p>Choose the workplaces</p>
        {workplaces.loading ? (
          <div>Loading workplaces...</div>
        ) : workplaces.error ? (
          <div>Error loading workplaces: {workplaces.error.message}</div>
        ) : (
          <Select
            required={true}
            options={workplaceOptions}
            onChange={handleSelectWorkplaces as any}
            isMulti={true}
            formatOptionLabel={formatOptionLabel}
          />
        )}
      </div>
      <div className="my-4">
        <p>Choose the services</p>
        {services.loading ? (
          <div>Loading services...</div>
        ) : services.error ? (
          <div>Error loading services: {services.error.message}</div>
        ) : (
          <Select
            options={serviceOptions}
            isMulti={true}
            onChange={handleSelectServices as any}
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
