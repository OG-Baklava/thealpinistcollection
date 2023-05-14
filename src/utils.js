const time2date = (timestamp) =>
  Intl.DateTimeFormat("fr-CH").format(timestamp.toDate())

const fmtDate = (date) => Intl.DateTimeFormat("fr-CH").format(date)

export { time2date, fmtDate }
