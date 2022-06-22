import css from "./Table.module.css"

interface Props {
  headers: string[]
  children?: JSX.Element | JSX.Element[]
}

export const Table = ({ headers, children }: Props): JSX.Element => {
  return (
    <table className={css.table}>
      <thead className={css.header}>
        <tr>
          {headers.map((item, index) => (
            <td key={index} className={css.field}>
              {item}
            </td>
          ))}
        </tr>
      </thead>
      <tbody className={css.body}>{children}</tbody>
    </table>
  )
}
