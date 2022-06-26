export interface Session {
  id?: number
  date: string
  host: string
  token: string
  user: number
}
export const SESSION_MODEL: Session = {
  id: 0,
  token: "",
  date: "",
  host: "",
  user: 0,
}
