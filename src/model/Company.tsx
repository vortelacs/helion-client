export interface Company {
  id: number;
  cui: number;
  name: string;
}

export interface SRL extends Company {
  registrationCode: number;
}

export interface PFA extends Company {
  cnp: number;
  activity: string;
}
