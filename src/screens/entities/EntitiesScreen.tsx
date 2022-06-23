import { Screen } from "../../components/screen/Screen"
import css from "./EntitiesScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { useEffect, useState } from "react"
import { Entity } from "../../models/Entity"
import axios from "axios"
import { Loader } from "../../components/loader/Loader"
import { TableRow } from "../../components/table/TableRow"
import { Role, State } from "../../models/Meta"
import { Table } from "../../components/table/Table"
import { Form } from "../../components/form/Form"
import { BiEdit, BiTrash } from "react-icons/bi"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { Row } from "../../components/grid/Row"

export const EntitiesScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const [isLoading, setLoading] = useState(true)
  const [entities, setEntities] = useState<Entity[]>([])
  const [meta, setMeta] = useState<any>()
  const [entitySel, setEntitySel] = useState<any>()
  const [entityId, setEntityId] = useState<number>()
  const entityModel = {
    name: "",
    ruc: "",
    email: "",
    phone: "",
    address: "",
    role: 1,
    state: 1,
  }

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setEntitySel(JSON.parse(JSON.stringify(entityModel)))
    if (entityId) {
      getData()
    }
  }, [entityId])

  const getAllData = async () => {
    try {
      const entities = await axios.get(`${API_ROUTE}/api/entities`)
      setEntities(entities.data.data.reverse())
      setMeta(entities.data.meta)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const entities = await axios.get(`${API_ROUTE}/api/entities/${entityId}`)
      setEntitySel(entities.data.data[0])
    } catch (error) {
      alert(error)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/entities/${entityId}`, entitySel)
      await getAllData()
      setEntityId(undefined)
    } catch (error) {
      alert(error)
    }
  }

  const createData = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/entities`, entitySel)
      await getAllData()
      setEntitySel(JSON.parse(JSON.stringify(entityModel)))
    } catch (error) {
      alert(error)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/entities/${id}`)
      await getAllData()
    } catch (error) {
      alert(error)
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen title="Entidades">
      <Grid>
        <Block isFixed title="Vista de Entidad" className={css.one}>
          <Form>
            <Input
              label="Nombre"
              value={entitySel?.name}
              onChange={(val: string) => setEntitySel({ ...entitySel, name: val })}
            />
            <Input
              label="Ruc"
              value={entitySel?.ruc}
              onChange={(val: string) => setEntitySel({ ...entitySel, ruc: val })}
            />
            <Input
              label="Correo"
              value={entitySel?.email}
              onChange={(val: string) => setEntitySel({ ...entitySel, email: val })}
            />
            <Input
              label="Movil"
              value={entitySel?.phone}
              onChange={(val: string) => setEntitySel({ ...entitySel, phone: val })}
            />
            <Input
              label="Dirección"
              type="textarea"
              rows={5}
              value={entitySel?.address}
              onChange={(val: string) => setEntitySel({ ...entitySel, address: val })}
            />
            <Row template={[1, 1]}>
              <Input
                label="Rol"
                value={entitySel?.role}
                type="select"
                options={meta.roles}
                onChange={(val: number) => setEntitySel({ ...entitySel, role: val })}
              />
              <Input
                label="Estado"
                value={entitySel?.state}
                type="select"
                options={meta.states}
                onChange={(val: number) => setEntitySel({ ...entitySel, state: val })}
              />
            </Row>
            <Row template={[1, 1]}>
              <Button text="Salvar" isBlock onClick={entityId ? () => updateData() : () => createData()} />
              <Button text="Cancelar" isBlock onClick={() => setEntityId(undefined)} />
            </Row>
          </Form>
        </Block>
        <Block title="Clientes" className={css.two}>
          <Table headers={["Nombre", "Ruc", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 1)
              .map((item: Entity) => (
                <TableRow key={item.id} isSelected={entityId === item.id}>
                  {[
                    { style: "", value: item.name },
                    { style: "number", value: item.ruc },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setEntityId(item.id)} />
                          <BiTrash size="1.1rem" onClick={() => deleteData(item.id)} />
                        </>
                      ),
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
        <Block title="Proveedores" className={css.three}>
          <Table headers={["Nombre", "Ruc", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 2)
              .map((item: Entity) => (
                <TableRow key={item.id} isSelected={entityId === item.id}>
                  {[
                    { style: "", value: item.name },
                    { style: "number", value: item.ruc },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setEntityId(item.id)} />
                          <BiTrash size="1.1rem" onClick={() => deleteData(item.id)} />
                        </>
                      ),
                    },
                  ]}
                </TableRow>
              ))}
          </Table>
        </Block>
        <Block title="Usuarios" className={css.four}>
          <Table headers={["Nombre", "Ruc", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 3)
              .map((item: Entity) => (
                <TableRow key={item.id} isSelected={entityId === item.id}>
                  {[
                    { style: "", value: item.name },
                    { style: "number", value: item.ruc },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
                    {
                      style: "state",
                      value: meta.states.find((st: State) => st.id === item.state).name,
                      fkId: item.state,
                    },
                    {
                      style: "icon",
                      value: (
                        <>
                          <BiEdit size="1.1rem" onClick={() => setEntityId(item.id)} />
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
