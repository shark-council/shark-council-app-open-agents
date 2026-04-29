"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { handleError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function IndexPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    idea: z.string().min(1, "Idea is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("[Component] Submitting idea...");
      setIsSubmitting(true);

      console.log({ data });

      form.reset();
      toast.success("Idea submitted!");
    } catch (error) {
      handleError({ error, toastTitle: "Failed to submit idea" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <div className="max-w-2xl">
        {/* Hero */}
        <Image
          src="/images/hero.png"
          alt="Hero"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        {/* Title */}
        <h2 className="text-3xl font-bold tracking-tight text-center mt-6">
          Let ENS sharks roast your trade ideas, then execute the winners using
          Uniswap API
        </h2>
        {/* Form */}
        <form
          id="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          aria-busy={isSubmitting}
          className="border rounded-md p-4 mt-8"
        >
          <FieldGroup>
            <Controller
              name="idea"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="idea-input">Trading idea</FieldLabel>
                  <Input
                    {...field}
                    id="idea-input"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Should I long BTC if..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" form="form" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              Submit
            </Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
