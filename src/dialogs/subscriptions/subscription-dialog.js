module.exports = [
  (session) => {
    const isSubscribed = true

    return (isSubscribed
      ? session.replaceDialog('SubscribeDialog')
      : session.replaceDialog('UnsubscribeDialog'))
  }
]
