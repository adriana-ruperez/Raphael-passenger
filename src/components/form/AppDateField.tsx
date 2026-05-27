import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

type AppDateFieldProps = {
  label: string;
  onChange: (value: string) => void;
  value: Date;
};

export function AppDateField({ label, onChange, value }: AppDateFieldProps) {
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type !== 'set' || !selectedDate) {
      return;
    }

    const nextDate = new Date(selectedDate);
    nextDate.setHours(12, 0, 0, 0);
    onChange(nextDate.toISOString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <DateTimePicker
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          mode="date"
          onChange={handleChange}
          style={styles.picker}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  field: {
    alignItems: 'center',
    backgroundColor: palette.glassOverlay,
    borderColor: palette.glassBorder,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
  },
  label: {
    ...typography.label,
    color: palette.ink700,
  },
  picker: {
    alignSelf: 'stretch',
    flex: 1,
    marginLeft: Platform.OS === 'ios' ? -8 : 0,
  },
});
