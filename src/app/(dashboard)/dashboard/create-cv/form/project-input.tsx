import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { EDITOR_SECRET_KEY } from "@/lib/constant";
import { editorInit } from "@/lib/editor.init";
import { CvValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { CalendarIcon, XCircle } from "lucide-react";
import {
  Control,
  useFieldArray,
  useFormContext,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const initialValue = [
  {
    name: "",
    position: "",
    startDate: new Date(),
    endDate: new Date(),
    current: false,
    description: "",
  },
];

export default function ProjectInput() {
  const { control, setValue, watch, getValues } = useFormContext<CvValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const handleDrag = (event: {
    active: { id: string | number };
    over: { id: string | number } | null;
  }) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const currentValues = getValues().projects?.map((item) => ({
        ...item,
      }));
      const updatedList = arrayMove(currentValues, oldIndex, newIndex);

      setValue("projects", updatedList);
    }
  };

  const handleAddProject = () => append(initialValue);

  const handleRemoveProject = (index: number) => {
    remove(index);
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-lg font-bold mb-4">Projects</h2>
          <p className="text-sm text-gray-600 mb-6">
            Define all of your projects
          </p>
        </div>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDrag}>
        <SortableContext items={fields.map((item) => item.id)}>
          <div className="flex flex-col gap-3">
            {fields.map((item, index) => (
              <InputItem
                key={item.id}
                id={item.id}
                handleRemoveProject={() => handleRemoveProject(index)}
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
        onClick={handleAddProject}
      >
        Add New Project
      </Button>
    </Card>
  );
}

interface InputItemProps {
  id: number | string;
  handleRemoveProject: () => void;
  control: Control<CvValues>;
  setValue: UseFormSetValue<CvValues>;
  watch: UseFormWatch<CvValues>;
  index: number;
}

const InputItem = ({
  id,
  handleRemoveProject,
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
          onClick={handleRemoveProject}
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
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  apiKey={EDITOR_SECRET_KEY}
                  init={editorInit}
                  value={field.value}
                  onEditorChange={(content) => {
                    setValue(`projects.${index}.description`, content);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
