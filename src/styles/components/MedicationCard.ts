import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  finishedLabel: {
    color: COLORS.red,
    fontSize: 12,
  },
  description: {
    opacity: 0.5,
    color: COLORS.black,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  buttonLabel: {
    fontSize: 24,
  },
});
