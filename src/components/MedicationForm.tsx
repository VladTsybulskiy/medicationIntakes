import { useEffect, useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Formik, FormikProps } from 'formik';

import { InitialIntakeData } from 'src/utils/constants';
import Input from 'src/components/common/Input';
import { useStores } from 'src/store/hooks';
import { IntakeSchema } from 'src/utils/validations';
import { strings } from 'src/utils/strings';
import { styles } from 'src/styles/components/MedicationForm';
import { Intake } from 'src/utils/types';
import Notes from './notes';

const MedicationForm = ({
  id,
  submitForm,
  deleteHandler,
}: {
  id?: string;
  submitForm: (values: Intake) => void;
  deleteHandler?: (id: string) => void;
}) => {
  const formRef = useRef<FormikProps<Intake>>();

  const { medicationIntakesStore } = useStores();

  useEffect(() => {
    if (!id) {
      return;
    }

    const currentIntake = medicationIntakesStore.intakesList.find(intake => intake.id === id);

    if (!currentIntake) {
      return;
    }
    formRef?.current?.setValues(currentIntake);
  }, [id]);

  const deleteIntake = () => {
    deleteHandler && deleteHandler(id!);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Formik
              initialValues={{ ...InitialIntakeData }}
              validationSchema={IntakeSchema}
              innerRef={formRef}
              onSubmit={submitForm}>
              {({ values, handleChange, handleSubmit, errors }) => (
                <View style={styles.form}>
                  <View style={styles.inputsContainer}>
                    <Input
                      label={strings.name}
                      value={values.name}
                      setValue={handleChange('name')}
                      error={errors.name}
                    />
                    <Input
                      label={strings.initialCount}
                      keyboardType="number-pad"
                      value={Number(values.currentCount).toString()}
                      setValue={handleChange('currentCount')}
                      error={errors.currentCount}
                    />
                    <Input
                      label={strings.destinationCount}
                      keyboardType="number-pad"
                      value={Number(values.destinationCount).toString()}
                      setValue={handleChange('destinationCount')}
                      error={errors.destinationCount}
                    />
                    <Input
                      label={strings.description}
                      value={values.description}
                      setValue={handleChange('description')}
                      error={errors.description}
                      multiline={true}
                      style={styles.descriptionInput}
                    />
                  </View>
                  {id ? <Notes id={id} /> : null}
                  <View style={styles.buttons}>
                    <Pressable
                      onPress={handleSubmit as any} // formik typescript issue https://github.com/jaredpalmer/formik/issues/376
                      disabled={!!Object.keys(errors).length}
                      style={[styles.button, { opacity: !!Object.keys(errors).length ? 0.5 : 1 }]}>
                      <Text style={styles.buttonLabel}>{id ? strings.update : strings.add}</Text>
                    </Pressable>
                    {id ? (
                      <Pressable
                        onPress={deleteIntake}
                        disabled={!!Object.keys(errors).length}
                        style={[styles.button, styles.deleteButton]}>
                        <Text style={styles.deleteLabel}>{strings.delete}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default observer(MedicationForm);
