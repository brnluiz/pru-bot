const url = process.env.URL || `http://localhost:${process.env.PORT}`
const path = 'assets/images/menu-dialog'

const shuffle = (arr) =>
  arr.sort(() => (Math.random() - 0.5))

module.exports.generate = () => shuffle([
  `${url}/${path}/food-1.jpg`,
  `${url}/${path}/food-2.jpg`,
  `${url}/${path}/food-3.jpg`,
  `${url}/${path}/food-4.jpg`,
  `${url}/${path}/food-5.jpg`,
  `${url}/${path}/food-6.jpg`,
  `${url}/${path}/food-7.jpg`,
  `${url}/${path}/food-8.jpg`
])
