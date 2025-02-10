export interface IUser {
  id: string;
  email: string;
  password: string;
  Profile: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience {
  company: string;
  position: string;
  startDate: string | Date;
  endDate?: string | undefined;
  current?: boolean;
  description: string;
}

export interface IProject {
  name: string;
  position: string;
  startDate: string | Date;
  endDate?: string | undefined;
  current?: boolean;
  description: string;
}

export interface IEducation {
  degree: string;
  university: string;
  startDate: string | Date;
  endDate?: Date;
  current?: boolean;
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
  experiences: IExperience[];
  educations: IEducation[];
  certifications: ICertification[];
  languages: ILanguage[];
  projects: IProject[];
  createdAt: Date;
  updatedAt: Date;
}
