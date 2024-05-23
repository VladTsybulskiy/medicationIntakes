import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { Intake } from 'src/utils/types';
import { v4 as uuid } from 'uuid';

export class IntakesStore {
  intakesList: Intake[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true, deep: true });
    makePersistable(this, {
      name: IntakesStore.name.toString(),
      properties: ['intakesList'],
      storage: AsyncStorage,
    });
  }

  get isListEmpty(): boolean {
    return !this.intakesList.length;
  }

  get currentIntakes(): Intake[] {
    return this.intakesList
      .filter(intake => intake.destinationCount > intake.currentCount)
      .sort(
        (intake1, intake2) =>
          new Date(intake2.lastUpdated).getTime() - new Date(intake1.lastUpdated).getTime(),
      );
  }

  get finishedIntakes(): Intake[] {
    return this.intakesList.filter(intake => intake.destinationCount === intake.currentCount);
  }

  addNewIntake(data: Intake) {
    this.intakesList.push(data);
  }

  updateIntake(data: Intake) {
    this.intakesList = this.intakesList.map(intake => {
      if (intake.id !== data.id) {
        return intake;
      }
      return { ...data, lastUpdated: new Date() };
    });
  }

  removeIntake(intakeId: string) {
    this.intakesList.filter(intake => intake.id !== intakeId);
  }

  incrementIntakeCount(intakeId: string) {
    this.intakesList = this.intakesList.map(intake => {
      if (intake.id !== intakeId) {
        return intake;
      }
      const newCount = intake.currentCount + 1;

      return { ...intake, currentCount: newCount, lastUpdated: new Date() };
    });
  }

  decrementIntakeCount(intakeId: string) {
    this.intakesList = this.intakesList.map(intake => {
      if (intake.id !== intakeId) {
        return intake;
      }
      const newCount = intake.currentCount - 1;

      if (newCount >= 0) {
        return { ...intake, currentCount: newCount, lastUpdated: new Date() };
      }
      return intake;
    });
  }

  addNote(intakeId: string, note: string) {
    const intake = this.intakesList.find(currentIntake => currentIntake.id === intakeId);
    if (intake) {
      intake.notes.push({ id: uuid(), text: note });
    }
  }

  deleteIntake(id: string) {
    this.intakesList = this.intakesList.filter(intake => intake.id !== id);
  }

  deleteAll() {
    this.intakesList = [];
  }
}
