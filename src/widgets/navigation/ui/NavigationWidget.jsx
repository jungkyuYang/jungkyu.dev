'use client';

import { Navigation } from './Navigation';
import { NavigationProvider } from './NavigationContext';
import { useNavigation } from '../lib/useNavigation';

export const NavigationWidget = () => {
  const navData = useNavigation();

  return (
    <NavigationProvider value={navData}>
      <Navigation />
    </NavigationProvider>
  );
};
