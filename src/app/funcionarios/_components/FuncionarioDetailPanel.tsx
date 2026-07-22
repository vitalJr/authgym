'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button/Button';
import { Drawer } from '@/components/Drawer/Drawer';
import { Role } from '@/types/funcionario';
import type { Funcionario } from '@/types/funcionario';
import type { Location } from '@/types/location';

import {
  activateFuncionarioAccountAction,
  updateFuncionarioAction,
} from '../_actions';
import formStyles from '../_form.module.css';
import styles from './FuncionarioDetailPanel.module.css';

interface FuncionarioDetailPanelProps {
  funcionario: Funcionario;
  locations: Location[];
  onClose: () => void;
}

export const FuncionarioDetailPanel = ({
  funcionario,
  locations,
  onClose,
}: FuncionarioDetailPanelProps) => {
  const { data: session } = useSession();
  const canActivateAccounts = session?.user?.role === Role.GERENTE;

  const [isEditing, setIsEditing] = useState(false);
  const [salary, setSalary] = useState(funcionario.salary);
  const [salaryMonths, setSalaryMonths] = useState(funcionario.salaryMonths);
  const annualEstimate = (salary * salaryMonths).toFixed(2);

  const handlerUpdateEmployee = (formData: FormData): void => {
    updateFuncionarioAction(formData);
    onClose();
  };

  const startEditing = () => {
    setSalary(funcionario.salary);
    setSalaryMonths(funcionario.salaryMonths);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setSalary(funcionario.salary);
    setSalaryMonths(funcionario.salaryMonths);
    setIsEditing(false);
  };

  return (
    <Drawer open onClose={onClose} title={funcionario.name}>
      <div className={styles.avatarRow}>
        <Avatar name={funcionario.name} src={funcionario.photoUrl} size={64} />
      </div>

      {!funcionario.accountEnabled && (
        <div className={styles.pendingBanner}>
          <span>
            This account is pending activation and can&apos;t sign in yet.
          </span>
          {canActivateAccounts && (
            <form action={activateFuncionarioAccountAction}>
              <input type="hidden" name="id" value={funcionario.id} />
              <Button type="submit" variant="primary">
                Activate account
              </Button>
            </form>
          )}
        </div>
      )}

      <form
        key={isEditing ? 'editing' : 'viewing'}
        action={handlerUpdateEmployee}
        className={formStyles.form}
      >
        <input type="hidden" name="id" value={funcionario.id} />

        <label className={formStyles.field}>
          <span className={formStyles.label}>Email</span>
          <input
            defaultValue={funcionario.email}
            disabled
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Name</span>
          <input
            name="name"
            defaultValue={funcionario.name}
            required
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Phone</span>
          <input
            name="telefone"
            defaultValue={funcionario.telefone}
            required
            disabled={!isEditing}
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
              defaultValue={funcionario.age}
              required
              disabled={!isEditing}
              className={formStyles.input}
            />
          </label>

          <label className={formStyles.field}>
            <span className={formStyles.label}>Blood type</span>
            <select
              name="tipoSanguineo"
              defaultValue={funcionario.tipoSanguineo ?? ''}
              disabled={!isEditing}
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
            defaultValue={funcionario.role}
            required
            disabled={!isEditing}
            className={formStyles.select}
          >
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
            defaultValue={funcionario.location}
            required
            disabled={!isEditing}
            className={formStyles.select}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Manager</span>
          <input
            name="manager"
            defaultValue={funcionario.manager ?? ''}
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Salary payments per year</span>
          <select
            name="salaryMonths"
            value={salaryMonths}
            onChange={(event) =>
              setSalaryMonths(Number(event.target.value) as 12 | 13 | 14)
            }
            disabled={!isEditing}
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
            value={salary}
            onChange={(event) => setSalary(Number(event.target.value))}
            required
            disabled={!isEditing}
            className={formStyles.input}
          />
          <span className={styles.hint}>Annual estimate: {annualEstimate}</span>
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Vacation days</span>
          <input
            name="vocationsDay"
            type="number"
            min={0}
            defaultValue={funcionario.vocationsDay}
            required
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        {isEditing ? (
          <div className={styles.editActions}>
            <Button type="button" variant="outline" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        ) : (
          <Button type="button" variant="outline" onClick={startEditing}>
            Edit
          </Button>
        )}
      </form>
    </Drawer>
  );
};
