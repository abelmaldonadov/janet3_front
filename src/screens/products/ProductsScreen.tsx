import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Product, PRODUCT_MODEL } from "../../models/Product"
import { Coin, State } from "../../models/Meta"
import { Loader } from "../../components/loader/Loader"
import { Screen } from "../../components/screen/Screen"
import css from "./ProductsScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { Table } from "../../components/table/Table"
import { TableRow } from "../../components/table/TableRow"
import { Form } from "../../components/form/Form"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { Row } from "../../components/grid/Row"
import { AppContext } from "../../contexts/AppContext"
import { clone } from "../../utils/clone"
import { handleErrors } from "../../utils/handleErrors"

export const ProductsScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers, signOut } = useContext(AppContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<Product[]>([])
  const [meta, setMeta] = useState<any>()
  const [productSel, setProductSel] = useState<Product>({} as Product)
  const [productId, setProductId] = useState<number>()

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setProductSel(clone(PRODUCT_MODEL))
    if (productId) {
      getData()
    }
  }, [productId])

  const getAllData = async () => {
    try {
      const products = await axios.get(`${API_ROUTE}/api/products`, { headers })
      setProducts(products.data.data.reverse())
      setMeta(products.data.meta)
    } catch (error) {
      handleErrors(error, signOut)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const products = await axios.get(`${API_ROUTE}/api/products/${productId}`, { headers })
      setProductSel(products.data.data[0])
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/products/${productId}`, productSel, { headers })
      await getAllData()
      setProductId(undefined)
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const createData = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/products`, productSel, { headers })
      await getAllData()
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/products/${id}`, { headers })
      await getAllData()
    } catch (error) {
      handleErrors(error, signOut)
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
              <></>
              <Input
                label="Estado"
                type="select"
                value={productSel?.state}
                options={meta.states}
                onChange={(val: number) => setProductSel({ ...productSel, state: val })}
              />
            </Row>
            {/*<Input*/}
            {/*  label="Imagen"*/}
            {/*  type="file"*/}
            {/*  value={[]}*/}
            {/*  accept="image/*"*/}
            {/*  onChange={(val: number) => console.log(val)}*/}
            {/*/>*/}
            <Row template={[1, 1]}>
              <Button text="Cancelar" isBlock onClick={() => setProductId(undefined)} />
              <Button text="Salvar" isBlock onClick={productId ? () => updateData() : () => createData()} />
            </Row>
          </Form>
        </Block>
        <Block title="Productos Disponibles" className={css.two}>
          <Table headers={["Serial", "Nombre", "Marca", "Precio", "Estado", ""]}>
            {products
              .filter((item) => item.state === 1)
              .map((item: Product) => (
                <TableRow
                  key={item.id}
                  isSelected={productId === item.id}
                  selectRow={() => setProductId(item.id)}
                  deleteRow={() => deleteData(item.id)}
                >
                  {[
                    { style: "number", value: item.serial },
                    { style: "", value: item.name },
                    { style: "", value: item.brand },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.price.toFixed(2)}`,
                    },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
        <Block title="Productos Agotados" className={css.three}>
          <Table headers={["Serial", "Nombre", "Marca", "Precio", "Estado", ""]}>
            {products
              .filter((item) => item.state === 2)
              .map((item: Product) => (
                <TableRow
                  key={item.id}
                  isSelected={productId === item.id}
                  selectRow={() => setProductId(item.id)}
                  deleteRow={() => deleteData(item.id)}
                >
                  {[
                    { style: "number", value: item.serial },
                    { style: "", value: item.name },
                    { style: "", value: item.brand },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.price.toFixed(2)}`,
                    },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
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
