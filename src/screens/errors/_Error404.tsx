import css from "./_Error404.module.css"
import { BiError } from "react-icons/bi"

export const _Error404 = () => {
  return (
    <div className={css.container}>
      <div>
        <BiError size={450} color="rgba(0,0,0,0.15)" className={css.icon} />
        <h1 className={css.text}>404 - Not Found</h1>
      </div>
    </div>
  )
}
