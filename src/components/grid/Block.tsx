import css from "./Block.module.css"

interface Props {
  className?: string
  title?: string
  buttons?: JSX.Element[]
  isFixed?: boolean
  children?: JSX.Element | JSX.Element[]
}

export const Block = ({ className, title, buttons, isFixed, children }: Props) => {
  return (
    <div className={`${className} ${css.block} ${isFixed && css.fixed}`}>
      {title && (
        <div className={css.header}>
          <div className={css.left}>
            <span className={css.title}>{title}</span>
          </div>
          <div className={css.right}>
            {buttons?.map((item) => (
              <div className={css.button}>{item}</div>
            ))}
          </div>
        </div>
      )}
      <div className={css.body}>{children}</div>
    </div>
  )
}
