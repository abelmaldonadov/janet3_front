import css from "./Header.module.css"
import { HeaderCircle } from "./HeaderCircle"
import { BiBell } from "react-icons/bi"
import { HeaderSearch } from "./HeaderSearch"

export const Header = () => {
  return (
    <div className={css.container}>
      <div className={css.left}>
        <HeaderSearch />
      </div>
      <div className={css.right}>
        <HeaderCircle>
          <BiBell size="1.5rem" color="rgba(0,0,0,0.3)" />
        </HeaderCircle>
        <HeaderCircle>
          <img className={css.image} src="america_chavez.jpeg" alt="..." />
        </HeaderCircle>
      </div>
    </div>
  )
}
