import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataLabel: {
    textAlign: 'center',
    color: COLORS.black,
  },
  addButton: {
    marginTop: 24,
  },
  plusIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
