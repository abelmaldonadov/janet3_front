import css from "./Row.module.css"

interface Props {
  template: number[]
  children: JSX.Element[]
}

export const Row = ({ template, children }: Props) => {
  const numCols = template.reduce((acc, cur) => acc + cur, 0)
  return (
    <div className={css.row}>
      {children.map((item, index) => (
        <div key={index} style={{ width: `${(99 / numCols) * template[index]}%` }}>
          {item}
        </div>
      ))}
    </div>
  )
}
