import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import MedicationDetails from '../MedicationDetails';
import Home from '../Home';
import { MainParamList, MainScreens, RootNavigationProp, RootStackScreens } from '../types';
import { strings } from 'src/utils/strings';

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const MainStackScreen = () => {
  const HomeStack = createStackNavigator<MainParamList>();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={({ navigation }: { navigation: RootNavigationProp }) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate(RootStackScreens.NewMedication)}
              title={strings.add}
            />
          ),
        })}
        name={MainScreens.Home}
        component={Home}
      />

      <HomeStack.Screen
        name={MainScreens.MedicationDetails}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          cardStyleInterpolator: forFade,
        }}
        component={MedicationDetails}
      />
    </HomeStack.Navigator>
  );
};

export default MainStackScreen;
