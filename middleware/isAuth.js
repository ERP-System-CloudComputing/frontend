// * Archivo que detecta si el usuario esta autenticado o no
export default function ({ store, redirect, route, app }) {
  if (process.client) {
    // * Si el usuario esta autenticado o Nuxt Auth lo rehidrato y esta intentanco acceeder a la pagina de login:
    if (app.$auth.loggedIn && route.path === '/') {
      console.log('Oh, dejaste el rememebeME activo, se re redigira a: ', route.path)
      return redirect('/dashboard')
    }
  }
}
