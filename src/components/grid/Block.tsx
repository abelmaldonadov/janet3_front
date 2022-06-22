import css from "./Block.module.css"

interface Props {
  className?: string
  title?: string
  isFixed?: boolean
  children?: JSX.Element | JSX.Element[]
}

export const Block = ({ className, title, isFixed, children }: Props) => {
  return (
    <div className={`${className} ${css.block} ${isFixed && css.fixed}`}>
      {title && (
        <div className={css.header}>
          <div className={css.left}>
            <h2 className={css.title}>{title}</h2>
          </div>
          <div className={css.right}></div>
        </div>
      )}
      <div className={css.body}>{children}</div>
    </div>
  )
}
