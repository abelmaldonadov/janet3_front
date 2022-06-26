import { Session } from "./Session"
import { User } from "./User"

export interface App {
  username: string
  setUsername: (username: string) => void
  password: string
  setPassword: (password: string) => void
  user: User
  setUser: (user: User) => void
  session: Session
  setSession: (session: Session) => void
  headers: any
  setHeaders: any
  signIn: () => void
  signOut: () => void
}
