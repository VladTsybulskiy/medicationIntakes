import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum RootStackScreens {
  Main = 'Main',
  NewMedication = 'New Medication',
}

export type RootStackParamList = {
  [RootStackScreens.Main]:
    | {
        screen: MainScreens;
        params: { id: string };
      }
    | undefined;
  [RootStackScreens.NewMedication]: undefined;
};

export type RootNavigationProp<RouteName extends keyof RootStackParamList = RootStackScreens> =
  StackNavigationProp<RootStackParamList, RouteName>;

// Main
export enum MainScreens {
  Home = 'Home',
  MedicationDetails = 'Medication Details',
}

export type MainParamList = {
  [MainScreens.Home]: undefined;
  [MainScreens.MedicationDetails]: { id: string };
};

export type MainScreenRouteProps<RouteName extends keyof MainParamList = MainScreens> = RouteProp<
  MainParamList,
  RouteName
>;

export type MainNavigationProp<RouteName extends keyof MainParamList = MainScreens> =
  StackNavigationProp<MainParamList, RouteName>;
