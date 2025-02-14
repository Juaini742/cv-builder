"use client";

import { useState } from "react";
import { ICv } from "@/lib/interfaces";
import PreviewCv from "./preview-cv";
import PreviewCv2 from "./preview-cv2";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSingleCv } from "@/hooks/use-singleCv";
import { Skeleton } from "@/components/ui/skeleton";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsLeft, FileDown, SquarePen } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

export default function CVDetail() {
  const router = useRouter();
  const [type, setType] = useState("ATS1");
  const param = useParams<{ id: string }>();
  const { cv, isSingleCvLoading } = useSingleCv(param.id);

  if (isSingleCvLoading) {
    return <LoadingComponent />;
  }

  console.log(cv);

  return (
    <div className="flex flex-col items-center relative">
      <Card className="fixed w-fit bottom-10 p-3 flex gap-2">
        <div className="flex gap-3 items-center">
          <TooltipWrapper label="Back to Dashboard">
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              <ChevronsLeft className="size-5" />
            </Button>
          </TooltipWrapper>

          <TooltipWrapper label="Edit CV">
            <Button
              onClick={() => router.push(`/dashboard/update-cv/${cv.id}`)}
              variant="warning"
            >
              <SquarePen className="size-5" />
            </Button>
          </TooltipWrapper>
        </div>

        <div className="flex gap-3 items-center">
          <Select onValueChange={setType} defaultValue={type}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ATS1">ATS Template 1</SelectItem>
              <SelectItem value="ATS2">ATS Template 2</SelectItem>
            </SelectContent>
          </Select>

          <TooltipWrapper label="Download PDF">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <RenderSelectedDownloadPDF type={type} cv={cv} />
            </motion.div>
          </TooltipWrapper>
        </div>
      </Card>

      <RenderSelectedTemplate type={type} cv={cv} />
    </div>
  );
}

const TooltipWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const RenderSelectedDownloadPDF = ({ type, cv }: { type: string; cv: ICv }) => {
  return (
    <>
      {type === "ATS1" && <RenderDownloadPDF1 cv={cv} />}
      {type === "ATS2" && <RenderDownloadPDF2 cv={cv} />}
    </>
  );
};

const RenderDownloadPDF1 = ({ cv }: { cv: ICv }) => {
  return (
    <PDFDownloadLink
      document={<PreviewCv cv={cv} />}
      fileName={`${cv.fullName}.pdf`}
    >
      {/* {({ loading }: { loading: boolean }) => (
        <Button
          disabled={loading}
          className={`transition ${
            loading && "cursor-not-allowed bg-gray-400"
          }`}
        >
          {loading ? (
            <Loader className="size-6 animate-spin" />
          ) : (
            <FileDown className="size-6" />
          )}
        </Button>
      )} */}
      <Button className="bg-gray-400">
        <FileDown className="size-6" />
      </Button>
    </PDFDownloadLink>
  );
};

const RenderDownloadPDF2 = ({ cv }: { cv: ICv }) => {
  return (
    <PDFDownloadLink
      document={<PreviewCv2 cv={cv} />}
      fileName={`${cv.fullName}.pdf`}
    >
      <Button className="bg-gray-400">
        <FileDown className="size-6" />
      </Button>
    </PDFDownloadLink>
  );
};

const RenderSelectedTemplate = ({ type, cv }: { type: string; cv: ICv }) => {
  return (
    <>
      {type === "ATS1" && <RenderPDF1 cv={cv} />}
      {type === "ATS2" && <RenderPDF2 cv={cv} />}
    </>
  );
};

const RenderPDF1 = ({ cv }: { cv: ICv }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden p-2 sm:p-4">
      <PDFViewer
        className="rounded-lg w-full h-[48rem] overflow-hidden"
        showToolbar={false}
      >
        <PreviewCv cv={cv} />
      </PDFViewer>
    </div>
  );
};

const RenderPDF2 = ({ cv }: { cv: ICv }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden p-2 sm:p-4">
      <PDFViewer
        className="rounded-lg w-full h-[48rem] overflow-hidden"
        showToolbar={false}
      >
        <PreviewCv2 cv={cv} />
      </PDFViewer>
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <Skeleton className="w-full h-[80vh] rounded-lg" />
    </div>
  );
};
