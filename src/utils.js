const time2date = (timestamp) =>
  Intl.DateTimeFormat("fr-CH").format(timestamp.toDate())

const fmtDate = (date) => Intl.DateTimeFormat("fr-CH").format(date)

class DateCustom extends Date {
  addDays(days) {
    const date = new DateCustom(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
}

export { DateCustom, fmtDate, time2date }
