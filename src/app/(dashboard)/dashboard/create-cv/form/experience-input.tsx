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
  company: "",
  position: "",
  startDate: new Date(),
  endDate: new Date(),
  current: false,
  description: "",
};

export default function ExperienceInput() {
  const { control, setValue, watch } = useFormContext<CvValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const handleAddExperience = () => append(initialValue);

  const handleRemoveExperience = (index: number) => {
    remove(index);
  };

  return (
    <div className="card p-6 shadow-md rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Experiences</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your experience
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Experience {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveExperience(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div>
              <FormField
                name={`experience.${index}.company`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name={`experience.${index}.position`}
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
                  name={`experience.${index}.startDate`}
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
                  name={`experience.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              disabled={watch(`experience.${index}.current`)}
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
                  watch(`experience.${index}.current`)
                    ? "font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Current
              </span>
              <Switch
                checked={watch(`experience.${index}.current`)}
                onCheckedChange={() => {
                  setValue(
                    `experience.${index}.current`,
                    !watch(`experience.${index}.current`)
                  );
                }}
              />
            </div>
            <div>
              <FormField
                name={`experience.${index}.description`}
                control={control}
                render={({}) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        apiKey={EDITOR_SECRET_KEY}
                        init={editorInit}
                        onChange={(e) => {
                          setValue(
                            `experience.${index}.description`,
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
        <Button type="button" variant="secondary" onClick={handleAddExperience}>
          Add New Experience
        </Button>
      </div>
    </div>
  );
}
