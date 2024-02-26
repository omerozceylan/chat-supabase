"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import * as z from "zod";

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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      alert(error);
      return;
    }
    router.push("/rooms");
  }

  async function sigInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://chat-xi-rose.vercel.app/rooms",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }

  return (
    <div className="min-h-screen p-4 bg-white flex justify-center items-center">
      {" "}
      {/* <div>Login/Sigin</div> */}
      <div className="space-y-6 bg-white text-black p-4 w-80 rounded-lg border">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
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
                  <FormDescription></FormDescription>
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
                      className="text-black dark:bg-white bg-white"
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="h-9 px-3 text-sm mt-3 bg-black dark:bg-[#0f0f0f] text-white dark:hover:bg-slate-800 hover:bg-slate-800"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form> */}
        <div className="">Log in / Sign in</div>

        <div className="flex flex-col justify-center items-center gap-3">
          <button
            onClick={() => {
              sigInWithGoogle();
            }}
            className="w-full flex items-center rounded-md gap-2 bg-[var(--bg-main-secondary)] hover:bg-[var(--bg-main-primary)] border p-2 justify-center"
          >
            Login with Google <FcGoogle className="w-5 h-5" />
          </button>
          {/* <span className="font-semibold text-sm">
            Don't you have an account?
          </span>
          <Link className="w-full" href={"/auth/register"}>
            <button className="w-full flex items-center rounded-md gap-2 bg-[var(--bg-main-secondary)] hover:bg-[var(--bg-main-primary)] border p-2 justify-center ">
              register
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
