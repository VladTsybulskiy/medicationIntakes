import { Intake, Note } from './types';

export const InitialIntakeData: Intake = {
  id: '',
  name: '',
  description: '',
  currentCount: 0,
  lastUpdated: new Date(),
  destinationCount: 1,
  notes: [],
};

export const isAdding = 'isAdding';

export const AddNote: Note = {
  id: isAdding,
  text: '',
};
