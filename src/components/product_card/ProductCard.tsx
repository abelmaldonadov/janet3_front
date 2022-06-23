import { Product } from "../../models/Product"
import css from "./ProductCard.module.css"
import { BiPackage } from "react-icons/bi"
import { Coin } from "../../models/Meta"

interface Props {
  product: Product
  meta: any
  onClick?: any
}

export const ProductCard = ({ product, meta, onClick }: Props) => {
  return (
    <div className={css.wrap}>
      <div className={css.container} onClick={onClick}>
        <div className={css.header}>
          <BiPackage size={100} color="rgba(0,0,0,0.1)" />
        </div>
        <div className={css.body}>{product.name}</div>
        <div className={css.footer}>
          {meta.coins.find((item: Coin) => item.id === product.coin).symbol} {product.price}
        </div>
      </div>
    </div>
  )
}
