"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registerSchema, registerValue } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { register } from "./action";
import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<registerValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: registerValue) {
    startTransition(async () => {
      register(values).then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        } else {
          toast({
            variant: "default",
            title: "Success",
            description: data.success,
          });
          router.push("/sign-in");
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button variant="link" className="text-xs p-0 flex justify-start">
            <Link href="/sign-in">Already have an account, sign in here</Link>
          </Button>
          <Button disabled={isPending} variant="default" className="">
            <LogIn className="size-5" />
            {isPending ? "Loading..." : "Sign Up"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
