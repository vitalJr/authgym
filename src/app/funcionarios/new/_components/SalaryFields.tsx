"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import formStyles from "../../_form.module.css";
import styles from "./SalaryFields.module.css";

export const SalaryFields = () => {
  const [salaryMonths, setSalaryMonths] = useState(12);
  const [monthlySalary, setMonthlySalary] = useState("");

  const annualEstimate =
    monthlySalary === ""
      ? null
      : (Number(monthlySalary) * salaryMonths).toFixed(2);

  const handleSalaryMonthsChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSalaryMonths(Number(event.target.value));
  };

  const handleMonthlySalaryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMonthlySalary(event.target.value);
  };

  return (
    <>
      <label className={formStyles.field}>
        <span className={formStyles.label}>Salary payments per year</span>
        <select
          name="salaryMonths"
          value={salaryMonths}
          onChange={handleSalaryMonthsChange}
          required
          className={formStyles.select}
        >
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
        </select>
      </label>

      <label className={formStyles.field}>
        <span className={formStyles.label}>Monthly salary</span>
        <input
          name="salary"
          type="number"
          min={0}
          step="0.01"
          required
          value={monthlySalary}
          onChange={handleMonthlySalaryChange}
          className={formStyles.input}
        />
        {annualEstimate && (
          <span className={styles.hint}>Annual estimate: {annualEstimate}</span>
        )}
      </label>
    </>
  );
};
