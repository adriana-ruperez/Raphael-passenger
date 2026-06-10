import { PropsWithChildren, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/src/i18n';
import { useSessionStore } from '@/src/stores/sessionStore';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      }),
  );
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      void useSessionStore.persist.rehydrate();
    }
  }, [hasHydrated]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
