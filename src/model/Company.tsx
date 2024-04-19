import { Workplace } from "./Workplace";
import { Representative } from "./Representative";

export interface Company {
  id: number;
  cui: number;
  name: string;
  workplaces: Workplace[];
}

// export interface SRL extends Company {
//   registrationCode: number;
// }

// export interface PFA extends Company {
//   cnp: number;
//   activity: string;
// }
