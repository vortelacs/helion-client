export interface ProcessCreateRequestDTO {
  signDate: Date;
  companyId: number;
  representativeId: number;
  eSignature: string;
  gpsLocation: string;
  workplacesIds: number[];
  employeeIds: number[];
  serviceIds: number[];
}
