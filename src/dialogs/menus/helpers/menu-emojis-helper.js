const shuffle = (arr) =>
  arr.sort(() => (Math.random() - 0.5))

const emojis = ['🍲', '🍴', '🍳', '🍕', '🍔', '🍗', '🍟', '🍛']

module.exports.generate = () => shuffle(emojis)
module.exports.getOne = () => shuffle(emojis)[0]
