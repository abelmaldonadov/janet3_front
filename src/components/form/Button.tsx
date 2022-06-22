import css from "./Button.module.css"

interface Props {
  text?: string
  isDisabled?: boolean
  isBlock?: boolean
  onClick?: any
}

export const Button = ({ text, isDisabled, isBlock, onClick }: Props) => {
  return (
    <button disabled={isDisabled} onClick={onClick} className={`${css.button} ${isBlock && css.block}`}>
      {text}
    </button>
  )
}
