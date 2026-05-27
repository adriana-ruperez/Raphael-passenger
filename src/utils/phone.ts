export function isValidPhone(value: string): boolean {
  const digits = normalizePhone(value);
  return digits.length >= 7 && digits.length <= 15;
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '');
}
