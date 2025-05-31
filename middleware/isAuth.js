// * Archivo que detecta si el usuario esta autenticado o no
export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    return redirect('/dashboard')
  }
}
