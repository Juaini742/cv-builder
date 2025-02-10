import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CvValues } from "@/lib/types";
import { XCircle } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const initialValue = {
  name: "",
  institution: "",
  score: "",
  year: "",
};

export default function CertificationInput() {
  const { control } = useFormContext<CvValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "certifications",
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
      <div>
        <h2 className="text-lg font-bold mb-4">Certification</h2>
        <p className="text-sm text-gray-600 mb-6">
          Define all of your certification
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {fields.map((item, index: number) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h2>Certification {index + 1}</h2>
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
              <Label>Institutation</Label>
              <Input
                type="text"
                value={item.institution}
                onChange={(e) =>
                  handleInputChange(index, "institution", e.target.value)
                }
                placeholder="Institutation"
              />
            </div>

            <div className="">
              <Label>Score</Label>
              <Input
                type="number"
                value={item.score}
                onChange={(e) =>
                  handleInputChange(index, "score", e.target.value)
                }
                placeholder="Score"
              />
            </div>

            <div className="">
              <Label>Year</Label>
              <Input
                type="number"
                value={item.year}
                onChange={(e) =>
                  handleInputChange(index, "year", e.target.value)
                }
                placeholder="Year"
              />
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={handleAddItem}>
          Add New Certification
        </Button>
      </div>
    </Card>
  );
}
