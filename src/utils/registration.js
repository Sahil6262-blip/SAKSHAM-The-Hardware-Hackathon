export function isRegistrationUrlValid(value) {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      ((url.hostname === 'forms.gle' && url.pathname.length > 1) ||
        (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')))
    )
  } catch {
    return false
  }
}
