
export default function({store, redirect}) {
  const isAuth = store.getters['auth/isAuthenticated']

  if (!isAuth) {
    return redirect('/notAuthenticated')
  }
}
