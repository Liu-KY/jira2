export interface Project {
  id: number;
  name: string;
  personId: number | undefined;
  pin: boolean;
  organization: string;
  created: number;
}
