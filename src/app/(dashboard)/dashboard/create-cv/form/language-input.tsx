import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CvValues } from "@/lib/types";
import { XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const initialValue = {
  name: "",
  proficiency: "",
};

export default function LanguageInput() {
  const { control } = useFormContext<CvValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "languages",
  });

  const handleAddItem = () => append(initialValue);

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  const handleInputChange = (
    index: number,
    key: keyof typeof initialValue,
    value: string
  ) => {
    const updateItem = { ...fields[index], [key]: value };
    update(index, updateItem);
  };

  return (
    <Card className="p-5">
      <div className="">
        <h2 className="text-lg font-bold mb-4">Language</h2>
        <p className="text-sm text-gray-600 mb-6">
          Define all of your language
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index: number) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Language {index + 1}</h2>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveItem(index)}
                className="w-fit"
              >
                <XCircle />
              </Button>
            </div>
            <div className="">
              <Label>Name</Label>
              <Input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                placeholder="Name"
              />
            </div>
            <div className="">
              <Label>Proficiency</Label>
              <Select
                onValueChange={(value: string) =>
                  handleInputChange(index, "proficiency", value)
                }
                value={item.proficiency || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category of skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={handleAddItem}>
          Add New Language
        </Button>
      </div>
    </Card>
  );
}
