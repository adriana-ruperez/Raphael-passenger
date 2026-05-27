import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { RouteErrorBoundary } from '@/src/components/feedback/RouteErrorBoundary';
import { AppProviders } from '@/src/providers/AppProviders';
import { palette } from '@/src/theme/colors';
import { t } from '@/src/i18n';

export function ErrorBoundary(props: { error: Error; retry: () => void }) {
  return <RouteErrorBoundary {...props} />;
}

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTintColor: palette.ink900,
          headerStyle: {
            backgroundColor: palette.surface,
          },
          headerTitleStyle: {
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: palette.canvas,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(app)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            title: t('navigation.notFound'),
          }}
        />
      </Stack>
    </AppProviders>
  );
}
