import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { formatDateForDisplay } from '@/src/utils/formatters';

type AppDateFieldProps = {
  label: string;
  onChange: (value: string) => void;
  value: Date;
  variant?: 'default' | 'glass';
};

export function AppDateField({
  label,
  onChange,
  value,
  variant = 'default',
}: AppDateFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedDate = formatDateForDisplay(value);
  const weekdayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        weekday: 'long',
      }).format(value),
    [value],
  );

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') {
      setIsExpanded(false);
    }

    if (event.type !== 'set' || !selectedDate) {
      return;
    }

    const nextDate = new Date(selectedDate);
    nextDate.setHours(12, 0, 0, 0);
    onChange(nextDate.toISOString());
  };

  const handlePress = () => {
    setIsExpanded((current) => !current);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.shell,
          variant === 'glass' ? styles.shellGlass : styles.shellDefault,
        ]}
      >
        <Pressable
          accessibilityRole="button"
          onPress={handlePress}
          style={({ pressed }) => [
            styles.trigger,
            pressed ? styles.triggerPressed : undefined,
          ]}
        >
          <View style={styles.leadingIcon}>
            <Ionicons name="calendar-clear-outline" size={20} color={palette.brand700} />
          </View>

          <View style={styles.copy}>
            <Text style={styles.value}>{formattedDate}</Text>
            <Text style={styles.meta}>{capitalize(weekdayLabel)}</Text>
          </View>

          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={palette.brand700}
          />
        </Pressable>

        {Platform.OS === 'ios' ? (
          isExpanded ? (
            <View style={styles.pickerWrap}>
              <DateTimePicker
                display="inline"
                mode="date"
                onChange={handleChange}
                style={styles.pickerInline}
                value={value}
              />
            </View>
          ) : null
        ) : isExpanded ? (
          <DateTimePicker
            display="default"
            mode="date"
            onChange={handleChange}
            value={value}
          />
        ) : null}
      </View>
    </View>
  );
}

function capitalize(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...typography.label,
    color: palette.ink700,
  },
  leadingIcon: {
    alignItems: 'center',
    backgroundColor: palette.brandSoft,
    borderRadius: 999,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  meta: {
    ...typography.caption,
    color: palette.ink600,
  },
  pickerInline: {
    marginLeft: -8,
  },
  pickerWrap: {
    borderTopColor: palette.line,
    borderTopWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  shell: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  shellDefault: {
    backgroundColor: palette.surface,
    borderColor: palette.lineStrong,
  },
  shellGlass: {
    backgroundColor: palette.glassOverlay,
    borderColor: palette.glassBorder,
  },
  trigger: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  triggerPressed: {
    opacity: 0.78,
  },
  value: {
    ...typography.h3,
    color: palette.ink900,
  },
});
