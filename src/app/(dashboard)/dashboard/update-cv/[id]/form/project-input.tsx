import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { EDITOR_SECRET_KEY } from "@/lib/constant";
import { editorInit } from "@/lib/editor.init";
import { CvValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { CalendarIcon, XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const initialValue = {
  name: "",
  position: "",
  startDate: new Date(),
  endDate: new Date(),
  current: false,
  description: "",
};

export default function ProjectInput() {
  const { control, setValue, watch } = useFormContext<CvValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const handleAddProject = () => append(initialValue);

  const handleRemoveProject = (index: number) => {
    remove(index);
  };

  return (
    <div className="card p-6 shadow-md rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Projects</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your projects
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>
                {index === 0 ? "Project" : "Projects"} {index + 1}
              </h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveProject(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div>
              <FormField
                name={`projects.${index}.name`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Project Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name={`projects.${index}.position`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Position" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 items-end w-full">
              <div className="flex-1">
                <FormField
                  name={`projects.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(new Date(date as Date))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  name={`projects.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              disabled={watch(`projects.${index}.current`)}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) =>
                                field.onChange(new Date(date as Date))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm ${
                  watch(`projects.${index}.current`)
                    ? "font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Current
              </span>
              <Switch
                checked={watch(`projects.${index}.current`)}
                onCheckedChange={() => {
                  setValue(
                    `projects.${index}.current`,
                    !watch(`projects.${index}.current`)
                  );
                }}
              />
            </div>
            <div>
              <FormField
                name={`projects.${index}.description`}
                control={control}
                render={({}) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        apiKey={EDITOR_SECRET_KEY}
                        value={watch(`projects.${index}.description`)}
                        init={editorInit}
                        onChange={(e) => {
                          setValue(
                            `projects.${index}.description`,
                            e.target.getContent()
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={handleAddProject}>
          Add New Project
        </Button>
      </div>
    </div>
  );
}
