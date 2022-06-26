import { Screen } from "../../components/screen/Screen"
import css from "./EntitiesScreen.module.css"
import { Block } from "../../components/grid/Block"
import { Grid } from "../../components/grid/Grid"
import { useContext, useEffect, useState } from "react"
import { Entity, ENTITY_MODEL } from "../../models/Entity"
import axios from "axios"
import { Loader } from "../../components/loader/Loader"
import { TableRow } from "../../components/table/TableRow"
import { Meta, Role, State } from "../../models/Meta"
import { Table } from "../../components/table/Table"
import { Form } from "../../components/form/Form"
import { BiEdit, BiTrash } from "react-icons/bi"
import { Input } from "../../components/form/Input"
import { Button } from "../../components/form/Button"
import { Row } from "../../components/grid/Row"
import { AppContext } from "../../contexts/AppContext"
import { clone } from "../../utils/clone"
import { handleErrors } from "../../utils/handleErrors"

export const EntitiesScreen = () => {
  const { REACT_APP_API_ROUTE: API_ROUTE } = process.env
  const { headers, signOut } = useContext(AppContext)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [entities, setEntities] = useState<Entity[]>([])
  const [meta, setMeta] = useState<any>({})
  const [entitySel, setEntitySel] = useState<Entity>({} as Entity)
  const [entityId, setEntityId] = useState<number>()

  useEffect(() => {
    return () => {
      getAllData()
    }
  }, [])

  useEffect(() => {
    setEntitySel(clone(ENTITY_MODEL))
    if (entityId) {
      getData()
    }
  }, [entityId])

  const getAllData = async () => {
    try {
      const entities = await axios.get(`${API_ROUTE}/api/entities`, { headers })
      setEntities(entities.data.data.reverse())
      setMeta(entities.data.meta)
    } catch (error) {
      handleErrors(error, signOut)
    } finally {
      setLoading(false)
    }
  }

  const getData = async () => {
    try {
      const entities = await axios.get(`${API_ROUTE}/api/entities/${entityId}`, { headers })
      setEntitySel(entities.data.data[0])
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const updateData = async () => {
    try {
      await axios.put(`${API_ROUTE}/api/entities/${entityId}`, entitySel, { headers })
      await getAllData()
      setEntityId(undefined)
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const createData = async () => {
    try {
      await axios.post(`${API_ROUTE}/api/entities`, entitySel, { headers })
      await getAllData()
      setEntitySel(clone(ENTITY_MODEL))
    } catch (error) {
      handleErrors(error, signOut)
    }
  }

  const deleteData = async (id: any) => {
    if (!window.confirm("¿Está seguro de eliminar el item?")) return
    try {
      await axios.delete(`${API_ROUTE}/api/entities/${id}`, { headers })
      await getAllData()
    } catch (error) {
      handleErrors(error, signOut)
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
              <Button text="Cancelar" isBlock onClick={() => setEntityId(undefined)} />
              <Button text="Salvar" isBlock onClick={entityId ? () => updateData() : () => createData()} />
            </Row>
          </Form>
        </Block>
        <Block title="Clientes" className={css.two}>
          <Table headers={["Ruc", "Nombre", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 1)
              .map((item: Entity) => (
                <TableRow
                  key={item.id}
                  isSelected={entityId === item.id}
                  selectRow={() => setEntityId(item.id)}
                  deleteRow={() => deleteData(item.id)}
                >
                  {[
                    { style: "number", value: item.ruc },
                    { style: "", value: item.name },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
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
        <Block title="Proveedores" className={css.three}>
          <Table headers={["Ruc", "Nombre", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 2)
              .map((item: Entity) => (
                <TableRow
                  key={item.id}
                  isSelected={entityId === item.id}
                  selectRow={() => setEntityId(item.id)}
                  deleteRow={() => deleteData(item.id)}
                >
                  {[
                    { style: "number", value: item.ruc },
                    { style: "", value: item.name },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
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
        <Block title="Usuarios" className={css.four}>
          <Table headers={["Ruc", "Nombre", "Correo", "Movil", "Dirección", "Estado", ""]}>
            {entities
              .filter((item) => item.role === 3)
              .map((item: Entity) => (
                <TableRow
                  key={item.id}
                  isSelected={entityId === item.id}
                  selectRow={() => setEntityId(item.id)}
                  deleteRow={() => deleteData(item.id)}
                >
                  {[
                    { style: "number", value: item.ruc },
                    { style: "", value: item.name },
                    { style: "", value: item.email },
                    { style: "", value: item.phone },
                    { style: "", value: item.address },
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
