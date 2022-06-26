import css from "./TableRow.module.css"
import { TableCell } from "../../models/TableCell"
import { BiEdit, BiTrash } from "react-icons/bi"

interface Props {
  isSelected?: boolean
  selectRow?: () => void
  deleteRow?: () => void
  children: TableCell[]
}

export const TableRow = ({ isSelected, selectRow, deleteRow, children }: Props): JSX.Element => {
  return (
    <tr className={`${css.row} ${isSelected && css.selected}`}>
      {children.map((item, index) => (
        <td key={index} className={css.col}>
          {item.style === "" && <NormalCell>{item.value}</NormalCell>}
          {item.style === "string" && <NormalCell>{item.value}</NormalCell>}
          {item.style === "icon" && <IconCell>{item.value}</IconCell>}
          {item.style === "number" && <NumberCell>{item.value}</NumberCell>}
          {item.style === "money" && <MoneyCell>{item.value}</MoneyCell>}
          {item.style === "date" && <DateCell>{item.value}</DateCell>}
          {/*Fk*/}
          {item.style === "role" && <RoleCell fk={item.fkId}>{item.value}</RoleCell>}
          {item.style === "level" && <LevelCell fk={item.fkId}>{item.value}</LevelCell>}
          {item.style === "transaction" && <TransactionCell fk={item.fkId}>{item.value}</TransactionCell>}
          {item.style === "tracking" && <TrackingCell fk={item.fkId}>{item.value}</TrackingCell>}
          {item.style === "state" && <StateCell fk={item.fkId}>{item.value}</StateCell>}
        </td>
      ))}
      <td className={css.col}>
        <IconCell>
          <BiEdit size="1.1rem" onClick={selectRow} />
          <BiTrash size="1.1rem" onClick={deleteRow} />
        </IconCell>
      </td>
    </tr>
  )
}

const NormalCell = ({ children }: any) => <div className={css.normal}>{children}</div>
const IconCell = ({ children }: any) => <div className={css.icon}>{children}</div>
const NumberCell = ({ children }: any) => <div className={css.number}>{children}</div>
const MoneyCell = ({ children }: any) => <div className={css.money}>{children}</div>
const DateCell = ({ children }: any) => <div className={css.date}>{children}</div>
// Fk
const RoleCell = ({ fk, children }: any) => {
  return <div className={`${css.role} ${css["role_" + fk]}`}>{children}</div>
}
const LevelCell = ({ fk, children }: any) => {
  return <div className={`${css.level} ${css["level_" + fk]}`}>{children}</div>
}
const TransactionCell = ({ fk, children }: any) => {
  return <div className={`${css.transaction} ${css["transaction_" + fk]}`}>{children}</div>
}
const TrackingCell = ({ fk, children }: any) => {
  return <div className={`${css.tracking} ${css["tracking_" + fk]}`}>{children}</div>
}
const StateCell = ({ fk, children }: any) => {
  return <div className={`${css.state} ${css["state_" + fk]}`}>{children}</div>
}
