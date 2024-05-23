export type Note = {
  id: string;
  text: string;
}

export type Intake = {
  id: string;
  name: string;
  description: string;
  currentCount: number;
  lastUpdated: Date;
  destinationCount: number;
  notes: Note[];
};

