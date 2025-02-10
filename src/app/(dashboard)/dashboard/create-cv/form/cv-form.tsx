"use client";

import { Form } from "@/components/ui/form";
import { CvSchema, CvValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import ExperienceInput from "./experience-input";
import CertificationInput from "./certification-input";
import HobbyInput from "./hobby-input";
import LanguageInput from "./language-input";
import { useToast } from "@/hooks/use-toast";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import { CopyCheck, MoveLeft } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSingleCv } from "@/hooks/use-singleCv";
import DialogContainer from "@/components/custom/DialogContainer";
import LoadingScreen from "@/components/custom/LoadingScreen";

export const initialActiveForm = {
  basic: true,
  summary: true,
  skill: true,
  experiences: false,
  projects: false,
  educations: false,
  certifications: false,
  hobby: false,
  languages: false,
};

export default function CvForm({ cv }: { cv: ICv[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [duplicate, setDuplicate] = useState<string>("");
  const [activeForm, setActiveForm] = useState(initialActiveForm);
  const { cv: singleCv, isSingleCvLoading } = useSingleCv(duplicate as string);
  const form = useForm<CvValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: formDefaultValue,
  });

  const onDuplicate = () => {
    const formValues = duplicateValue(form, singleCv);
    if (!formValues) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    startTransition(() => {
      onSubmitAction(formValues).then(async (res) => {
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

        router.push(`/dashboard/update-cv/${res.data?.id}`);
      });
    });
  };

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
      return;
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

  console.log("error:", form.formState.errors);

  return (
    <>
      {isPending && (
        <LoadingScreen message="Please wait while we are creating your CV..." />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 relative"
        >
          <div className="w-full flex justify-between items-center">
            <Button type="button" onClick={() => router.back()}>
              <MoveLeft className="size-6" />
              back
            </Button>

            <div>
              <DialogContainer
                title="Duplicate CV"
                button={
                  <Button variant="outline" type="button">
                    <CopyCheck className="size-6" />
                    Duplicate from existing CV
                  </Button>
                }
                content={
                  <div>
                    <Select onValueChange={setDuplicate}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose CV" />
                      </SelectTrigger>
                      <SelectContent>
                        {cv?.map((item, index) => (
                          <SelectItem key={index} value={item.id}>
                            {item.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-3">
                      <ButtonWithLoading
                        onClick={onDuplicate}
                        type="button"
                        label="Duplicate"
                        isLoading={isSingleCvLoading || isPending}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>

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
              <ButtonWithLoading label="Save" isLoading={isPending} />
            </div>
            <ActiveFormControl
              activeForm={activeForm}
              setActiveForm={setActiveForm}
              toast={toast}
            />
          </div>
        </form>
      </Form>
    </>
  );
}

const duplicateValue = (form: UseFormReturn<CvValues>, singleCv: ICv) => {
  form.setValue("fullName", singleCv.fullName);
  form.setValue("email", singleCv.email);
  form.setValue("nationality", singleCv.nationality);
  form.setValue("maritalStatus", singleCv.maritalStatus);
  form.setValue("linkedInURL", singleCv.linkedInURL);
  form.setValue("portfolioURL", singleCv.portfolioURL);
  form.setValue("phoneNumber", singleCv.phoneNumber);
  form.setValue("address", singleCv.address);
  form.setValue("birthDay", new Date(singleCv.birthDay));
  form.setValue("gender", singleCv.gender);
  form.setValue("skills", singleCv.skills);
  form.setValue("summary", singleCv.summary);
  form.setValue(
    "experiences",
    singleCv.experiences.map((exp) => ({
      ...exp,
      startDate: new Date(exp.startDate),
      endDate: new Date(exp.endDate),
    }))
  );
  form.setValue(
    "projects",
    singleCv.projects.map((project) => ({
      ...project,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
    }))
  );
  form.setValue(
    "educations",
    singleCv.educations.map((edu) => ({
      ...edu,
      startDate: new Date(edu.startDate),
      endDate: new Date(edu.endDate),
    }))
  );
  form.setValue("certifications", singleCv.certifications);
  form.setValue("languages", singleCv.languages);

  return form.getValues();
};

const formDefaultValue = {
  fullName: "",
  email: "",
  phoneNumber: "",
  birthDay: new Date(),
  nationality: "",
  maritalStatus: "",
  gender: "",
  linkedInURL: "",
  portfolioURL: "",
  address: "",
  summary: "",
  skills: [],
  experiences: [],
  projects: [],
  educations: [],
  certifications: [],
  languages: [],
};
