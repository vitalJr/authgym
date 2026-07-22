"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/Button/Button";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { Role } from "@/types/funcionario";
import type { Funcionario } from "@/types/funcionario";
import type { Location } from "@/types/location";

import { createFuncionarioAction } from "../_actions";
import type { CreateFuncionarioState } from "../_actions";
import { PhotoUploadField } from "./PhotoUploadField";
import { SalaryFields } from "./SalaryFields";
import formStyles from "../../_form.module.css";

const initialState: CreateFuncionarioState = {};

interface FuncionarioFormProps {
  locations: Location[];
  managers: Funcionario[];
}

export const FuncionarioForm = ({ locations, managers }: FuncionarioFormProps) => {
  const [state, formAction, isPending] = useActionState(
    createFuncionarioAction,
    initialState,
  );
  const [isManagerRole, setIsManagerRole] = useState(
    state.values?.role === Role.GERENTE,
  );

  return (
    <form action={formAction} className={formStyles.form}>
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
        <span className={formStyles.label}>Photo (optional)</span>
        <PhotoUploadField />
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Email</span>
        <input
          name="email"
          type="email"
          required
          defaultValue={state.values?.email}
          className={
            state.fieldErrors?.email
              ? `${formStyles.input} ${formStyles.inputError}`
              : formStyles.input
          }
        />
        {state.fieldErrors?.email && (
          <span className={formStyles.fieldError}>
            {state.fieldErrors.email}
          </span>
        )}
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Password</span>
        <PasswordInput
          name="password"
          autoComplete="new-password"
          required
          className={formStyles.input}
        />
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Phone</span>
        <input
          name="telefone"
          required
          defaultValue={state.values?.telefone}
          className={formStyles.input}
        />
      </label>

      <div className={formStyles.fieldRow}>
        <label className={formStyles.field}>
          <span className={formStyles.label}>Age</span>
          <input
            name="age"
            type="number"
            min={0}
            required
            defaultValue={state.values?.age}
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Blood type</span>
          <select
            name="tipoSanguineo"
            defaultValue={state.values?.tipoSanguineo ?? ""}
            className={formStyles.select}
          >
            <option value="">Not specified</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>
      </div>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Role</span>
        <select
          name="role"
          required
          defaultValue={state.values?.role ?? ""}
          onChange={(event) =>
            setIsManagerRole(event.target.value === Role.GERENTE)
          }
          className={formStyles.select}
        >
          <option value="" disabled>
            Select a role
          </option>
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Location</span>
        <select
          name="location"
          required
          defaultValue={state.values?.location ?? ""}
          className={formStyles.select}
        >
          <option value="" disabled>
            Select a location
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Manager</span>
        <select
          name="manager"
          required={!isManagerRole}
          disabled={isManagerRole}
          defaultValue={state.values?.manager ?? ""}
          className={formStyles.select}
        >
          <option value="" disabled>
            {isManagerRole ? "Not applicable" : "Select a manager"}
          </option>
          {managers.map((manager) => (
            <option key={manager.id} value={manager.name}>
              {manager.name}
            </option>
          ))}
        </select>
      </label>

      <SalaryFields />

      <label className={formStyles.field}>
        <span className={formStyles.label}>Vacation days</span>
        <input
          name="vocationsDay"
          type="number"
          min={0}
          required
          defaultValue={state.values?.vocationsDay}
          className={formStyles.input}
        />
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className={formStyles.submit}
      >
        {isPending ? "Creating..." : "Create funcionario"}
      </Button>
    </form>
  );
};
