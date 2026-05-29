import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/src/components/layout/Screen';
import { AppBar } from '@/src/components/navigation/AppBar';
import { i18n, t } from '@/src/i18n';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

const LEGAL_INFO_URL = 'https://milanestransport.com/legal-info/';
const PRIVACY_POLICY_URL = 'https://milanestransport.com/privacy-policy/';
const SUPPORTED_LANGUAGES = ['es', 'en'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export default function SettingsScreen() {
  const [language, setLanguage] = useState<SupportedLanguage>(
    i18n.language.startsWith('en') ? 'en' : 'es',
  );

  const languageLabels: Record<SupportedLanguage, string> = {
    en: t('settings.englishLabel'),
    es: t('settings.spanishLabel'),
  };

  const handleLanguageChange = (nextLanguage: SupportedLanguage) => {
    if (nextLanguage === language) {
      return;
    }

    setLanguage(nextLanguage);
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <AppBar centered title={t('navigation.settings')} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.iconWrap}>
            <Ionicons name="language-outline" size={18} color={palette.brand700} />
          </View>
          <Text style={styles.sectionTitle}>{t('settings.languageTitle')}</Text>
        </View>

        <View style={styles.languageSelector}>
          {SUPPORTED_LANGUAGES.map((option) => {
            const isActive = language === option;

            return (
              <Pressable
                key={option}
                accessibilityRole="button"
                onPress={() => handleLanguageChange(option)}
                style={({ pressed }) => [
                  styles.languageOption,
                  isActive ? styles.languageOptionActive : undefined,
                  pressed && !isActive ? styles.languageOptionPressed : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.languageLabel,
                    isActive ? styles.languageLabelActive : undefined,
                  ]}
                >
                  {languageLabels[option]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.links}>
        <SettingsLink
          icon="document-text-outline"
          title={t('settings.legalTitle')}
          description={t('settings.legalDescription')}
          url={LEGAL_INFO_URL}
        />
        <SettingsLink
          icon="shield-checkmark-outline"
          title={t('settings.privacyTitle')}
          description={t('settings.privacyDescription')}
          url={PRIVACY_POLICY_URL}
        />
      </View>
    </Screen>
  );
}

function SettingsLink({
  description,
  icon,
  title,
  url,
}: {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  url: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => Linking.openURL(url)}
      style={({ pressed }) => [styles.linkRow, pressed ? styles.linkPressed : undefined]}
    >
      <View style={styles.linkMain}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={18} color={palette.brand700} />
        </View>
        <View style={styles.linkCopy}>
          <Text style={styles.linkTitle}>{title}</Text>
          <Text style={styles.linkDescription}>{description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={palette.brand700} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  divider: {
    backgroundColor: palette.line,
    height: 1,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: palette.brandSoft,
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  languageLabel: {
    ...typography.body,
    color: palette.brand700,
    fontWeight: '700',
    textAlign: 'center',
  },
  languageLabelActive: {
    color: palette.surface,
  },
  languageOption: {
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderColor: palette.lineStrong,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 64,
    paddingHorizontal: spacing.md,
  },
  languageOptionActive: {
    backgroundColor: palette.brand700,
    borderColor: palette.brand700,
  },
  languageOptionPressed: {
    opacity: 0.8,
  },
  languageSelector: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  linkCopy: {
    flex: 1,
    gap: 2,
  },
  linkDescription: {
    ...typography.bodySmall,
    color: palette.ink700,
  },
  linkMain: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },
  linkPressed: {
    opacity: 0.72,
  },
  linkRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'space-between',
    minHeight: 72,
    paddingVertical: spacing.xs,
  },
  linkTitle: {
    ...typography.body,
    color: palette.ink900,
    fontWeight: '600',
  },
  links: {
    gap: spacing.sm,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: palette.ink900,
  },
});
