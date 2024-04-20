export type Leader = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  listOfCompanies: {
    id: number;
    name: string;
  }[];
};
