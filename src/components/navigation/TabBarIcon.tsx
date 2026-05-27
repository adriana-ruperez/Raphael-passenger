import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { palette } from '@/src/theme/colors';

type TabBarIconProps = {
  color: string;
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
};

export function TabBarIcon({ color, focused, name }: TabBarIconProps) {
  return (
    <View style={[styles.container, focused ? styles.containerActive : undefined]}>
      <Ionicons name={name} size={20} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    width: 44,
  },
  containerActive: {
    backgroundColor: palette.brandSoft,
  },
});
