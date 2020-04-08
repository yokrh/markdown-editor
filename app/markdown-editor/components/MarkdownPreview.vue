<template>
  <div class="markdown" v-html="html" />
</template>

<script>
import xss from 'xss'
const mdi = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})

/* eslint vue/no-v-html: 0 */
export default {
  props: {
    md: {
      default: '',
      type: String,
    },
  },
  computed: {
    html() {
      return xss(mdi.render(this.md))
    },
  },
}
</script>

<style>
/* Markdown style should be not scoped */

.markdown {
  word-break: break-all;
}
/** # hoge */
.markdown h1 {
  margin: 32px 0;
  font-size: 32px;
}
/** ## hoge */
.markdown h2 {
  margin: 32px 0 20px 0;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  font-size: 28px;
}
/** hoge */
.markdown p {
  margin: 8px 0;
}
/** `hoge` */
.markdown p > code {
  background-color: #eee;
  padding: 2px 8px;
}
/** ```hoge``` */
.markdown pre {
  background-color: #344;
  color: #eee;
  padding: 16px;
  overflow-x: scroll;
}

/** * hoge */
.markdown ul {
  padding-left: 40px;
  font-size: 100%;
  list-style: disc;
}
.markdown ul ul {
  list-style: circle;
}

/** 1. hoge */
.markdown ol {
  padding-left: 40px;
  font-size: 100%;
  list-style: decimal;
}

@media screen and (max-width: 640px) {
  .markdown h2 {
    width: 104%;
    margin: 32px 0 20px -2%;
    padding: 8px 2%;
  }
  .markdown pre {
    padding: 16px 6%;
  }
}
</style>
