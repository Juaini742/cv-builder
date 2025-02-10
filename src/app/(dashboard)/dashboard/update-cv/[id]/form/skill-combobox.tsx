import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { skillItems } from "@/data/skills-item";
import { CvValues } from "@/lib/types";
import { Command } from "cmdk";
import { useState } from "react";
import { Control, UseFormSetValue } from "react-hook-form";

interface Props {
  setValue: UseFormSetValue<CvValues>;
  values: string[];
  control: Control<CvValues>;
}

export function SkillCombobox({ setValue, values, control }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [search, setSearch] = useState({
    value: "",
    open: false,
  });

  const filteredSkills = skillItems.filter((skill) =>
    skill.toLowerCase().includes(search.value.toLowerCase())
  );

  const handleKeyPress = (skill: string) => {
    if (!values.includes(skill)) {
      setValue("skills", [...values, skill]);
    }

    setSearch({ value: "", open: false });
  };

  const handleDelete = (skill: string) => {
    setValue(
      "skills",
      values.filter((s) => s !== skill)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredSkills.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredSkills.length) % filteredSkills.length
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSkills[activeIndex]) {
        handleKeyPress(filteredSkills[activeIndex]);
      }
    }
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-bold mb-2">Skills</h2>
      <div className="relative w-full">
        <FormField
          name="skills"
          control={control}
          render={({}) => (
            <FormItem>
              <FormLabel>Define all of your skills</FormLabel>
              <FormControl>
                <Command className="border rounded-md w-full">
                  <Input
                    placeholder="Select a skill..."
                    value={search.value}
                    onChange={(e) => {
                      setSearch({ value: e.target.value, open: true });
                      setActiveIndex(0);
                    }}
                    onFocus={() => setSearch({ value: "", open: true })}
                    onKeyDown={handleKeyDown}
                    className="outline-none border"
                  />

                  {search.open && (
                    <Command.List className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <Command.Item
                            key={skill}
                            value={skill}
                            onSelect={() => handleKeyPress(skill)}
                            className={`px-3 py-2 cursor-pointer ${
                              index === activeIndex
                                ? "bg-gray-200"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {skill}
                          </Command.Item>
                        ))
                      ) : (
                        <Command.Empty className="p-2 text-gray-500">
                          No results found.
                        </Command.Empty>
                      )}
                    </Command.List>
                  )}
                </Command>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap gap-2">
          {values.map((item, index) => (
            <button
              key={index}
              onClick={() => handleDelete(item)}
              className="flex items-center space-x-2 mt-2 px-2 py-1 bg-gray-200 rounded-md"
            >
              <span>{item}</span>
              <div className="text-red-500 hover:text-red-700">x</div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
