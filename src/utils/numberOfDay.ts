export function numberOfDay(dateStart: String, dateEnd: String) {
  let arrayDateStart: Array<string> = dateStart.split("-")
  let arrayDateEnd: Array<string> = dateEnd.split("-")

  let millisecondsDateStart: number = Date.UTC(
    Number(arrayDateStart[0]),
    Number(arrayDateStart[1]),
    Number(arrayDateStart[2])
  )
  let millisecondsDateEnd: number = Date.UTC(
    Number(arrayDateEnd[0]),
    Number(arrayDateEnd[1]),
    Number(arrayDateEnd[2])
  )

  let difference = millisecondsDateEnd - millisecondsDateStart

  let days = Math.floor(difference / (1000 * 60 * 60 * 24))

  let months = (Number(arrayDateEnd[0]) - Number(arrayDateStart[0])) * 12
  months -= Number(arrayDateStart[1])
  months += Number(arrayDateEnd[1])

  return { days, months }
}

export function addDate(date: Date, amount: number, type: number) {
  // Type puede ser: 1 = Dias; 2 = meses;
  if (type === 1) {
    date.setDate(date.getDate() + amount)
  } else if (type === 2) {
    date.setMonth(date.getMonth() + amount)
  }
  return date
}
