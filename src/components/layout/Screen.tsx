import { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

type ScreenProps = PropsWithChildren<
  ScrollViewProps & {
    scrollable?: boolean;
  }
>;

export function Screen({
  children,
  contentContainerStyle,
  scrollable = true,
  ...props
}: ScreenProps) {
  const sharedContentStyle = [styles.content, contentContainerStyle] as ViewStyle[];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={sharedContentStyle}
            showsVerticalScrollIndicator={false}
            {...props}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={sharedContentStyle}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: palette.canvas,
    flex: 1,
  },
});
