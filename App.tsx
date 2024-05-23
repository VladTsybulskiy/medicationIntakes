import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Application from 'src/screens/navigators';
import { MobxStoreContext, RootStore } from 'src/store';
import { styles } from 'src/styles/components/App';

const App = () => {
  const rootStoreSingleton = new RootStore();

  return (
    <GestureHandlerRootView style={styles.root}>
      <MobxStoreContext.Provider value={rootStoreSingleton}>
        <Application />
      </MobxStoreContext.Provider>
    </GestureHandlerRootView>
  );
};

export default App;
