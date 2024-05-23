import * as Yup from 'yup';

export const IntakeSchema = Yup.object().shape({
  name: Yup.string().min(1, 'Too Short! (minimum 1)').required('Required'),
  destinationCount: Yup.number()
    .min(1, 'Too Short! (minimum 1)')
    .moreThan(Yup.ref('currentCount'), "Can't be less or equal than initial"),
});
