export const handleErrors = (error: any, signOut: any) => {
  switch (error.response.status) {
    case 401: // Caducó la sesión
      signOut()
      break
    case 403: // No autorizado
      signOut()
      break
    default:
      alert(error)
      break
  }
}
