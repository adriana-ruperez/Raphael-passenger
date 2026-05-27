import { env } from '@/src/config/env';
import { AppError } from '@/src/utils/errors';

type RequestOptions = {
  body?: unknown;
  method?: 'GET' | 'POST';
  query?: Record<string, string | undefined>;
};

export async function request<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  if (!env.apiBaseUrl) {
    throw new AppError('CONFIGURATION_ERROR', 'errors.configurationMissing');
  }

  const url = new URL(path, env.apiBaseUrl);

  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const payload = await tryParseJson(response);
    const translationKey =
      typeof payload?.messageKey === 'string'
        ? payload.messageKey
        : 'errors.requestFailed';

    throw new AppError('REQUEST_FAILED', translationKey, response.status);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

async function tryParseJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}
