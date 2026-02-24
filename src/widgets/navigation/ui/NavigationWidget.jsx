'use client';

import { Navigation } from './Navigation';
import { useNavigation } from '../lib/useNavigation';
import { NavigationProvider } from '../model/NavigationContext';

export const NavigationWidget = () => {
  const navData = useNavigation();

  return (
    <NavigationProvider value={navData}>
      <Navigation />
    </NavigationProvider>
  );
};
