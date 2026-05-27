import { z } from 'zod';

import { t } from '@/src/i18n';
import { isValidPhone } from '@/src/utils/phone';

export const requestCallbackFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, t('validation.fullName.required')),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => isValidPhone(value), t('validation.phoneNumber.invalid')),
});

export type RequestCallbackFormValues = z.infer<typeof requestCallbackFormSchema>;
