"use client";

import { Form } from "@/components/ui/form";
import { CvSchema, CvValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ExperienceInput from "./experience-input";
import CertificationInput from "./certification-input";
import HobbyInput from "./hobby-input";
import LanguageInput from "./language-input";
import { useToast } from "@/hooks/use-toast";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BasicInput from "./basic-input";
import SummaryInput from "./summary-input";
import { SkillCombobox } from "./skill-combobox";
import { useState, useTransition } from "react";
import ActiveFormControl from "./active-form-control";
import EducationInput from "./education-input";
import ProjectInput from "./project-input";
import { onSubmitAction } from "../action";
import { ICv } from "@/lib/interfaces";

interface Props {
  id: string;
  cv: ICv | null;
}

export default function CvForm({ id, cv }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const initialActiveForm = activeFunction(cv);
  const [isPending, startTransition] = useTransition();
  const [activeForm, setActiveForm] = useState(initialActiveForm);
  const form = useForm<CvValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: formDefaultValue(id, cv),
  });

  const onSubmit = async (value: CvValues) => {
    if (form.getValues().skills.length === 0) {
      form.setError("skills", {
        type: "custom",
        message: "Please add at least one skill.",
      });
      toast({
        title: "Missing Validation",
        description: "Please add at least one skill.",
        variant: "destructive",
      });
    }

    console.log("LAST RESULT VALUE:", value);

    startTransition(() => {
      onSubmitAction(value).then(async (res) => {
        if (res.error) {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: res.message,
          variant: "default",
        });
        router.push(`/dashboard/cv/${res?.data?.id}`);
      });
    });
  };

  console.log("error:", form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative"
      >
        <Button
          type="button"
          onClick={() => router.back()}
          className="absolute -top-5 left-5"
        >
          <MoveLeft className="size-6" />
          back
        </Button>

        <div className="w-full flex gap-5">
          <div className="flex-1 space-y-8">
            {activeForm.basic && (
              <BasicInput form={form} birthDay={form.watch("birthDay")} />
            )}
            {activeForm.summary && (
              <SummaryInput form={form} setValue={form.setValue} />
            )}
            {activeForm.skill && (
              <SkillCombobox
                setValue={form.setValue}
                values={form.watch("skills")}
                control={form.control}
              />
            )}
            {activeForm.experience && <ExperienceInput />}
            {activeForm.projects && <ProjectInput />}
            {activeForm.education && <EducationInput />}
            {activeForm.certification && <CertificationInput />}
            {activeForm.hobby && <HobbyInput />}
            {activeForm.language && <LanguageInput />}
            <ButtonWithLoading label="Save Update" isLoading={isPending} />
          </div>
          <ActiveFormControl
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            toast={toast}
          />
        </div>
      </form>
    </Form>
  );
}

const formDefaultValue = (id: string, cv: ICv | null) => {
  return {
    id: id || "",
    fullName: cv?.fullName || "",
    email: cv?.email || "",
    phoneNumber: cv?.phoneNumber || "",
    birthDay: cv?.birthDay ? new Date(cv.birthDay) : new Date(),
    nationality: cv?.nationality || "",
    maritalStatus: cv?.maritalStatus || "",
    gender: cv?.gender || "",
    linkedInURL: cv?.linkedInURL || "",
    portfolioURL: cv?.portfolioURL || "",
    address: cv?.address || "",
    summary: cv?.summary || "",
    skills: cv?.skills || [],
    experience: cv?.experience
      ? cv.experience.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        }))
      : [],
    projects: cv?.project
      ? cv.project.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        }))
      : [],
    education: cv?.education
      ? cv.education.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        }))
      : [],
    certifications: cv?.certifications || [],
    languages: cv?.languages || [],
  };
};

const activeFunction = (cv: ICv | null) => {
  return {
    basic: true,
    summary: true,
    skill: true,
    experience: cv?.experience.length !== 0 ? true : false,
    projects: cv?.project.length !== 0 ? true : false,
    education: cv?.education.length !== 0 ? true : false,
    certification: cv?.certifications.length !== 0 ? true : false,
    hobby: false,
    language: cv?.languages.length !== 0 ? true : false,
  };
};
