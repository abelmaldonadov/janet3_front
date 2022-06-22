import css from "./HeaderSearch.module.css"
import { BiSearchAlt } from "react-icons/bi"

export const HeaderSearch = () => {
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <BiSearchAlt size="1.4rem" color="rgba(0,0,0,0.5)" />
      </div>
      <input className={css.input} type="text" placeholder="Search Anything ..." maxLength={50} />
    </div>
  )
}
