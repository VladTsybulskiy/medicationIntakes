import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { useStores } from 'src/store/hooks';
import { AddNote } from 'src/utils/constants';
import { Note } from 'src/utils/types';
import Header from './Header';
import NoteCard from './NoteCard';
import { strings } from 'src/utils/strings';
import { styles } from 'src/styles/components/NotesModal';

type Props = {
  id: string;
  notes: Note[];
  isVisible: boolean;
  closeModal: () => void;
};

const NotesModal = ({ id, notes, isVisible, closeModal }: Props) => {
  const ref = useRef<FlatList>();

  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>('');

  const { medicationIntakesStore } = useStores();

  const close = () => {
    setIsAddingNote(false);
    setNewNoteText('');
    closeModal();
  };

  const handleCreatingNewNote = () => {
    setIsAddingNote(false);
    if (!newNoteText.length) {
      return;
    }
    medicationIntakesStore.addNote(id, newNoteText);
    setNewNoteText('');
  };

  const addNote = () => {
    setIsAddingNote(true);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      onRequestClose={close}
      transparent={true}>
      <View style={styles.modal}>
        <SafeAreaView style={styles.root}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Header
                closeHandler={close}
                addHandler={addNote}
              />
              <KeyboardAvoidingView
                style={styles.root}
                behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
                <View style={styles.notesContainer}>
                  <FlatList
                    ref={ref}
                    data={isAddingNote ? [...notes, AddNote] : notes}
                    renderItem={({ item: note }) => (
                      <NoteCard
                        scrollRef={ref}
                        note={note}
                        handleCreatingNewNote={handleCreatingNewNote}
                        newNoteText={newNoteText}
                        setNewNoteText={setNewNoteText}
                      />
                    )}
                  />
                  {!notes.length && !isAddingNote ? (
                    <View style={styles.noNotesContainer}>
                      <Text style={styles.noNotesLabel}>{strings.noNotes}</Text>
                      <Pressable
                        onPress={addNote}
                        style={styles.plusIconContainer}
                        hitSlop={20}>
                        <Text style={styles.plusIcon}>＋</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default observer(NotesModal);
