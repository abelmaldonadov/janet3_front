import { createContext, useState } from "react"

const AppContext = createContext({})

interface Props {
  children: JSX.Element
}

export const AppContextComponent = ({ children }: Props) => {
  const [app, setApp] = useState()
  return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>
}
