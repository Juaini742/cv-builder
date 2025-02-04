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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CvValues } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  birthDay: Date;
  form: UseFormReturn<CvValues>;
}

export default function BasicInput({ form, birthDay }: Props) {
  return (
    <div className="card p-6 shadow-md rounded-lg mt-10">
      <h2 className="text-lg font-bold mb-4">Personal Information</h2>
      <p className="text-sm text-gray-600 mb-6">
        Please provide your personal details accurately.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="birthDay"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Day</FormLabel>
              <FormControl>
                <div className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !birthDay && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2" />
                        {birthDay ? (
                          format(birthDay, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="nationality"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="maritalStatus"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="MARRIED">Married</SelectItem>
                    <SelectItem value="DIVORCED">Divorced</SelectItem>
                    <SelectItem value="WIDOWeED">WIDOWeED</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="PREFER_NOT_TO_SAY">
                      Prefer Not To say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
