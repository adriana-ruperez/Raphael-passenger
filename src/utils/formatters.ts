import { t } from '@/src/i18n';

export function formatEta(value: string | number | null | undefined): string {
  const normalized = normalizeEta(value);
  if (!normalized) {
    return t('common.status.noEta');
  }

  return normalized;
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

function normalizeEta(value: string | number | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return formatMinutesAsTime(value);
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const amPmMatch = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])$/);
  if (amPmMatch) {
    let hours = Number(amPmMatch[1]);
    const minutes = Number(amPmMatch[2]);
    const suffix = amPmMatch[3].toLowerCase();

    if (suffix === 'pm' && hours < 12) {
      hours += 12;
    }

    if (suffix === 'am' && hours === 12) {
      hours = 0;
    }

    return `${pad2(hours)}:${pad2(minutes)}`;
  }

  const daySpanMatch = trimmed.match(/^(?:(\d+)\.)?(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (daySpanMatch) {
    const days = Number(daySpanMatch[1] ?? 0);
    const hours = Number(daySpanMatch[2]) + days * 24;
    const minutes = Number(daySpanMatch[3]);

    return `${pad2(hours)}:${pad2(minutes)}`;
  }

  const isoDurationMatch = trimmed.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (isoDurationMatch) {
    const hours = Number(isoDurationMatch[1] ?? 0);
    const minutes = Number(isoDurationMatch[2] ?? 0);
    const seconds = Number(isoDurationMatch[3] ?? 0);

    return formatMinutesAsTime(hours * 60 + minutes + Math.floor(seconds / 60));
  }

  if (/^\d+$/.test(trimmed)) {
    return formatMinutesAsTime(Number(trimmed));
  }

  return null;
}

function formatMinutesAsTime(totalMinutes: number): string {
  const safeMinutes = Math.max(0, Math.floor(totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  return `${pad2(hours)}:${pad2(minutes)}`;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}
