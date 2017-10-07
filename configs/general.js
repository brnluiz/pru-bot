module.exports = {
  baseUrl: process.env.URL || `http://localhost:${process.env.PORT}`,
  defaults: {
    location: 'ufsc-trindade',
    timezone: '-03:00',
    locale: 'pt-br'
  }
}
