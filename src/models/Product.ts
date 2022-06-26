export interface Product {
  id?: number
  name: string
  serial: string
  brand: string
  description: string
  price: number

  coin: number
  state: number
}

export const PRODUCT_MODEL: Product = {
  name: "",
  serial: "",
  brand: "",
  description: "",
  price: 0,
  coin: 1,
  state: 1,
}
