import { useContext } from 'react';

import { MobxStoreContext } from './index';

export const useStores = () => {
  return useContext(MobxStoreContext);
};
