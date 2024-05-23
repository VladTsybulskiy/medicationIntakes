import { createContext } from 'react';

import { IntakesStore } from './intakesStore';

export class RootStore {
  medicationIntakesStore: IntakesStore;

  constructor() {
    this.medicationIntakesStore = new IntakesStore();
  }
}

export const MobxStoreContext = createContext<RootStore>(null!);
