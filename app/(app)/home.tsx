import { useRouter } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { AppButton } from '@/src/components/ui/AppButton';
import { t } from '@/src/i18n';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen scrollable={false} contentContainerStyle={styles.content}>
      <AppBar
        centered
        title={t('navigation.home')}
        leftAction={{
          accessibilityLabel: t('navigation.trips'),
          icon: 'person-circle-outline',
          onPress: () => router.push('/(app)/trips'),
        }}
        rightAction={{
          accessibilityLabel: t('navigation.settings'),
          icon: 'settings-outline',
          onPress: () => router.push('/(app)/settings'),
        }}
      />

      <View style={styles.hero}>
        <Image
          source={require('../../assets/icono_sin_fondo-2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.actions}>
        <AppButton
          label={t('home.cards.requestCall.title')}
          onPress={() => router.push('/(app)/request-call')}
        />
        <AppButton
          label={t('home.cards.activateTrip.title')}
          onPress={() => router.push('/(app)/trips')}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '72%',
    maxHeight: 420,
    maxWidth: '88%',
    opacity: 0.2,
    tintColor: palette.brand700,
    width: '88%',
  },
});
