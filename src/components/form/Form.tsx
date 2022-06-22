import css from "./Form.module.css"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const Form = ({ children }: Props) => {
  return <div className={css.container}>{children}</div>
}
