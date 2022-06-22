import css from "./Grid.module.css"

interface Props {
  children: JSX.Element[]
}

export const Grid = ({ children }: Props) => {
  return <div className={css.grid}>{children}</div>
}
