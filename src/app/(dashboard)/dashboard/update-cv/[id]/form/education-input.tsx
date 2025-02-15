import { CSS } from "@dnd-kit/utilities";
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
import { CalendarIcon, GripVertical, XCircle } from "lucide-react";
import {
  Control,
  useFieldArray,
  useFormContext,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";

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
  const { control, setValue, watch, getValues } = useFormContext<CvValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const handleDrag = (event: {
    active: { id: string | number };
    over: { id: string | number } | null;
  }) => {
    if (!event.active || !event.over) return;

    const { active, over } = event;

    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const currentValues = getValues().educations.map((item) => ({
        ...item,
      }));

      const updateList = arrayMove(currentValues, oldIndex, newIndex);

      setValue("educations", updateList);
    }
  };

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
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDrag}>
        <SortableContext items={fields.map((item) => item.id)}>
          <div className="flex flex-col gap-2">
            {fields.map((item, index) => (
              <InputItem
                key={item.id}
                id={item.id}
                handleRemoveEducations={() => handleRemoveEducation(index)}
                index={index}
                control={control}
                setValue={setValue}
                watch={watch}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button
        type="button"
        variant="secondary"
        className="w-full mt-3"
        onClick={handleAddEducation}
      >
        Add New Education
      </Button>
    </Card>
  );
}

interface InputItemProps {
  id: number | string;
  handleRemoveEducations: () => void;
  control: Control<CvValues>;
  setValue: UseFormSetValue<CvValues>;
  watch: UseFormWatch<CvValues>;
  index: number;
}

const InputItem = ({
  id,
  handleRemoveEducations,
  control,
  watch,
  setValue,
  index,
}: InputItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            {...attributes}
            {...listeners}
            className="cursor-grab"
          >
            <GripVertical />
          </Button>
          <h2>Hold to drag</h2>
        </div>
        <Button
          type="button"
          variant="destructive"
          onClick={handleRemoveEducations}
        >
          <XCircle />
        </Button>
      </div>
      <div>
        <FormField
          name={`educations.${index}.degree`}
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) =>
                    setValue(`educations.${index}.degree`, value)
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
          name={`educations.${index}.university`}
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
            name={`educations.${index}.startDate`}
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
            name={`educations.${index}.endDate`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        disabled={watch(`educations.${index}.current`)}
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
            watch(`educations.${index}.current`)
              ? "font-semibold"
              : "text-muted-foreground"
          }`}
        >
          Current
        </span>
        <Switch
          checked={watch(`educations.${index}.current`)}
          onCheckedChange={() => {
            setValue(
              `educations.${index}.current`,
              !watch(`educations.${index}.current`)
            );
          }}
        />
      </div>
    </div>
  );
};
