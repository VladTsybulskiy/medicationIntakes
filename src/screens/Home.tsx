import { Button, Pressable, SafeAreaView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

import { useStores } from 'src/store/hooks';
import { strings } from 'src/utils/strings';
import { RootNavigationProp, RootStackScreens } from './types';
import MedicationCard from 'src/components/MedicationCard';
import { styles } from 'src/styles/components/Home';

const Home = () => {
  const { medicationIntakesStore } = useStores();
  const navigation = useNavigation<RootNavigationProp>();

  if (medicationIntakesStore.isListEmpty) {
    const toNewMedication = () => {
      navigation.navigate(RootStackScreens.NewMedication);
    };

    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.emptyListContainer}>
          <Text style={styles.noDataLabel}>{strings.noIntakes}</Text>
          <Pressable
            style={styles.addButton}
            hitSlop={24}
            onPress={toNewMedication}>
            <Text style={styles.plusIcon}>＋</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Button
        title="Delete All"
        onPress={medicationIntakesStore.deleteAll}
      />
      <View style={styles.listContainer}>
        <FlashList
          data={[
            ...medicationIntakesStore.currentIntakes,
            ...medicationIntakesStore.finishedIntakes,
          ]}
          renderItem={({ item: intake }) => <MedicationCard intake={intake}  />}
          estimatedItemSize={10}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(Home);
