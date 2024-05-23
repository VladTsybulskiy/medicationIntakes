import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: 24,
  },
  inputsContainer: {
    marginHorizontal: 16,
  },
  descriptionInput: {
    height: 100,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    width: '90%',
  },
  deleteButton: {
    marginTop: 12,
    borderColor: COLORS.red,
  },
  deleteLabel: {
    color: COLORS.red,
  },
  buttonLabel: {
    color: COLORS.black,
  },
  wrong: {
    color: COLORS.black,
  }
});
