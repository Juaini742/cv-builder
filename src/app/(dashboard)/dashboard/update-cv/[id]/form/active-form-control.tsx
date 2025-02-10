/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { initialActiveForm } from "../../../create-cv/form/cv-form";
import DialogContainer from "@/components/custom/DialogContainer";
import PreviewCv from "../../../cv/[id]/preview-cv";
import { CvValues } from "@/lib/types";
import { PDFViewer } from "@react-pdf/renderer";

interface Props {
  activeForm: Record<string, boolean>;
  setActiveForm: Dispatch<SetStateAction<typeof initialActiveForm>>;
  toast: any;
  id: string;
  cv: CvValues;
}

const formSections = [
  { key: "basic", label: "Basic Info", required: true },
  { key: "summary", label: "Summary", required: true },
  { key: "skill", label: "Skills", required: true },
  { key: "experiences", label: "Experience", required: false },
  { key: "projects", label: "Project", required: false },
  { key: "educations", label: "Education", required: false },
  { key: "certifications", label: "Certifications", required: false },
  // { key: "hobby", label: "Hobbies", required: false },
  { key: "languages", label: "Languages", required: false },
];

export default function ActiveFormControl({
  activeForm,
  setActiveForm,
  toast,
  cv,
}: Props) {
  const [openActive, setOpenActive] = useState<boolean>(false);

  const handleToggle = (key: string, required: boolean) => {
    if (required) {
      toast({
        title: "Action Not Allowed",
        description: `You cannot disable ${key}. This section is required.`,
        variant: "destructive",
      });
      return;
    }

    setActiveForm((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <>
      <div className="block lg:hidden fixed top-14 right-5 z-10">
        <Button type="button" onClick={() => setOpenActive(!openActive)}>
          <Settings />
        </Button>
      </div>

      <Card
        className={`p-4 space-y-3 w-72 lg:w-1/3 h-fit translate-x-96 -mr-10 fixed z-10 top-24 right-5 lg:sticky lg:top-1 lg:translate-x-0 transition-all duration-300
        ${openActive ? "translate-x-0 mr-0" : "translate-x-full"}
        `}
      >
        <h2 className="font-semibold text-lg">Active Form Sections</h2>
        <div className="space-y-2">
          {formSections.map(({ key, label, required }) => (
            <div key={key} className="flex items-center justify-between">
              <span className={`text-sm ${required ? "font-semibold" : ""}`}>
                {label}
              </span>
              <Switch
                checked={activeForm[key as keyof typeof activeForm]}
                onCheckedChange={() => handleToggle(key, required)}
              />
            </div>
          ))}

          <DialogContainer
            button={
              <Button type="button" className="w-full">
                View CV
              </Button>
            }
            content={
              <div className="w-[20rem] lg:w-[50rem] flex justify-center">
                <PDFViewer
                  className="rounded-lg w-full h-[20rem] lg:h-[48rem] overflow-hidden"
                  showToolbar={false}
                >
                  <PreviewCv cv={cv} />
                </PDFViewer>
              </div>
            }
          />
          {/* <Button className="w-full">Download</Button> */}
        </div>
      </Card>
    </>
  );
}
