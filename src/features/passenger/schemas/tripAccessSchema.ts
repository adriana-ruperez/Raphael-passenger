import { z } from 'zod';
import { type TFunction } from 'i18next';

import { isValidPhone } from '@/src/utils/phone';

export function createTripAccessFormSchema(t: TFunction) {
  return z.object({
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
}

export type TripAccessFormValues = z.infer<ReturnType<typeof createTripAccessFormSchema>>;
