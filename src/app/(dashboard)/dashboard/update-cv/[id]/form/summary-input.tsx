import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { UseFormReturn, UseFormSetValue } from "react-hook-form";
import { CvValues } from "@/lib/types";
import { EDITOR_SECRET_KEY } from "@/lib/constant";
import { editorInit } from "@/lib/editor.init";

interface Props {
  form: UseFormReturn<CvValues>;
  setValue: UseFormSetValue<CvValues>;
}

export default function SummaryInput({ form, setValue }: Props) {
  return (
    <div className="card p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Professional Summary</h2>
      <p className="text-sm text-gray-600 mb-6">
        Provide a brief summary about yourself and your career goals.
      </p>

      <FormField
        name="summary"
        control={form.control}
        render={({}) => (
          <FormItem>
            <FormControl>
              <Editor
                apiKey={EDITOR_SECRET_KEY}
                value={form.getValues().summary}
                init={editorInit}
                onChange={(e) => {
                  setValue("summary", e.target.getContent());
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="my-10"></div>
    </div>
  );
}
