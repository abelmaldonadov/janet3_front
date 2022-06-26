import css from "./Input.module.css"
import { BiImageAdd } from "react-icons/bi"
import axios from "axios"
import { useContext, useState } from "react"
import { AppContext } from "../../contexts/AppContext"

interface Props {
  type?: string
  label?: string
  value?: any | any[]
  rows?: number
  maxLength?: number
  min?: number
  max?: number
  options?: any[]
  multiple?: boolean
  accept?: string
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
  multiple,
  accept,
  readonly,
  onChange,
}: Props) => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers } = useContext(AppContext)
  const [previews, setPreviews] = useState<File[]>([])
  const [isShowMedia, setShowMedia] = useState<boolean>(false)

  const getPreview = async () => {
    try {
      const { data } = await axios.get(`${API_ROUTE}/uploads/${value}`, {
        headers,
        responseType: "blob",
      })
      setPreviews([data])
    } catch (error) {
      // Nothing
    }
  }

  const uploadImages = async () => {
    try {
      const form = new FormData()
      form.append("file", previews[0])
      await axios.post(`${API_ROUTE}/api/media/products`, form, { headers })
    } catch (error) {
      // Nothing
    }
  }

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
  } else if (type === "file") {
    return (
      <div>
        <label className={css.container} onClick={() => setShowMedia(true)}>
          <span className={css.label}>{label}</span>
          <div className={css.fileInput}>
            <div className={css.fileInputDotted}>
              {value.length === 0 ? (
                <BiImageAdd size={50} color="#ffeec7" />
              ) : (
                value.map((item: any) => (
                  <img src={URL.createObjectURL(item)} alt="..." className={css.fileInputPreview} />
                ))
              )}
            </div>
            <input
              className={css.input}
              hidden
              type={type}
              multiple={multiple}
              accept={accept}
              readOnly={readonly}
              onChange={onChange ? (e) => onChange(e.target.files) : undefined}
            />
          </div>
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
