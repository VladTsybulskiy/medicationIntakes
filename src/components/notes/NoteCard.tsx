import { RefObject, SetStateAction } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';

import { styles } from 'src/styles/components/NoteCard';
import { isAdding } from 'src/utils/constants';

import { Note } from 'src/utils/types';

type Props = {
  note: Note;
  scrollRef: RefObject<FlatList>;
  handleCreatingNewNote: () => void;
  newNoteText: string;
  setNewNoteText: (value: SetStateAction<string>) => void;
};

const NoteCard = ({
  note,
  scrollRef,
  handleCreatingNewNote,
  newNoteText,
  setNewNoteText,
}: Props) => {
  const focusOnInput = () => {
    setTimeout(() => scrollRef?.current?.scrollToEnd({ animated: true }), 500);
  };

  return (
    <View style={styles.container}>
      {note.id === isAdding ? (
        <TextInput
          autoFocus={true}
          onFocus={focusOnInput}
          onSubmitEditing={handleCreatingNewNote}
          returnKeyType="done"
          style={styles.textInput}
          blurOnSubmit={true}
          multiline={true}
          value={newNoteText}
          onChangeText={setNewNoteText}
        />
      ) : (
        <View
          style={styles.noteCard}
          key={note.id}>
          <Text style={styles.noteText}>{note.text}</Text>
        </View>
      )}
    </View>
  );
};

export default NoteCard;
