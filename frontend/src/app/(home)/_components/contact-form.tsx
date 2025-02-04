"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { contactSchema, TContact } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const ContactForm = () => {
  const baseUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL;
  const onSubmit = async (data: TContact) => {
    try {
      const response = await fetch(`${baseUrl}/base/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.message) {
        throw new Error(result.error || "Invalid response from server");
      }

      toast.success(result.message);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    }
  };
  const form = useForm<TContact>({
    resolver: zodResolver(contactSchema),
  });
  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center gap-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full mx-6 flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
                    placeholder="First Name"
                    onChange={field.onChange}
                    className="mb-3"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Email"
                    onChange={field.onChange}
                    className="mb-6"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    id="message"
                    placeholder="Type your message here..."
                    onChange={field.onChange}
                    className="h-32"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.message?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button variant="default" type="submit">
          Contact us
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
