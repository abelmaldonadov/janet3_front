import { Screen } from "../../components/screen/Screen"
import css from "./PointOfSaleScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { Loader } from "../../components/loader/Loader"
import { useContext, useEffect, useState } from "react"
import { Product } from "../../models/Product"
import axios from "axios"
import { ProductCard } from "../../components/product_card/ProductCard"
import { Row } from "../../components/grid/Row"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { Transaction, TRANSACTION_MODEL, TransactionDetail } from "../../models/Transaction"
import { BiTrash } from "react-icons/bi"
import { Form } from "../../components/form/Form"
import { Entity, ENTITY_MODEL } from "../../models/Entity"
import { sortObjects } from "../../utils/sortObjects"
import { AppContext } from "../../contexts/AppContext"
import { clone } from "../../utils/clone"
import { handleErrors } from "../../utils/handleErrors"

export const PointOfSaleScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers, signOut } = useContext(AppContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<any[]>([] as Product[])
  const [entities, setEntities] = useState<Entity[]>([] as Entity[])
  const [meta, setMeta] = useState<any>()
  const [transactionDetail, setTransactionDetail] = useState<TransactionDetail[]>([])
  const [newEntity, setNewEntity] = useState<Entity>({} as Entity)
  const [transaction, setTransaction] = useState<Transaction>({} as Transaction)

  useEffect(() => {
    setNewEntity(clone(ENTITY_MODEL))
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    const trans = clone(TRANSACTION_MODEL)
    if (transactionDetail.length > 0) {
      trans.total = transactionDetail.reduce((acc, cur) => acc + cur.subtotal, 0).toFixed(2)
    } else {
      trans.total = (0).toFixed(2)
    }
    setTransaction(trans)
  }, [transactionDetail])

  const getAllData = async () => {
    try {
      const products = await axios.get(`${API_ROUTE}/api/products`, { headers })
      setProducts(sortObjects(products.data.data, "name", "<"))
      const entities = await axios.get(`${API_ROUTE}/api/entities`, { headers })
      setEntities(entities.data.data.reverse())
      setMeta(products.data.meta)
    } catch (error) {
      handleErrors(error, signOut)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: Product, quantity: number) => {
    const detail = clone(transactionDetail)
    const productExist = detail.find((item: TransactionDetail) => item.product === product.id)
    if (productExist) {
      productExist.quantity++
      productExist.subtotal = productExist.price * productExist.quantity
    } else {
      detail.push({
        coin: product.coin,
        product: product.id,
        price: product.price,
        quantity: quantity,
        subtotal: product.price * quantity,
        state: 1,
      })
    }
    setTransactionDetail(detail)
  }

  const removeFromCart = (i: number) => {
    const details = clone(transactionDetail)
    const newDetails = details.filter((item: TransactionDetail, index: number) => index !== i)
    setTransactionDetail(newDetails)
  }

  const sell = async () => {
    try {
      await axios.post(
        `${API_ROUTE}/api/transactions`,
        { head: transaction, body: transactionDetail },
        { headers }
      )
      await getAllData()
      setTransaction(clone(TRANSACTION_MODEL))
      setTransactionDetail([])
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const cancelSale = () => {
    setTransaction(clone(TRANSACTION_MODEL))
    setTransactionDetail([])
  }

  const createNewEntity = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/entities`, newEntity, { headers })
      await getAllData()
      setNewEntity(clone(ENTITY_MODEL))
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const cancelNewEntity = () => {
    const entity = JSON.parse(JSON.stringify(ENTITY_MODEL))
    setNewEntity(entity)
  }

  if (isLoading) return <Loader />

  return (
    <Screen title="Point of Sale">
      <Grid>
        <Block title="Productos" isFixed className={css.one}>
          <div className={css.container}>
            {products
              .filter((item) => item.coin === 1)
              .filter((item) => item.state === 1)
              .map((item) => (
                <ProductCard key={item.id} product={item} meta={meta} onClick={() => addToCart(item, 1)} />
              ))}
          </div>
        </Block>
        <Block title="Cuenta" className={css.two}>
          <div className={css.detail}>
            <div className={css.detailHeader}>
              <Row template={[1, 10, 3, 3, 3]}>
                <></>
                <div>Producto</div>
                <div className={css.number}>Unitario</div>
                <div className={css.number}>Cant.</div>
                <div className={css.number}>Subtotal</div>
              </Row>
            </div>
            {transactionDetail &&
              transactionDetail.map((item: TransactionDetail, index) => (
                <div key={item.id} className={css.product}>
                  <Row template={[1, 10, 3, 3, 3]}>
                    <BiTrash size="1rem" className={css.trashIcon} onClick={() => removeFromCart(index)} />
                    <div>{products.find((pr) => pr.id === item.product).name}</div>
                    <div className={css.number}>{item.price.toFixed(2)}</div>
                    <div className={css.number}>{item.quantity}</div>
                    <div className={css.number}>{item.subtotal.toFixed(2)}</div>
                  </Row>
                </div>
              ))}
          </div>
          <Row template={[1, 1, 1, 1]}>
            <Input
              label="Tracking"
              type="select"
              options={meta.tracking}
              value={transaction?.tracking}
              onChange={(val: number) => setTransaction({ ...transaction, tracking: val })}
            />
            <></>
            <Input
              label="Moneda"
              type="select"
              readonly
              options={meta.coins}
              value={transaction?.coin}
              onChange={(val: number) => setTransaction({ ...transaction, coin: val })}
            />
            <Input
              label="Total"
              type="number"
              readonly
              value={transaction?.total}
              onChange={(val: number) => setTransaction({ ...transaction, total: val })}
            />
          </Row>
          <Input
            label="Cliente"
            type="select"
            options={entities.filter((item) => item.state === 1).filter((item) => item.role === 1)}
            value={transaction?.entity}
            onChange={(val: number) => setTransaction({ ...transaction, entity: val })}
          />
          <Row template={[1, 1]}>
            <Button text="Cancelar" isBlock onClick={() => cancelSale()} />
            <Button
              text="Salvar"
              isBlock
              isDisabled={transactionDetail === undefined || transactionDetail.length === 0}
              onClick={() => sell()}
            />
          </Row>
        </Block>
        <Block title="Nuevo Cliente" className={css.three}>
          <Form>
            <Input
              label="Nombre"
              value={newEntity?.name}
              onChange={(val: string) => setNewEntity({ ...newEntity, name: val })}
            />
            <Input
              label="Ruc"
              value={newEntity?.ruc}
              onChange={(val: string) => setNewEntity({ ...newEntity, ruc: val })}
            />
            <Input
              label="Correo"
              value={newEntity?.email}
              onChange={(val: string) => setNewEntity({ ...newEntity, email: val })}
            />
            <Input
              label="Movil"
              value={newEntity?.phone}
              onChange={(val: string) => setNewEntity({ ...newEntity, phone: val })}
            />
            <Input
              label="Dirección"
              type="textarea"
              rows={5}
              value={newEntity?.address}
              onChange={(val: string) => setNewEntity({ ...newEntity, address: val })}
            />
            <Row template={[1, 1]}>
              <Input
                label="Rol"
                readonly
                value={newEntity?.role}
                type="select"
                options={meta.roles}
                onChange={(val: number) => setNewEntity({ ...newEntity, role: val })}
              />
              <Input
                label="Estado"
                value={newEntity?.state}
                type="select"
                options={meta.states}
                onChange={(val: number) => setNewEntity({ ...newEntity, state: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Button text="Cancelar" isBlock onClick={() => cancelNewEntity()} />
              <Button text="Salvar" isBlock onClick={() => createNewEntity()} />
            </Row>
          </Form>
        </Block>
      </Grid>
    </Screen>
  )
}
