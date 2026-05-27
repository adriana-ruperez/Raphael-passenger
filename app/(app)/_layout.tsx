import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { t } from '@/src/i18n';
import { palette } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: palette.canvas,
        },
        tabBarActiveTintColor: palette.brand700,
        tabBarInactiveTintColor: palette.ink600,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} name={focused ? 'home' : 'home-outline'} />
          ),
          title: t('navigation.home'),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              focused={focused}
              name={focused ? 'calendar' : 'calendar-outline'}
            />
          ),
          title: t('navigation.trips'),
        }}
      />
      <Tabs.Screen
        name="contact-office"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} name={focused ? 'call' : 'call-outline'} />
          ),
          title: t('navigation.contactOffice'),
        }}
      />
      <Tabs.Screen
        name="request-call"
        options={{
          href: null,
          title: t('navigation.requestCall'),
        }}
      />
      <Tabs.Screen
        name="trip-access"
        options={{
          href: null,
          title: t('navigation.tripAccess'),
        }}
      />
      <Tabs.Screen
        name="trip/[tripId]"
        options={{
          href: null,
          title: t('navigation.tripDetail'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
          title: t('navigation.settings'),
        }}
      />
      <Tabs.Screen
        name="trips-results"
        options={{
          href: null,
          title: t('navigation.tripsResults'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: palette.surface,
    borderTopColor: palette.line,
    height: 82,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  tabBarItem: {
    borderRadius: 8,
    marginHorizontal: 2,
  },
  tabBarLabel: {
    ...typography.label,
    fontWeight: '700',
  },
});
