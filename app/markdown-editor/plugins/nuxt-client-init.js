/**
 * ref:
 * https://ja.nuxtjs.org/guide/plugins
 * https://ja.nuxtjs.org/api/context/
 */
export default async (nuxtContext) => {
  const { $axios } = nuxtContext
  await nuxtContext.store.dispatch('nuxtClientInit', { $axios })
}
