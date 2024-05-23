import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useStores } from 'src/store/hooks';
import { Note } from 'src/utils/types';
import NotesModal from './NotesModal';
import { strings } from 'src/utils/strings';
import { styles } from 'src/styles/components/Notes';

type Props = {
  id: string;
};

const Notes = ({ id }: Props) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const { medicationIntakesStore } = useStores();

  const notes: Note[] =
    medicationIntakesStore.intakesList.find(intake => intake.id === id)?.notes ?? [];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <NotesModal
        id={id}
        notes={notes}
        isVisible={isModalVisible}
        closeModal={closeModal}
      />
      <Pressable
        style={styles.labelContainer}
        onPress={openModal}>
        <Text style={styles.label}>
          {strings.notes} ({notes.length})
        </Text>
      </Pressable>
    </View>
  );
};

export default observer(Notes);
