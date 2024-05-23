import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: COLORS.aliceblue,
    paddingHorizontal: 6,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
  },
});
