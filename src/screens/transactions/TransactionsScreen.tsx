import { Screen } from "../../components/screen/Screen"
import css from "./TransactionsScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { useEffect, useState } from "react"
import { Entity } from "../../models/Entity"
import axios from "axios"
import { Loader } from "../../components/loader/Loader"
import { Transaction, TransactionDetail } from "../../models/Transaction"
import { TableRow } from "../../components/table/TableRow"
import { Coin, Role, State, Tracking, TransactionType } from "../../models/Meta"
import { Table } from "../../components/table/Table"
import { BiEdit, BiShoppingBag, BiTrash } from "react-icons/bi"
import { Input } from "../../components/form/Input"
import { Form } from "../../components/form/Form"
import { Button } from "../../components/form/Button"
import { Row } from "../../components/grid/Row"

export const TransactionsScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const [isLoading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [entities, setEntities] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [meta, setMeta] = useState<any>()
  const [transactionSel, setTransactionSel] = useState<any>()
  const [transactionDetailSel, setTransactionDetailSel] = useState<any>()
  const [transactionId, setTransactionId] = useState<number>()
  const transactionModel = {
    date: "",
    total: 0,
    coin: 1,
    transactionType: 1,
    tracking: 1,
    entity: 1,
    state: 1,
  }

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setTransactionSel(JSON.parse(JSON.stringify(transactionModel)))
    setTransactionDetailSel([])
    if (transactionId) {
      getData()
    }
  }, [transactionId])

  useEffect(() => {
    return () => {
      getData()
    }
  }, [])

  const getAllData = async () => {
    try {
      const transactions = await axios.get(`${API_ROUTE}/api/transactions`)
      const entities = await axios.get(`${API_ROUTE}/api/entities`)
      const products = await axios.get(`${API_ROUTE}/api/products`)
      setTransactions(transactions.data.data.reverse())
      setEntities(entities.data.data.reverse())
      setProducts(products.data.data.reverse())
      setMeta(transactions.data.meta)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const transactions = await axios.get(`${API_ROUTE}/api/transactions/${transactionId}`)
      setTransactionSel(transactions.data.data.head[0])
      setTransactionDetailSel(transactions.data.data.body)
    } catch (error) {
      alert(error)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/transactions/${transactionId}`, transactionSel)
      await getAllData()
      setTransactionId(undefined)
    } catch (error) {
      alert(error)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/transactions/${id}`)
      await getAllData()
    } catch (error) {
      alert(error)
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen title="Transacciones">
      <Grid>
        <Block title="Detalles de Transacción" isFixed className={css.one}>
          <Form>
            <Row template={[1, 1, 2, 2]}>
              <Input
                label="Identificador"
                type="number"
                readonly
                value={transactionSel?.id}
                onChange={(val: number) => setTransactionSel({ ...transactionSel, transactionType: val })}
              />
              <Input
                label="Transacción"
                type="select"
                readonly
                options={meta.transactionTypes}
                value={transactionSel?.transactionType}
                onChange={(val: number) => setTransactionSel({ ...transactionSel, transactionType: val })}
              />
              <></>
              <Input
                label="Fecha"
                type="text"
                readonly
                value={transactionSel?.date && new Date(transactionSel.date).toLocaleString()}
                onChange={(val: string) => setTransactionSel({ ...transactionSel, date: val })}
              />
            </Row>
            <Row template={[2, 2, 1, 1]}>
              <Input
                label="Entidad"
                type="select"
                options={entities.filter((item) => item.role === transactionSel?.transactionType)}
                value={transactionSel?.entity}
                onChange={(val: number) => setTransactionSel({ ...transactionSel, entity: val })}
              />
              <></>
              <Input
                label="Tracking"
                type="select"
                options={meta.tracking}
                value={transactionSel?.tracking}
                onChange={(val: number) => setTransactionSel({ ...transactionSel, tracking: val })}
              />
              <Input
                label="Estado"
                type="select"
                options={meta.states}
                value={transactionSel?.state}
                onChange={(val: number) => setTransactionSel({ ...transactionSel, state: val })}
              />
            </Row>
            <div className={css.canva}>
              <div className={css.detailHeader}>
                <Row template={[1, 15, 3, 3, 3]}>
                  <></>
                  <div>Producto</div>
                  <div className={css.number}>Unitario</div>
                  <div className={css.number}>Cantidad</div>
                  <div className={css.number}>Subtotal</div>
                </Row>
              </div>
              {transactionDetailSel.map((item: TransactionDetail) => (
                <div key={item.id} className={css.product}>
                  <Row template={[1, 15, 3, 3, 3]}>
                    <BiShoppingBag size="1rem"></BiShoppingBag>
                    <div>{products.find((pr) => pr.id === item.product).name}</div>
                    <div className={css.number}>{item.price.toFixed(2)}</div>
                    <div className={css.number}>{item.quantity}</div>
                    <div className={css.number}>{item.subtotal.toFixed(2)}</div>
                  </Row>
                </div>
              ))}
            </div>
            <Row template={[4, 1, 1]}>
              <></>
              <Input
                label="Moneda"
                type="select"
                readonly
                options={meta.coins}
                value={transactionSel?.coin}
                onChange={(val: string) => setTransactionSel({ ...transactionSel, coin: val })}
              />
              <Input
                label="Total"
                type="text"
                readonly
                value={transactionSel?.total}
                onChange={(val: string) => setTransactionSel({ ...transactionSel, total: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Button text="Salvar" isBlock isDisabled={!transactionId} onClick={() => updateData()} />
              <Button text="Cancelar" isBlock onClick={() => setTransactionId(undefined)} />
            </Row>
          </Form>
        </Block>
        <Block title="Transacciones Aprobadas" className={css.two}>
          <Table headers={["Id", "Fecha", "Transacción", "Entidad", "Total", "Estado", ""]}>
            {transactions
              .filter((item) => item.tracking === 2)
              .map((item: Transaction) => (
                <TableRow key={item.id} isSelected={transactionId === item.id}>
                  {[
                    { style: "number", value: item.id },
                    { style: "date", value: new Date(item.date).toLocaleString() },
                    {
                      style: "transaction",
                      value: meta.transactionTypes.find(
                        (tr: TransactionType) => tr.id === item.transactionType
                      ).name,
                      fkId: item.transactionType,
                    },
                    { style: "", value: entities.find((en: Entity) => en.id === item.entity).name },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.total.toFixed(2)}`,
                    },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setTransactionId(item.id)} />
                          <BiTrash size="1.1rem" onClick={() => deleteData(item.id)} />
                        </>
                      ),
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
        <Block title="Transacciones Pendientes" className={css.three}>
          <Table headers={["Id", "Fecha", "Transacción", "Entidad", "Total", "Estado", ""]}>
            {transactions
              .filter((item) => item.tracking === 1)
              .map((item: Transaction) => (
                <TableRow key={item.id} isSelected={transactionId === item.id}>
                  {[
                    { style: "number", value: item.id },
                    { style: "date", value: new Date(item.date).toLocaleString() },
                    {
                      style: "transaction",
                      value: meta.transactionTypes.find(
                        (tr: TransactionType) => tr.id === item.transactionType
                      ).name,
                      fkId: item.transactionType,
                    },
                    { style: "", value: entities.find((en: Entity) => en.id === item.entity).name },
                    {
                      style: "money",
                      value: `${
                        meta.coins.find((co: Coin) => co.id === item.coin).symbol
                      } ${item.total.toFixed(2)}`,
                    },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setTransactionId(item.id)} />
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
