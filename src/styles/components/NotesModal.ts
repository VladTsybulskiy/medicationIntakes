import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 5, 5, 0.8)',
    paddingHorizontal: 16,
  },
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    borderRadius: 12,
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  noNotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotesLabel: {
    textAlign: 'center',
    color: COLORS.black,
  },
  plusIconContainer: {
    marginTop: 24,
  },
  plusIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
});
