import { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { Navigate } from "react-router-dom"

export const ExitScreen = () => {
  const { signOut } = useContext(AppContext)

  useEffect(() => {
    localStorage.removeItem("janet3Session")
    localStorage.removeItem("janet3User")
    signOut()
  }, [])

  return <Navigate to="/" replace={true} />
}
