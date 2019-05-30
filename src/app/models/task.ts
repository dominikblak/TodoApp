export interface Task {
  key?: string;
  userId: string;
  name: string;
  created: string;
  end?: string;
  isDone: boolean;
}
