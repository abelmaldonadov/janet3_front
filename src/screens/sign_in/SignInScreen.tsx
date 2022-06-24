import css from "./SignInScreen.module.css"
import { BiDollarCircle } from "react-icons/bi"
import { Button } from "../../components/form/Button"
import { Input } from "../../components/form/Input"
import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

export const SignInScreen = () => {
  const { signIn, username, setUsername, password, setPassword } = useContext(AppContext)

  return (
    <div className={css.container}>
      <div className={css.form}>
        <div className={css.header}>
          <BiDollarCircle size="2rem" color="rgba(0, 0, 0, 0.25)" />
          <h1 className={css.title}>Janet 3</h1>
        </div>
        <div className={css.body}>
          <Input label="Username" type="text" value={username} onChange={(val: string) => setUsername(val)} />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(val: string) => setPassword(val)}
          />
        </div>
        <div className={css.footer}>
          <Button text="Ingresar" onClick={() => signIn()} isBlock />
        </div>
      </div>
    </div>
  )
}
