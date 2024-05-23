import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    marginLeft: 2,
    color: COLORS.black,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    minHeight: 32,
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightGrey,
    color: COLORS.black,
  },
  error: {
    fontSize: 10,
    height: 12,
    color: 'red',
  },
});
