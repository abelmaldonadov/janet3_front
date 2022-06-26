export interface Entity {
  id?: number
  name: string
  ruc: string
  email: string
  phone: string
  address: string

  role: number
  state: number
}

export const ENTITY_MODEL: Entity = {
  name: "",
  ruc: "",
  email: "",
  phone: "",
  address: "",
  role: 1,
  state: 1,
}
