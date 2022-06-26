import { createContext, useState } from "react"
import axios from "axios"
import { Session, SESSION_MODEL } from "../models/Session"
import { clone } from "../utils/clone"
import { App } from "../models/App"
import { User, USER_MODEL } from "../models/User"
const { REACT_APP_API_ROUTE: API_ROUTE } = process.env

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const HEADERS_MODEL = { token: "", user: 0 }

export const AppContext = createContext<App>({} as App)

export const AppContextComponent = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [user, setUser] = useState<User>({} as User)
  const [session, setSession] = useState<Session>({} as Session)
  const [headers, setHeaders] = useState<any>(clone(HEADERS_MODEL))

  const signIn = async () => {
    try {
      const sessions = await axios.post(`${API_ROUTE}/api/signin`, { username, password })
      const userId = sessions.data.data[0].user
      const token = sessions.data.data[0].token
      const user = sessions.data.meta.users.find((item: User) => item.id === userId)
      setSession(sessions.data.data[0])
      setUser(user)
      setHeaders({ ...HEADERS_MODEL, token, user: userId })
      localStorage.setItem("janet3Session", JSON.stringify(sessions.data.data[0]))
      localStorage.setItem("janet3User", JSON.stringify(user))
    } catch (error) {
      alert(error)
    }
  }
  const signOut = async () => {
    setUsername("")
    setPassword("")
    setUser(clone(USER_MODEL))
    setSession(clone(SESSION_MODEL))
    setHeaders(clone(HEADERS_MODEL))
  }

  const app: App = {
    username: username,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    user: user,
    setUser: setUser,
    session: session,
    setSession: setSession,
    headers: headers,
    setHeaders: setHeaders,
    signIn: signIn,
    signOut: signOut,
  }

  return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}
