export interface CompanyCreateRequestDTO {
  cui: number;
  name: string;
}

export interface SRLCreateRequestDTO extends CompanyCreateRequestDTO {
  registrationCode: number;
}

export interface PFACreateRequestDTO extends CompanyCreateRequestDTO {
  cnp: number;
  activity: string;
}
