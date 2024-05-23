import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuid } from 'uuid';

import { useStores } from 'src/store/hooks';
import MedicationForm from 'src/components/MedicationForm';
import { RootNavigationProp } from './types';
import { Intake } from 'src/utils/types';

const NewMedication = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const { medicationIntakesStore } = useStores();

  const submitForm = (values: Intake) => {
    const id = uuid();
    const counts = {
      currentCount: Number(values.currentCount),
      destinationCount: Number(values.destinationCount),
    };

    medicationIntakesStore.addNewIntake({ ...values, id, lastUpdated: new Date(), ...counts });
    navigation.goBack();
  };

  return <MedicationForm submitForm={submitForm} />;
};

export default observer(NewMedication);
