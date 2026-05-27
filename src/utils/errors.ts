import { t } from '@/src/i18n';

export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly translationKey: string,
    public readonly statusCode?: number,
  ) {
    super(translationKey);
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return t(error.translationKey);
  }

  return t('errors.generic');
}
