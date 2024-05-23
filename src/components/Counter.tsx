import { Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useAnimatedCounter as useAnimated } from 'src/hooks/useAnimated';
import { styles } from 'src/styles/components/Counter';

type Props = {
  currentCount: number;
  destinationCount: number;
  isDisabled: boolean;
  decrement: () => void;
  increment: () => void;
};

const SlidingCounter = ({
  currentCount,
  isDisabled,
  decrement,
  increment,
  destinationCount,
}: Props) => {
  const { onPanGestureEvent, rStyle, rPlusMinusIconStyle, rButtonStyle } = useAnimated({
    increment,
    decrement,
  });

  return (
    <Animated.View style={[styles.button, rButtonStyle]}>
      <Animated.View style={rPlusMinusIconStyle}>
        <Text style={styles.icon}>−</Text>
      </Animated.View>
      <Animated.View style={rPlusMinusIconStyle}>
        <Text style={styles.icon}>＋</Text>
      </Animated.View>
      <View style={styles.swipeArea}>
        <PanGestureHandler
          enabled={!isDisabled}
          onGestureEvent={onPanGestureEvent}>
          <Animated.View style={[styles.circle, rStyle]}>
            <Text style={styles.currentCount}>
              {currentCount}/<Text style={styles.destinationCount}>{destinationCount}</Text>
            </Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default SlidingCounter;
