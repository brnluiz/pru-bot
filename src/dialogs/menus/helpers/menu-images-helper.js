const configs = require('../../../../configs')
const path = 'assets/images/menu-dialog'

const shuffle = (arr) =>
  arr.sort(() => (Math.random() - 0.5))

module.exports.generate = () => shuffle([
  `${configs.general.baseUrl}/${path}/food-1.jpg`,
  `${configs.general.baseUrl}/${path}/food-2.jpg`,
  `${configs.general.baseUrl}/${path}/food-3.jpg`,
  `${configs.general.baseUrl}/${path}/food-4.jpg`,
  `${configs.general.baseUrl}/${path}/food-5.jpg`,
  `${configs.general.baseUrl}/${path}/food-6.jpg`,
  `${configs.general.baseUrl}/${path}/food-7.jpg`,
  `${configs.general.baseUrl}/${path}/food-8.jpg`,
  `${configs.general.baseUrl}/${path}/food-9.jpg`,
  `${configs.general.baseUrl}/${path}/food-10.jpg`
])
