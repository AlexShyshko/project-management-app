export interface Task {
  id?: string,
  title: string,
  done: boolean,
  order: number,
  description: string,
  userId: string,
  boardId?: string,
  columnId?: string,
  files?: CFile[],
}

interface CFile {
  filename: string,
  fileSize: number,
}
