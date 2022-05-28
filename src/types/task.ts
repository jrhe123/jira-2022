export interface Task {
  id: number;
  name: string;
  // person
  processorId: number;
  projectId: number;
  // group
  epicId: number;
  kanbanId: number;
  // bug / task
  typeId: number;
  note: string;
}
