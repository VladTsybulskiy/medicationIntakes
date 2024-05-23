import { KeyboardType, Text, TextInput, View, ViewStyle } from 'react-native';
import { styles } from 'src/styles/common/Input';

const Input = ({
  label,
  value,
  setValue,
  keyboardType,
  error,
  style,
  multiline,
}: {
  label: string;
  value: string;
  keyboardType?: KeyboardType;
  setValue: (value: string) => void;
  error?: string;
  style?: ViewStyle;
  multiline?: boolean;
}) => {
  const isNumeric = keyboardType === 'number-pad';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={[styles.input, style]}
        keyboardType={keyboardType ?? 'default'}
        value={value}
        multiline={multiline ?? false}
        onChangeText={value =>
          isNumeric ? setValue(Number(value.replace(/[^0-9]/g, '')).toString()) : setValue(value)
        }
      />
      <Text style={[styles.error, { opacity: error ? 1 : 0 }]}>{error}</Text>
    </View>
  );
};

export default Input;
