import { Pressable, Text, View } from 'react-native';
import { styles } from 'src/styles/components/NotesHeader';
import { strings } from 'src/utils/strings';

type Props = {
  closeHandler: () => void;
  addHandler: () => void;
};

const Header = ({ closeHandler, addHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={20}
        onPress={closeHandler}
        style={styles.button}>
        <Text style={styles.label}>{strings.close}</Text>
      </Pressable>
      <Pressable
        hitSlop={20}
        onPress={addHandler}
        style={styles.button}>
        <Text style={styles.label}>{strings.add}</Text>
      </Pressable>
    </View>
  );
};

export default Header;
