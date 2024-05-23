import { Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { strings } from 'src/utils/strings';
import { useStores } from 'src/store/hooks';
import { MainScreens, RootNavigationProp, RootStackScreens } from 'src/screens/types';
import { styles } from 'src/styles/components/MedicationCard';
import { Intake } from 'src/utils/types';
import SlidingCounter from './Counter';
import { useAnimatedTouch as useAnimated } from 'src/hooks/useAnimated';

type Props = {
  intake: Intake;
};

const MedicationCard = ({ intake }: Props) => {
  const navigation = useNavigation<RootNavigationProp>();
  const aRef = useAnimatedRef<View>();

  const { medicationIntakesStore } = useStores();
  const isFinished = intake.currentCount === intake.destinationCount;

  const decrement = () => {
    medicationIntakesStore.decrementIntakeCount(intake.id);
  };

  const increment = () => {
    medicationIntakesStore.incrementIntakeCount(intake.id);
  };

  const openDetails = () => {
    navigation.navigate(RootStackScreens.Main, {
      screen: MainScreens.MedicationDetails,
      params: {
        id: intake.id,
      },
    });
  };

  const { tapGestureEvent, style } = useAnimated({ aRef, openDetails });

  return (
    <View
      ref={aRef}
      key={intake.id}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[styles.container, { opacity: isFinished ? 0.5 : 1 }]}>
          <Animated.View style={style} />
          <Animated.View style={[styles.detailsContainer]}>
            <Text style={styles.label}>
              {isFinished ? <Text style={styles.finishedLabel}>({strings.finished}) </Text> : null}
              {intake.name}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.description}>
              {intake.description}
            </Text>
          </Animated.View>
          <View style={{ alignItems: 'center' }}>
            <SlidingCounter
              currentCount={intake.currentCount}
              destinationCount={intake.destinationCount}
              isDisabled={isFinished}
              decrement={decrement}
              increment={increment}
            />
            <Text style={{ fontSize: 10 }}>({strings.swipeToChange})</Text>
          </View>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default observer(MedicationCard);
