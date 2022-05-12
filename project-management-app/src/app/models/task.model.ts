export interface Task {
  id?: string,
  title: string,
  done: boolean,
  order: number,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string,
}
