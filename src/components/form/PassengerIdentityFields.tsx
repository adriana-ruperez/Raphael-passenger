import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AppInput } from '@/src/components/form/AppInput';

type PassengerIdentityFieldValues = FieldValues & {
  fullName: string;
  phoneNumber: string;
};

type PassengerIdentityFieldsProps<TFieldValues extends PassengerIdentityFieldValues> = {
  control: Control<TFieldValues>;
  variant?: 'default' | 'glass';
};

export function PassengerIdentityFields<TFieldValues extends PassengerIdentityFieldValues>({
  control,
  variant = 'default',
}: PassengerIdentityFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const fullNameField = 'fullName' as Path<TFieldValues>;
  const phoneNumberField = 'phoneNumber' as Path<TFieldValues>;

  return (
    <>
      <Controller
        control={control}
        name={fullNameField}
        render={({ field, fieldState }) => (
          <AppInput
            label={t('forms.fullName.label')}
            placeholder={t('forms.fullName.placeholder')}
            autoCapitalize="words"
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            variant={variant}
          />
        )}
      />
      <Controller
        control={control}
        name={phoneNumberField}
        render={({ field, fieldState }) => (
          <AppInput
            label={t('forms.phoneNumber.label')}
            placeholder={t('forms.phoneNumber.placeholder')}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoCapitalize="none"
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            variant={variant}
          />
        )}
      />
    </>
  );
}
