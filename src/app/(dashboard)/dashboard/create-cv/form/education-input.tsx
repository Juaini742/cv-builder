import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CvValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const degrees = [
  "Kindergarten",
  "Primary School",
  "Middle School",
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Postdoctoral",
];

const initialValue = {
  degree: "",
  university: "",
  startDate: new Date(),
  endDate: new Date(),
  current: false,
};

export default function EducationInput() {
  const { control, setValue, watch } = useFormContext<CvValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const handleAddEducation = () => append(initialValue);

  const handleRemoveEducation = (index: number) => {
    remove(index);
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Educations</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your education
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Education {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveEducation(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div>
              <FormField
                name={`education.${index}.degree`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value: string) =>
                          setValue(`education.${index}.degree`, value)
                        }
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a degree" />
                        </SelectTrigger>
                        <SelectContent>
                          {degrees.map((degree) => (
                            <SelectItem key={degree} value={degree}>
                              {degree}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                name={`education.${index}.university`}
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="University" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 items-end w-full">
              <div className="flex-1">
                <FormField
                  name={`education.${index}.startDate`}
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
                  name={`education.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              disabled={watch(`education.${index}.current`)}
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
                  watch(`education.${index}.current`)
                    ? "font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Current
              </span>
              <Switch
                checked={watch(`education.${index}.current`)}
                onCheckedChange={() => {
                  setValue(
                    `education.${index}.current`,
                    !watch(`education.${index}.current`)
                  );
                }}
              />
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={handleAddEducation}>
          Add New Education
        </Button>
      </div>
    </Card>
  );
}
