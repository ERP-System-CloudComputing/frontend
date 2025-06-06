// * Archivo para proteger rutas:
export default function ({ store, redirect, route, app }) {
  // * Este middleware se ejecuta en el cliente y en el servidor.
  // * Para el cliente, esperamos que Nuxt Auth ya haya rehidratado la sesión.
  if (!app.$auth.loggedIn) { // ? app.$auth.loggedIn para mayor coherencia
    return redirect('/')
  }
}
