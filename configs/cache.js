module.exports = {
  redisUrl: process.env.REDIS_URL,
  defaultExpiration: process.env.REDIS_TTL || (60 * 60 * 6)
}
