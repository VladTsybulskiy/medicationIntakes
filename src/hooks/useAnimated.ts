import { View } from 'react-native';
import {
  PanGestureHandlerGestureEvent,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  measure,
  withTiming,
  AnimatedRef,
} from 'react-native-reanimated';

import { COLORS } from 'src/styles/constants';

const BUTTON_WIDTH = 140;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;
const TRIGGER_OFFSET = MAX_SLIDE_OFFSET - 12;

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

type Props = {
  increment: () => void;
  decrement: () => void;
};

export const useAnimatedCounter = ({ increment, decrement }: Props) => {
  const translateX = useSharedValue(0);

  const onPanGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = clamp(event.translationX, -MAX_SLIDE_OFFSET, MAX_SLIDE_OFFSET);
    },
    onEnd: () => {
      if (translateX.value >= TRIGGER_OFFSET) {
        runOnJS(increment)();
      } else if (translateX.value <= -TRIGGER_OFFSET) {
        runOnJS(decrement)();
      }
      translateX.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4],
    );

    return {
      opacity: opacityX,
    };
  }, []);

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1,
        },
      ],
    };
  }, []);

  return {
    onPanGestureEvent,
    rStyle,
    rPlusMinusIconStyle,
    rButtonStyle,
  };
};

export const useAnimatedTouch = ({
  aRef,
  openDetails,
}: {
  aRef: AnimatedRef<View>;
  openDetails: () => void;
}) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: tapEvent => {
      if (aRef && aRef?.current) {
        const layout = measure(aRef);
        width.value = layout?.width ?? 150;
        height.value = layout?.height ?? 50;

        centerX.value = tapEvent.x;
        centerY.value = tapEvent.y;

        rippleOpacity.value = 1;
        scale.value = 0;
        scale.value = withTiming(1, { duration: 500 });
      }
    },
    onActive: () => {
      runOnJS(openDetails)();
    },
    onFinish: () => {
      rippleOpacity.value = withTiming(0);
    },
  });

  const style = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value * 5 + height.value * 5);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      position: 'absolute',
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: COLORS.black_0_2,
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return {
    tapGestureEvent,
    style,
  };
};
