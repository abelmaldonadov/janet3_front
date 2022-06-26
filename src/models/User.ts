export interface User {
  id?: number
  username: string
  password?: string
  entity: number
  level: number
  state: number
}
export const USER_MODEL: User = {
  username: "",
  password: "",
  entity: 3,
  level: 1,
  state: 1,
}
