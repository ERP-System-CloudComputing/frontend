// * Archivo para proteger rutas:
export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    return redirect('/')
  }
}
