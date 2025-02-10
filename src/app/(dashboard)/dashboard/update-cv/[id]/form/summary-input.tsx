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
import { Card } from "@/components/ui/card";

interface Props {
  form: UseFormReturn<CvValues>;
  setValue: UseFormSetValue<CvValues>;
}

export default function SummaryInput({ form, setValue }: Props) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold mb-4">Professional Summary</h2>
      <p className="text-sm text-gray-600 mb-6">
        Provide a brief summary about yourself and your career goals.
      </p>

      <FormField
        name="summary"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Editor
                apiKey={EDITOR_SECRET_KEY}
                init={editorInit}
                value={field.value}
                onEditorChange={(content) => {
                  setValue("summary", content);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="my-10"></div>
    </Card>
  );
}
