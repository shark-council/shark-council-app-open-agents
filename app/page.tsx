"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { agentConfig } from "@/config/agent";
import { handleError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const agents = [
  agentConfig.quantExpert042,
  agentConfig.sentimentExpert009,
  agentConfig.macroExpert017,
];

export default function IndexPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    idea: z.string().min(1, "Idea is required"),
    agents: z.array(z.string()).min(1, "Select at least one agent"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: "",
      agents: [],
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
    <main className="flex flex-1 flex-col items-center px-4 py-4">
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
                  <FieldLabel htmlFor="idea">Trading idea</FieldLabel>
                  <Textarea
                    {...field}
                    id="idea"
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
            <Controller
              name="agents"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet>
                  <FieldLegend variant="label">Select agents</FieldLegend>
                  <FieldDescription>
                    Choose at least one ENS shark to join the debate.
                  </FieldDescription>
                  <FieldGroup data-slot="checkbox-group">
                    {agents.map((agent) => {
                      const isChecked = field.value.includes(agent.id);

                      return (
                        <Field
                          key={agent.id}
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                          data-disabled={isSubmitting}
                        >
                          <Checkbox
                            id={agent.id}
                            name={field.name}
                            checked={isChecked}
                            aria-invalid={fieldState.invalid}
                            disabled={isSubmitting}
                            onCheckedChange={(
                              checked: boolean | "indeterminate",
                            ) => {
                              const nextValue =
                                checked === true
                                  ? isChecked
                                    ? field.value
                                    : [...field.value, agent.id]
                                  : field.value.filter(
                                      (value) => value !== agent.id,
                                    );

                              field.onChange(nextValue);
                            }}
                          />
                          <FieldContent>
                            <FieldLabel htmlFor={agent.id}>
                              {agent.identity.name}
                            </FieldLabel>
                            <FieldDescription>
                              {agent.identity.description}
                            </FieldDescription>
                          </FieldContent>
                        </Field>
                      );
                    })}
                  </FieldGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
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
