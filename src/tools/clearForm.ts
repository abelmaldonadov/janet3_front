export const clearForm = (form: any) => {
  if (!form) return form
  // const object = JSON.parse(JSON.stringify(form))
  // for (let key in object) {
  //   object[key] = undefined
  // }
  // setForm(undefined)
  // return

  const object = JSON.parse(JSON.stringify(form))
  for (let key in object) {
    if (typeof object[key] === "string") {
      object[key] = ""
    } else if (typeof object[key] === "number") {
      object[key] = 0
    } else {
      object[key] = undefined
    }
  }
  return object
}
