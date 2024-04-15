import { Workplace } from "./Workplace";
import { Representative } from "./Representative";

export interface Company {
  id: number;
  cui: number;
  name: string;
  representatives: Representative[];
  workplaces: Workplace[];
}
