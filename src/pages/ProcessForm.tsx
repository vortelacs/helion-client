import { useEffect, useState } from "react";
import axios from "axios";
import SignaturePad from "../components/form/SignaturePad";
import { Company, PFA, SRL } from "model/Company";
import { Representative } from "model/Representative";
import { Employee } from "model/Employee";
import { Workplace } from "model/Workplace";
import { Service } from "model/Service";
import { ProcessCreateRequestDTO } from "model/dto/ProcessCreateRequestDTO";
import { Option } from "components/common/Dropdown";
import { formatOptionLabel } from "components/common/CheckBoxDropdown";
import Select from "react-select";
import { toast } from "react-toastify";
import GenericForm, { FieldMetadata } from "components/form/GenericForm";

interface DataRetrieve<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}
type CompanyType = "Company" | "SRL" | "PFA";

type CompanyData = {
  Company: Company;
  SRL: SRL;
  PFA: PFA;
};

const fieldMetadata: Record<CompanyType, FieldMetadata[]> = {
  Company: [
    { name: "cui", label: "CUI", type: "number" },
    { name: "name", label: "Name", type: "text" },
  ],
  SRL: [
    { name: "cui", label: "CUI", type: "number" },
    { name: "name", label: "Name", type: "text" },
    { name: "registrationCode", label: "Registration Code", type: "number" },
  ],
  PFA: [
    { name: "cui", label: "CUI", type: "number" },
    { name: "name", label: "Name", type: "text" },
    { name: "cnp", label: "CNP", type: "number" },
    { name: "activity", label: "Activity", type: "text" },
  ],
};

const options = [
  { value: "Company", label: "Company" },
  { value: "SRL", label: "SRL" },
  { value: "PFA", label: "PFA" },
];

const ProcessForm = () => {
  const [companyType, setCompanyType] = useState<CompanyType>("Company");
  const [companyId, setCompanyId] = useState<number>(0);
  const [representativeId, setRepresentativeId] = useState<number>(0);
  const [workplacesIds, setWorkplacesIds] = useState<number[]>([]);
  const [servicesIds, setServicesIds] = useState<number[]>([]);
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [companyFormData, setCompanyFormData] = useState<Company | SRL | PFA>(
    {} as any
  );
  const [signDate, setSignDate] = useState<Date>(new Date());
  const [eSignature, setESignature] = useState<string>("");
  const [gpsLocation, setGPSLocation] = useState<string>("");
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

  const handleNewCompanyCreation = async (
    companyFormData: Company | SRL | PFA
  ): Promise<number> => {
    try {
      const response = await axios.post<number>(
        "http://localhost:5179/api/Company",
        companyFormData
      );
      const companyId = response.data;
      setCompanyId(companyId);
      toast("Company submitted successfully: " + companyId);
      return companyId;
    } catch (error: any) {
      console.error(
        "Failed to create company:",
        error.response ? error.response.data : error.message
      );
      toast("Failed to create company");
      throw error;
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

  const handleSelectCompany = (selectedOption: Option<number> | null) => {
    if (selectedOption) {
      setCompanyId(selectedOption.value);
    } else {
      setCompanyId(0);
    }
  };

  const handleSelectRepresentative = (
    selectedOption: Option<number> | null
  ) => {
    if (selectedOption) {
      setRepresentativeId(selectedOption.value);
    } else {
      setRepresentativeId(0);
    }
  };

  function handleSelectWorkplaces(
    selectedOptions: Option<number>[] | null
  ): void {
    if (selectedOptions) {
      setWorkplacesIds(selectedOptions.map((option) => option.value));
    } else {
      setWorkplacesIds([]);
    }
  }

  function handleSelectServices(
    selectedOptions: Option<number>[] | null
  ): void {
    if (selectedOptions) {
      setServicesIds(selectedOptions.map((option) => option.value));
    } else {
      setServicesIds([]);
    }
  }

  function handleSelectEmployees(
    selectedOptions: Option<number>[] | null
  ): void {
    if (selectedOptions) {
      setEmployeeIds(selectedOptions.map((option) => option.value));
    } else {
      setEmployeeIds([]);
    }
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
    setSignDate(new Date());
    setGPSLocation("");
    setWorkplacesIds([]);
    setEmployeeIds([]);
    setServicesIds([]);
  };

  const handleSubmit = async () => {
    let newCompanyId: number = companyId;

    if (isCustomCompanyVisible) {
      newCompanyId = await handleNewCompanyCreation(companyFormData);
    }
    const processCreateRequestDTO: ProcessCreateRequestDTO = {
      signDate: new Date(),
      companyId: newCompanyId,
      representativeId: representativeId,
      eSignature: eSignature,
      gpsLocation: gpsLocation,
      workplacesIds: workplacesIds,
      employeeIds: employeeIds,
      serviceIds: servicesIds,
    };

    try {
      console.log(processCreateRequestDTO);
      const response = await axios.post(
        "http://localhost:5179/process",
        processCreateRequestDTO
      );
      toast("Process submitted successfully:", response.data);
      console.log();
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

  const handleCompanyTypeChange = (selectedOption: {
    value: CompanyType;
    label: string;
  }) => {
    setCompanyType(selectedOption.value);
    setCompanyFormData({} as any);
  };

  return (
    <div className="min-h-screen bg-gray-100 justify-center border p-4 m-4 flex flex-col relative overflow-x-auto">
      <div className="container max-w-screen-lg mx-auto">
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
              className="w-full"
            />
          )}
        </div>
        <label className="flex my-2 items-center">
          <input
            type="checkbox"
            checked={isCustomCompanyVisible}
            onChange={handleCustomCompanyIsVisibleChange}
          ></input>
          <p className="px-2">My company is not in the list</p>
        </label>
        {isCustomCompanyVisible && (
          <div>
            <Select
              className="m-2 w-full"
              defaultValue={options.find(
                (option) => option.value === companyType
              )}
              onChange={handleCompanyTypeChange as any}
              options={options}
            />
            <GenericForm<CompanyData[typeof companyType]>
              key={companyType}
              fields={fieldMetadata[companyType]}
              formData={companyFormData}
              setFormData={setCompanyFormData}
              onSubmit={handleSubmit}
            />
          </div>
        )}
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
              onChange={handleSelectRepresentative}
              isMulti={false}
              className="w-full"
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
              className="w-full"
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
              required={true}
            />
          )}
        </div>
        <SignaturePad onSave={handleSignatureSave} />
        <hr className="border-1 border-slate-950 my-7"></hr>
        <div className="p-2 self-end">
          <button
            className="bg-green-300 hover:bg-green-400 text-white py-3 px-4 rounded focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
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
