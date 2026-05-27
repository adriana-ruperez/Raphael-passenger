import { t } from '@/src/i18n';

export function formatEta(minutes: number | null): string {
  if (minutes === null) {
    return t('common.status.noEta');
  }

  return `${minutes} min`;
}

export function formatPhoneForLink(value: string): string {
  return value.replace(/[^\d+]/g, '');
}

export function formatDateForQuery(value: Date): string {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateForDisplay(value: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(value);
}
