import { z } from 'zod';
import { type TFunction } from 'i18next';

import { isValidPhone } from '@/src/utils/phone';

export function createRequestCallbackFormSchema(t: TFunction) {
  return z.object({
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

export type RequestCallbackFormValues = z.infer<ReturnType<typeof createRequestCallbackFormSchema>>;
