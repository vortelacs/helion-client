import { Company } from "./Company";
import { Workplace } from "./Workplace";
import { Representative } from "./Representative";
import { Employee } from "./Employee";
import { Service } from "./Service";

export interface Process {
  id: number;
  date: Date;
  company: Company;
  workplaces: Workplace[];
  representatives: Representative[];
  employees: Employee[];
  services: Service[];
  eSignature: string;
  gpsLocation: string;
}
