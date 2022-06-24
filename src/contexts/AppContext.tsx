import { createContext, useState } from "react"
import axios from "axios"
import { Session } from "../models/Session"
const { REACT_APP_API_ROUTE: API_ROUTE } = process.env

interface Props {
  children: JSX.Element
}

interface App {
  username: string
  setUsername?: any
  password: string
  setPassword?: any
  level: number
  setLevel?: any
  session: Session
  setSession?: any
  headers: any
  setHeaders?: any
  signIn?: any
  signOut?: any
}

const sessionModel: Session = {
  id: 0,
  token: "",
  date: "",
  host: "",
  user: 0,
}

const appModel: App = {
  username: "",
  password: "",
  level: 0,
  session: sessionModel,
  headers: { headers: { token: "", user: 0 } },
}

export const AppContext = createContext<App>(JSON.parse(JSON.stringify(appModel)))

export const AppContextComponent = ({ children }: Props) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [level, setLevel] = useState<number>(0)
  const [session, setSession] = useState<Session>(JSON.parse(JSON.stringify(sessionModel)))
  const [headers, setHeaders] = useState<any>({ headers: {} })
  const signIn = async () => {
    try {
      const sessions = await axios.post(`${API_ROUTE}/api/signin`, { username, password })
      setSession(sessions.data.data[0])
      const token = sessions.data.data[0].token
      const userId = sessions.data.data[0].user
      setHeaders({ headers: { token, user: userId } })
      const users = await axios.get(`${API_ROUTE}/api/users/${userId}`, { headers: { token, user: userId } })
      const level = users.data.data[0].level
      setLevel(level)
    } catch (error) {
      alert(error)
    }
  }
  const signOut = async () => {
    setUsername("")
    setPassword("")
    setSession(JSON.parse(JSON.stringify(sessionModel)))
    setHeaders({ headers: { token: "", user: 0 } })
  }

  const app: App = {
    username: username,
    setUsername: setUsername,
    password: password,
    setPassword: setPassword,
    level: level,
    setLevel: setLevel,
    session: session,
    setSession: setSession,
    headers: headers,
    setHeaders: setHeaders,
    signIn: signIn,
    signOut: signOut,
  }

  return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}
