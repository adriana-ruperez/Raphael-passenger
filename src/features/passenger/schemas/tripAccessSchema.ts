import { z } from 'zod';

import { t } from '@/src/i18n';
import { isValidPhone } from '@/src/utils/phone';

export const tripAccessFormSchema = z.object({
  date: z
    .string()
    .trim()
    .min(1, t('validation.date.required')),
  fullName: z
    .string()
    .trim()
    .min(2, t('validation.fullName.required')),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => isValidPhone(value), t('validation.phoneNumber.invalid')),
});

export type TripAccessFormValues = z.infer<typeof tripAccessFormSchema>;
