module.exports = (session) => ({
  [session.localizer.gettext(session.preferredLocale(), 'options:yes')]: {
    value: 'yes'
  },
  [session.localizer.gettext(session.preferredLocale(), 'options:no')]: {
    value: 'no'
  }
})
