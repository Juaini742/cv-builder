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
import { loginSchema, loginValue } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { login } from "./action";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<loginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: loginValue) {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }

        router.push("/dashboard");
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
                <Input type="email" placeholder="Email" {...field} />
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
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <Button variant="link" className="text-xs p-0 flex justify-start">
            <Link href="/sign-up">
              Don{"'"}t have an account, click here to sign up
            </Link>
          </Button>
          <Button disabled={isPending} variant="default" className="">
            <LogIn className="size-5" />
            {isPending ? "Loading" : "Sign In"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
export default LoginForm;
