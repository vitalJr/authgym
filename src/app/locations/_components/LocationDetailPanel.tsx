'use client';

import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import { Drawer } from '@/components/Drawer/Drawer';
import { COUNTRIES } from '@/types/location';
import type { Location } from '@/types/location';

import { updateLocationAction } from '../_actions';
import formStyles from '../_form.module.css';
import styles from './LocationDetailPanel.module.css';

interface LocationDetailPanelProps {
  location: Location;
  onClose: () => void;
}

export const LocationDetailPanel = ({
  location,
  onClose,
}: LocationDetailPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handlerUpdateLocation = (formData: FormData): void => {
    updateLocationAction(formData);
    onClose();
  };

  return (
    <Drawer open onClose={onClose} title={location.name}>
      <form
        key={isEditing ? 'editing' : 'viewing'}
        action={handlerUpdateLocation}
        className={formStyles.form}
      >
        <input type="hidden" name="id" value={location.id} />

        <label className={formStyles.field}>
          <span className={formStyles.label}>ID</span>
          <input
            defaultValue={location.id}
            disabled
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Name</span>
          <input
            name="name"
            defaultValue={location.name}
            required
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>City</span>
          <input
            name="city"
            defaultValue={location.city}
            required
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Country</span>
          <select
            name="country"
            defaultValue={location.country}
            required
            disabled={!isEditing}
            className={formStyles.select}
          >
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Description (optional)</span>
          <input
            name="description"
            defaultValue={location.description ?? ''}
            disabled={!isEditing}
            className={formStyles.input}
          />
        </label>

        {isEditing ? (
          <div className={styles.editActions}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </form>
    </Drawer>
  );
};
