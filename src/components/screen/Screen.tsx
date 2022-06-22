import css from "./Screen.module.css"

interface Props {
  title: string
  children?: JSX.Element
}

export const Screen = ({ title, children }: Props) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>{title}</h1>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
