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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative"
      >
        <Button
          type="button"
          onClick={() => router.back()}
          className="absolute -top-10 left-5"
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
            {activeForm.experiences && <ExperienceInput />}
            {activeForm.projects && <ProjectInput />}
            {activeForm.educations && <EducationInput />}
            {activeForm.certifications && <CertificationInput />}
            {activeForm.hobby && <HobbyInput />}
            {activeForm.languages && <LanguageInput />}
            <ButtonWithLoading label="Save Update" isLoading={isPending} />
          </div>
          <ActiveFormControl
            activeForm={activeForm}
            setActiveForm={setActiveForm}
            toast={toast}
            id={id}
            cv={form.getValues()}
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
    experiences: cv?.experiences
      ? cv.experiences.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        }))
      : [],
    projects: cv?.projects
      ? cv.projects.map((exp) => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : undefined,
          endDate: exp.endDate ? new Date(exp.endDate) : undefined,
        }))
      : [],
    educations: cv?.educations
      ? cv.educations.map((exp) => ({
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
    experiences: cv?.experiences.length !== 0 ? true : false,
    projects: cv?.projects.length !== 0 ? true : false,
    educations: cv?.educations.length !== 0 ? true : false,
    certifications: cv?.certifications.length !== 0 ? true : false,
    hobby: false,
    languages: cv?.languages.length !== 0 ? true : false,
  };
};
