import { Product } from "../../models/Product"
import css from "./ProductCard.module.css"
import { BiPackage } from "react-icons/bi"
import { Coin } from "../../models/Meta"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AppContext } from "../../contexts/AppContext"

interface Props {
  product: Product
  meta: any
  onClick?: any
}

export const ProductCard = ({ product, meta, onClick }: Props) => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers } = useContext(AppContext)
  const [image, setImage] = useState<string>()

  useEffect(() => {
    return () => {
      getImage()
    }
  }, [])

  const getImage = async () => {
    try {
      const { data } = await axios.get(`${API_ROUTE}/products/${product.id}.jpg`, {
        headers,
        responseType: "blob",
      })
      const image = URL.createObjectURL(data)
      setImage(image)
    } catch (error) {
      // Nothing
    }
  }

  return (
    <div className={css.wrap}>
      <div className={css.container} onClick={onClick}>
        <div className={css.header}>
          {image ? (
            <img src={image} alt="..." className={css.productPreview} />
          ) : (
            <BiPackage size={100} color="rgba(0,0,0,0.1)" />
          )}
        </div>
        <div className={css.body}>
          <div className={css.name}>{product.name}</div>
          <div className={css.brand}>{product.brand}</div>
          <div className={css.serial}>Serie: {product.serial}</div>
          <div className={css.price}>
            {meta.coins.find((item: Coin) => item.id === product.coin).symbol} {product.price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
