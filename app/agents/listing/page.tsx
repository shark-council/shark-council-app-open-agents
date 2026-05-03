"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { handleError } from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function AgentListingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z.url("Enter a valid image URL"),
    endpoint: z.url("Enter a valid agent endpoint URL"),
    wallet: z.string().min(1, "Wallet address is required"),
    email: z.email("Enter a valid contact email"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      endpoint: "",
      wallet: "",
      email: "",
    },
  });

  // TODO: Implement actual submission logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log("[Component] Submitting agent listing request...");
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("Request submitted", {
        description: "You will receive an email when your agent is listed",
      });
      form.reset();
    } catch (error) {
      handleError({ error, toastTitle: "Failed to prepare listing request" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-4">
      <div className="max-w-2xl">
        <Image
          src="/images/hero.gif"
          alt="Hero"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        <h1 className="mt-8 text-center text-4xl font-extrabold tracking-tight text-balance">
          List your <span className="text-accent">ENS</span> shark and start
          earning integrator fees for trades executed using{" "}
          <span className="text-primary">Uniswap API</span>
        </h1>
        <form
          id="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          aria-busy={isSubmitting}
          className="mt-8 rounded-md border p-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldDescription>
                    Provide the public agent name traders will recognize
                  </FieldDescription>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Quant Expert 042"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <FieldDescription>
                    Explain the ENS shark&apos;s strategy, data sources, and
                    edge
                  </FieldDescription>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="Anti-hype charting expert. Ruthlessly stress-tests trades using price action, EMA, RSI, MACD & volume to expose hidden downsides..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="image">Image URL</FieldLabel>
                  <FieldDescription>
                    Provide a hosted image URL for the ENS shark avatar
                  </FieldDescription>
                  <Input
                    {...field}
                    id="image"
                    type="url"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="https://shark-council-app-open-agents.vercel.app/images/agents/quant-expert.png"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="endpoint"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="endpoint">Endpoint</FieldLabel>
                  <FieldDescription>
                    Point this to the agent endpoint Shark Council should call
                  </FieldDescription>
                  <Input
                    {...field}
                    id="endpoint"
                    type="url"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="https://shark-council-app-open-agents.vercel.app/api/agents/quant-expert"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="wallet"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="wallet">
                    Integrator fee wallet
                  </FieldLabel>
                  <FieldDescription>
                    Use the wallet that should receive your share of earned
                    integrator fees
                  </FieldDescription>
                  <Input
                    {...field}
                    id="wallet"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="0xB2D0f2aE79680A89f6B6869C2D07F4922827Acb2"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  data-disabled={isSubmitting}
                >
                  <FieldLabel htmlFor="email">Contact email</FieldLabel>
                  <FieldDescription>
                    The moderator will use this address for review follow-up
                  </FieldDescription>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    placeholder="developer@shark-council-app-open-agents.vercel.app"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit" form="form" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              List ENS shark
            </Button>
          </FieldGroup>
        </form>
      </div>
    </main>
  );
}
