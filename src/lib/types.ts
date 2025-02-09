import * as z from "zod";

const requiredString = z.z
  .string({ required_error: "This field is required." })
  .min(1, "This field is required");

export const registerSchema = z.object({
  email: z.string().email("Invalid format email"),
  password: requiredString.min(6),
});

export type registerValue = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid format email"),
  password: requiredString,
});

export type loginValue = z.infer<typeof loginSchema>;

const ExperienceSchema = z
  .object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.date().refine((date) => date.getTime() <= Date.now(), {
      message: "Start date cannot be in the future",
    }),
    endDate: z
      .date()
      .optional()
      .refine((date) => !date || date.getTime() <= Date.now(), {
        message: "End date cannot be in the future",
      }),
    current: z.boolean().optional(),
    description: z.string().min(1, "Description is required"),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

const ProjectsSchema = z
  .object({
    name: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    startDate: z.date().refine((date) => date.getTime() <= Date.now(), {
      message: "Start date cannot be in the future",
    }),
    endDate: z
      .date()
      .optional()
      .refine((date) => !date || date.getTime() <= Date.now(), {
        message: "End date cannot be in the future",
      }),
    current: z.boolean().optional(),
    description: z.string().min(1, "Description is required"),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

const EducationSchema = z
  .object({
    degree: requiredString,
    university: requiredString,
    startDate: z.date().refine((date) => date.getTime() <= Date.now(), {
      message: "Start date cannot be in the future",
    }),
    endDate: z
      .date()
      .optional()
      .refine((date) => !date || date.getTime() <= Date.now(), {
        message: "End date cannot be in the future",
      }),
    current: z.boolean().optional(),
  })
  .refine((data) => !data.endDate || data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

const CertificationSchema = z.object({
  name: requiredString,
  institution: requiredString,
  score: requiredString,
  year: requiredString,
});

const HobbySchema = z.object({
  name: requiredString,
  description: requiredString,
});

const LanguageSchema = z.object({
  name: requiredString,
  proficiency: requiredString,
});

export const CvSchema = z
  .object({
    id: z.string().optional(),
    userId: z.string().optional(),
    fullName: z
      .string({ required_error: "This field is required." })
      .max(255, "Full name cannot exceed 255 characters.")
      .min(1, "This field is required"),
    email: z
      .string({ required_error: "This field is required." })
      .max(255, "Full name cannot exceed 255 characters.")
      .min(1, "This field is required"),
    phoneNumber: z
      .string({ required_error: "This field is required." })
      .max(255, "Full name cannot exceed 255 characters.")
      .min(10, "This field is required"),
    linkedInURL: z
      .string({ required_error: "This field is required." })
      .url("Please enter a valid LinkedIn URL.")
      .max(255, "URL cannot exceed 255 characters."),
    portfolioURL: z
      .string({ required_error: "This field is required." })
      .url("Please enter a valid portfolio URL.")
      .max(255, "URL cannot exceed 255 characters."),
    birthDay: z.date().refine((data) => data < new Date(), {
      message: "Birth day must be in the past",
    }),
    nationality: z
      .string({ required_error: "Nationality is required." })
      .max(255, "Nationality cannot exceed 255 characters.")
      .min(1, "This field is required"),
    maritalStatus: z
      .string({ required_error: "Marital status is required." })
      .min(1, "This field is required"),
    gender: z
      .string({ required_error: "Gender is required." })
      .min(1, "This field is required"),
    address: z
      .string({ required_error: "Address is required." })
      .max(1000, "Address cannot exceed 1000 characters.")
      .min(1, "This field is required"),
    summary: z
      .string({ required_error: "Summary is required." })
      .max(2000, "Summary cannot exceed 2000 characters.")
      .min(1, "This field is required"),
    skills: z.array(z.string()),
    experience: z.array(ExperienceSchema),
    projects: z.array(ProjectsSchema),
    education: z.array(EducationSchema),
    certifications: z.array(CertificationSchema).optional(),
    hobbies: z.array(HobbySchema).optional(),
    languages: z.array(LanguageSchema).optional(),
  })
  .refine((item) => item.birthDay < new Date(), {
    message: "Birth day must be in the past",
    path: ["birthDay"],
  });

export type CvValues = z.infer<typeof CvSchema>;
