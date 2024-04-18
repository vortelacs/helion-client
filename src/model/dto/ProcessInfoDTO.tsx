export interface ProcessInfoDTO {
  id: number;
  signDate: Date;
  companyName: string | null;
  representativeId: number;
  eSignature: string;
  gpsLocation: string;
  employeeNames: string[];
  serviceNames: string[];
  workplace: { [key: string]: string };
}
