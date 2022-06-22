import css from "./NavOption.module.css"
import { Link } from "react-router-dom"

interface Props {
  name: string
  icon: JSX.Element
  route: string
  isSelected: boolean
}

export const NavOption = ({ name, icon, route, isSelected }: Props) => {
  return (
    <Link to={route} className={`${css.option} ${isSelected && css.isSelected}`}>
      {icon}
      <span className={css.link}>{name}</span>
    </Link>
  )
}
