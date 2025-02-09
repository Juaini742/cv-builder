export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface IProject {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface IEducation {
  degree: string;
  university: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ICertification {
  name: string;
  institution: string;
  score: string;
  year: string;
}

export interface ILanguage {
  name: string;
  proficiency: string;
}

export interface ICv {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDay: Date;
  nationality: string;
  maritalStatus: string;
  gender: string;
  address: string;
  linkedInURL: string;
  portfolioURL: string;
  summary: string;
  skills: string[];
  experience: IExperience[];
  education: IEducation[];
  certifications: ICertification[];
  languages: ILanguage[];
  project: IProject[];
  createdAt: Date;
  updatedAt: Date;
}
