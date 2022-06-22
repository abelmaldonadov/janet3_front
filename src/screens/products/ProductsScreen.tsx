import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../../models/Product"
import { Coin, State } from "../../models/Meta"
import { Loader } from "../../components/loader/Loader"
import { Entity } from "../../models/Entity"
import { Screen } from "../../components/screen/Screen"
import css from "./ProductsScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { Table } from "../../components/table/Table"
import { TableRow } from "../../components/table/TableRow"
import { Form } from "../../components/form/Form"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { BiEdit, BiTrash } from "react-icons/bi"
import { Row } from "../../components/grid/Row"

export const ProductsScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const [isLoading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [entities, setEntities] = useState<any[]>([])
  const [meta, setMeta] = useState<any>()
  const [productSel, setProductSel] = useState<any>()
  const [productId, setProductId] = useState<number>()
  const productModel = {
    name: "",
    serial: "",
    brand: "",
    description: "",
    price: 0,
    stock: 0,
    coin: 1,
    vendor: 1,
    state: 1,
  }

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setProductSel(JSON.parse(JSON.stringify(productModel)))
    if (productId) {
      getData()
    }
  }, [productId])

  const getAllData = async () => {
    try {
      const products = await axios.get(`${API_ROUTE}/api/products`)
      const entities = await axios.get(`${API_ROUTE}/api/entities`)
      setProducts(products.data.data)
      setEntities(entities.data.data)
      setMeta(products.data.meta)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const products = await axios.get(`${API_ROUTE}/api/products/${productId}`)
      setProductSel(products.data.data[0])
    } catch (error) {
      alert(error)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/products/${productId}`, productSel)
      await getAllData()
      setProductId(undefined)
    } catch (error) {
      alert(error)
    }
  }

  const createData = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/products`, productSel)
      await getAllData()
      setProductSel(JSON.parse(JSON.stringify(productModel)))
    } catch (error) {
      alert(error)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/products/${id}`)
      await getAllData()
    } catch (error) {
      alert(error)
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen title="Productos">
      <Grid>
        <Block isFixed title="Vista de Producto" className={css.one}>
          <Form>
            <Input
              label="Nombre"
              value={productSel?.name}
              onChange={(val: string) => setProductSel({ ...productSel, name: val })}
            />
            <Input
              label="Descripción"
              type="textarea"
              rows={5}
              value={productSel?.description}
              onChange={(val: string) => setProductSel({ ...productSel, description: val })}
            />
            <Row template={[1, 1]}>
              <Input
                label="Serial"
                value={productSel?.serial}
                onChange={(val: string) => setProductSel({ ...productSel, serial: val })}
              />
              <Input
                label="Marca"
                value={productSel?.brand}
                onChange={(val: string) => setProductSel({ ...productSel, brand: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Input
                label="Moneda"
                type="select"
                value={productSel?.coin}
                options={meta.coins}
                onChange={(val: number) => setProductSel({ ...productSel, coin: val })}
              />
              <Input
                label="Precio"
                type="number"
                min={0}
                value={productSel?.price}
                onChange={(val: number) => setProductSel({ ...productSel, price: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Input
                label="Stock"
                type="number"
                min={0}
                value={productSel?.stock}
                onChange={(val: number) => setProductSel({ ...productSel, stock: val })}
              />
              <Input
                label="Estado"
                type="select"
                value={productSel?.state}
                options={meta.states}
                onChange={(val: number) => setProductSel({ ...productSel, state: val })}
              />
            </Row>
            <Input
              label="Proveedor"
              type="select"
              value={productSel?.vendor}
              options={entities.filter((item) => item.role === 2)}
              onChange={(val: number) => setProductSel({ ...productSel, vendor: val })}
            />
            <Row template={[1, 1]}>
              <Button text="Salvar" isBlock onClick={productId ? () => updateData() : () => createData()} />
              <Button text="Cancelar" isBlock onClick={() => setProductId(undefined)} />
            </Row>
          </Form>
        </Block>
        <Block title="Productos Disponibles" className={css.two}>
          <Table headers={["Nombre", "Serial", "Marca", "Precio", "Stock", "Proveedor", "Estado", ""]}>
            {products
              .filter((item) => item.stock > 0)
              .map((item: Product) => (
                <TableRow key={item.id} isSelected={productId === item.id}>
                  {[
                    { style: "", value: item.name },
                    { style: "number", value: item.serial },
                    { style: "", value: item.brand },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.price.toFixed(2)}`,
                    },
                    { style: "number", value: item.stock },
                    { style: "", value: entities.find((en: Entity) => en.id === item.vendor).name },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setProductId(item.id)} />
                          <BiTrash size="1.1rem" onClick={() => deleteData(item.id)} />
                        </>
                      ),
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
        <Block title="Productos Agotados" className={css.three}>
          <Table headers={["Nombre", "Serial", "Marca", "Precio", "Stock", "Proveedor", "Estado", ""]}>
            {products
              .filter((item) => item.stock === 0)
              .map((item: Product) => (
                <TableRow key={item.id} isSelected={productId === item.id}>
                  {[
                    { style: "", value: item.name },
                    { style: "number", value: item.serial },
                    { style: "", value: item.brand },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.price.toFixed(2)}`,
                    },
                    { style: "number", value: item.stock },
                    { style: "", value: entities.find((en: Entity) => en.id === item.vendor).name },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setProductId(item.id)} />
                          <BiTrash size="1.1rem" onClick={() => deleteData(item.id)} />
                        </>
                      ),
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
      </Grid>
    </Screen>
  )
}
