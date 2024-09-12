import { createContext, useContext } from 'react';

import { store } from '@prisma/client';

export const DashboardContext = createContext<store | undefined>(undefined);

export function useStoreContext() {
  const storeId = useContext(DashboardContext);

  if (storeId === undefined) {
    throw new Error('useStoreContext must be used with a DashboardContext');
  }

  return storeId;
}