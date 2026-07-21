"use client";

import { useActionState } from "react";

import { Button } from "@/components/Button/Button";
import { COUNTRIES } from "@/types/location";

import { createLocationAction } from "../_actions";
import type { CreateLocationState } from "../_actions";
import formStyles from "../../_form.module.css";

const initialState: CreateLocationState = {};

export const LocationForm = () => {
  const [state, formAction, isPending] = useActionState(
    createLocationAction,
    initialState,
  );

  return (
    <form action={formAction} className={formStyles.form}>
      <label className={formStyles.field}>
        <span className={formStyles.label}>ID</span>
        <input
          name="id"
          required
          defaultValue={state.values?.id}
          className={
            state.fieldErrors?.id
              ? `${formStyles.input} ${formStyles.inputError}`
              : formStyles.input
          }
        />
        {state.fieldErrors?.id && (
          <span className={formStyles.fieldError}>{state.fieldErrors.id}</span>
        )}
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Name</span>
        <input
          name="name"
          required
          defaultValue={state.values?.name}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Description (optional)</span>
        <input
          name="description"
          defaultValue={state.values?.description}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>City</span>
        <input
          name="city"
          required
          defaultValue={state.values?.city}
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Country</span>
        <select
          name="country"
          required
          defaultValue={state.values?.country ?? ""}
          className={formStyles.select}
        >
          <option value="" disabled>
            Select a country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className={formStyles.submit}
      >
        {isPending ? "Creating..." : "Create location"}
      </Button>
    </form>
  );
};
