import { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"

export const ExitScreen = () => {
  const { signOut } = useContext(AppContext)

  useEffect(() => {
    signOut()
  }, [])

  return <></>
}
