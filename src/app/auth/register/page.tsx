"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabase/client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(10, {
      message: "Username must be at least 10 characters.",
    }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signUp({
      ...values,
      options: {
        data: { username: values.username },
      },
    });
    if (error) {
      alert(error);
      return;
    }
    router.push("/rooms");
  }
  return (
    <div className="min-h-screen p-4 bg-white flex justify-center items-center">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-[var(--bg-main-primary)] text-black p-4 w-80 rounded-lg border"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-black dark:bg-white bg-white"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {/* This is your public display name. */}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black dark:bg-white bg-white"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription> </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    className="text-black dark:bg-white bg-white"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription> </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-black dark:bg-[#0f0f0f] text-white dark:hover:bg-slate-800 hover:bg-slate-800"
            type="submit"
          >
            Submit
          </Button>
          <div className="flex flex-col justify-center items-center gap-3">
            <button className="w-full flex items-center rounded-md gap-2 bg-[var(--bg-main-secondary)] hover:bg-[var(--bg-main-primary)] border p-2 justify-center">
              Login with Google <FcGoogle className="w-5 h-5" />
            </button>
            <span className="font-semibold text-sm">
              Do you already have an account?
            </span>
            <Link className="w-full" href={"/auth/login"}>
              <button className="w-full flex items-center rounded-md gap-2  border p-2 justify-center ">
                Login
              </button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
