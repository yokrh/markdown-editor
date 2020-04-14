export default function ({ store, redirect }) {
  // ユーザー認証
  if (!store.state.user.uid) {
    return redirect('/auth/login')
  }
}
