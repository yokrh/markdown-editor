# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).


## Note

クラシックモードは廃止されるので、モジュールモードを利用する必要がある。
https://ja.nuxtjs.org/guide/vuex-store/#%E3%82%B9%E3%83%88%E3%82%A2%E3%82%92%E6%9C%89%E5%8A%B9%E3%81%AB%E3%81%99%E3%82%8B

ピュアなVuexでいうmodulesを、ディレクトリ構造で実現しつつ強制している。
ただし、stateはオブジェクトではなく、オブジェクトを返す関数に変わっている点に注意。
