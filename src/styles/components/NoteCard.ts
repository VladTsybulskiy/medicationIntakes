import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 8,
    minHeight: 64,
    marginRight: 1,
    color: COLORS.black,
  },
  noteCard: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  noteText: {
    color: COLORS.black,
  },
});
