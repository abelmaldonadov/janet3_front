import css from "./Input.module.css"

interface Option {
  id: number
  name: string
}

interface Props {
  type?: string
  label?: string
  value?: string | number
  rows?: number
  maxLength?: number
  min?: number
  max?: number
  options?: Option[]
  readonly?: boolean
  onChange?: any
}

export const Input = ({
  type,
  label,
  value,
  rows,
  maxLength,
  min,
  max,
  options,
  readonly,
  onChange,
}: Props) => {
  if (type === "select") {
    return (
      <div>
        <label className={css.container}>
          <span className={css.label}>{label}</span>
          <select
            value={value}
            disabled={readonly}
            className={css.input}
            onChange={(e) => onChange(Number(e.target.value))}
          >
            {options &&
              options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
      </div>
    )
  } else if (type === "textarea") {
    return (
      <div>
        <label className={css.container}>
          <span className={css.label}>{label}</span>
          <textarea
            className={css.input}
            value={value}
            rows={rows}
            maxLength={maxLength}
            readOnly={readonly}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          />
        </label>
      </div>
    )
  } else {
    return (
      <div>
        <label className={css.container}>
          <span className={css.label}>{label}</span>
          <input
            className={css.input}
            type={type}
            value={value}
            maxLength={maxLength}
            min={min}
            max={max}
            readOnly={readonly}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          />
        </label>
      </div>
    )
  }
}
