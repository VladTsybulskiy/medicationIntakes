import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const BUTTON_WIDTH = 140;

export const styles =  StyleSheet.create({
  button: {
    height: 60,
    width: BUTTON_WIDTH,
    backgroundColor: COLORS.black,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  currentCount: {
    fontSize: 18,
    color: COLORS.white,
  },
  circle: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.brown,
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: COLORS.white,
    fontSize: 24,
  },
  swipeArea: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationCount: {
    color: COLORS.white,
    fontSize: 8,
  },
});
