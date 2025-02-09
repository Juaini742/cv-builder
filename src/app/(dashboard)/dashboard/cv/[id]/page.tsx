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
import { ChevronsLeft, FileDown, Loader, SquarePen } from "lucide-react";

const types = [
  {
    name: "ATS1",
    label: "ATS 1",
  },
  {
    name: "ATS2",
    label: "ATS 2",
  },
];

export default function CVDetail() {
  const router = useRouter();
  const [type, setType] = useState("ATS1");
  const param = useParams<{ id: string }>();
  const { cv, isSingleCvLoading } = useSingleCv(param.id);

  if (isSingleCvLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex flex-col items-center px-6 space-y-6 min-h-screen py-8">
      {/* Download Button */}
      <div className="w-full flex  gap-2 justify-between items-center p-3 shadow rounded-md">
        <div className="flex gap-3 items-center">
          <Button type="button" onClick={() => router.push("/dashboard")}>
            <ChevronsLeft className="size-6" />
          </Button>
          <Button
            type="button"
            variant="warning"
            onClick={() => router.push(`/dashboard/update-cv/${param.id}`)}
          >
            <SquarePen className="size-6" />
          </Button>
        </div>
        <div className="flex gap-3 items-center">
          <Select onValueChange={setType} defaultValue={type}>
            <SelectTrigger>
              <SelectValue placeholder="Select Template" />
            </SelectTrigger>
            <SelectContent>
              {types.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <RenderSelectedDownloadPDF type={type} cv={cv} />
        </div>
      </div>

      {/* Preview CV */}
      <RenderSelectedTemplate type={type} cv={cv} />
    </div>
  );
}

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
      {({ loading }: { loading: boolean }) => (
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
      )}
    </PDFDownloadLink>
  );
};

const RenderDownloadPDF2 = ({ cv }: { cv: ICv }) => {
  return (
    <PDFDownloadLink
      document={<PreviewCv2 cv={cv} />}
      fileName={`${cv.fullName}.pdf`}
    >
      {({ loading }: { loading: boolean }) => (
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
      )}
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
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden p-4 ">
      <PDFViewer
        width="100%"
        style={{ height: "85vh" }}
        className=" rounded-lg"
        showToolbar={false}
      >
        <PreviewCv cv={cv} />
      </PDFViewer>
    </div>
  );
};

const RenderPDF2 = ({ cv }: { cv: ICv }) => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden p-4 ">
      <PDFViewer
        width="100%"
        style={{ height: "85vh" }}
        className=" rounded-lg"
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
      <Skeleton className="w-full h-12 rounded-lg" />
      <Skeleton className="w-full h-[80vh] rounded-lg" />
    </div>
  );
};
