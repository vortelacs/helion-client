import { Company } from "./Company";
import { Workplace } from "./Workplace";
import { Representative } from "./Representative";
import { Employee } from "./Employee";
import { System } from "./System";

export interface Process {
  id: number;
  date: Date;
  company: Company;
  workplaces: Workplace[];
  representatives: Representative[];
  employees: Employee[];
  systems: System[];
  eSignature: string;
  gpsLocation: string;
}
