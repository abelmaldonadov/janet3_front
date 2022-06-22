import css from "./HeaderCircle.module.css"

interface Props {
  children: JSX.Element
}

export const HeaderCircle = ({ children }: Props) => {
  return (
    <div className={css.circle}>
      <div className={css.avatar}>{children}</div>
    </div>
  )
}
