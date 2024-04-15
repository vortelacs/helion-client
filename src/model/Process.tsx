interface Process {
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
