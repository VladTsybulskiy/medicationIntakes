import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';

import MedicationForm from 'src/components/MedicationForm';
import { useStores } from 'src/store/hooks';
import { strings } from 'src/utils/strings';
import { MainNavigationProp, MainScreenRouteProps } from './types';
import { Intake } from 'src/utils/types';
import { styles } from 'src/styles/components/MedicationForm';

const MedicationDetails = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const route = useRoute<MainScreenRouteProps>();

  const { medicationIntakesStore } = useStores();

  const id = route?.params?.id;

  if (!id) {
    return <Text style={styles.wrong}>{strings.smthWentWrong}</Text>;
  }

  const submitForm = (values: Intake) => {
    const counts = {
      currentCount: Number(values.currentCount),
      destinationCount: Number(values.destinationCount),
    };
    medicationIntakesStore.updateIntake({ ...values, ...counts });
    navigation.goBack();
  };

  const handleDeleteIntake = (id: string) => {
    medicationIntakesStore.deleteIntake(id);
    navigation.goBack();
  };

  return (
    <MedicationForm
      id={id}
      submitForm={submitForm}
      deleteHandler={handleDeleteIntake}
    />
  );
};

export default observer(MedicationDetails);
