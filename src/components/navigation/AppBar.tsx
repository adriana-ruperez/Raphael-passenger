import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';

type AppBarAction = {
  accessibilityLabel: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export function AppBar({
  centered = false,
  leftAction,
  rightAction,
  title,
}: {
  centered?: boolean;
  leftAction?: AppBarAction;
  rightAction?: AppBarAction;
  title: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>
        {leftAction ? (
          <AppBarIconButton
            accessibilityLabel={leftAction.accessibilityLabel}
            icon={leftAction.icon}
            onPress={leftAction.onPress}
          />
        ) : null}
      </View>
      <View style={styles.center}>
        <Text style={[styles.title, centered ? styles.titleCentered : undefined]}>{title}</Text>
      </View>
      <View style={[styles.side, styles.sideRight]}>
        {rightAction ? (
          <AppBarIconButton
            accessibilityLabel={rightAction.accessibilityLabel}
            icon={rightAction.icon}
            onPress={rightAction.onPress}
          />
        ) : null}
      </View>
    </View>
  );
}

function AppBarIconButton({
  accessibilityLabel,
  icon,
  onPress,
}: AppBarAction) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed ? styles.iconButtonPressed : undefined]}
    >
      <Ionicons name={icon} size={20} color={palette.brand700} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  iconButtonPressed: {
    backgroundColor: palette.brandSoft,
  },
  side: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 44,
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    ...typography.h2,
    color: palette.brand700,
  },
  titleCentered: {
    textAlign: 'center',
  },
});
