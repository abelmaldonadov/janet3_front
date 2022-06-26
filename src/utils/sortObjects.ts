export const sortObjects = (arrayOfObjects: Array<any>, field: string, order: string) => {
  const arrayOfStrings = arrayOfObjects.map((item: any) => item[field])
  const sortedArrayOfStrings = order === "<" ? arrayOfStrings.sort() : arrayOfStrings.sort().reverse()
  const sortedArrayOfObjects = sortedArrayOfStrings.map((item) =>
    arrayOfObjects.find((ob: any) => ob[field] === item)
  )
  return sortedArrayOfObjects
}
