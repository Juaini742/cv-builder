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
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BasicInput from "./basic-input";
import SummaryInput from "./summary-input";
import { SkillCombobox } from "./skill-combobox";
import { useState } from "react";
import ActiveFormControl from "./active-form-control";
import EducationInput from "./education-input";

export const initialActiveForm = {
  basic: true,
  summary: true,
  skill: true,
  experience: false,
  education: false,
  certification: false,
  hobby: false,
  language: false,
};

export default function CvForm({
  userId,
}: {
  userId: string | undefined | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeForm, setActiveForm] = useState(initialActiveForm);
  const form = useForm<CvValues>({
    resolver: zodResolver(CvSchema),
    defaultValues: {
      userId: userId ?? "",
      fullName: "",
      birthDay: new Date(),
      nationality: "",
      maritalStatus: "",
      gender: "",
      address: "",
      summary: "",
      skills: [],
      experience: [],
      education: [],
      certifications: [],
      languages: [],
    },
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
      return;
    }

    toast({
      title: "Success",
      description: "Your CV has been created successfully.",
      variant: "default",
    });

    console.log("FORM VALUES ONSUBMIT:", value);
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
            {activeForm.experience && <ExperienceInput />}
            {activeForm.education && <EducationInput />}
            {activeForm.certification && <CertificationInput />}
            {activeForm.skill && (
              <SkillCombobox
                setValue={form.setValue}
                values={form.watch("skills")}
                control={form.control}
              />
            )}
            {activeForm.hobby && <HobbyInput />}
            {activeForm.language && <LanguageInput />}

            <ButtonWithLoading label="Save" isLoading={false} />
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
