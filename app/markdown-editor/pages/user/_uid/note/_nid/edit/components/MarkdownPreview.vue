<template>
  <!-- プレビュー -->
  <div class="markdown-preview" v-html="html" />
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
/* Markdown style cannot not be applied with scoped */

.markdown-preview {
  word-break: break-all;
}
/** # hoge */
.markdown-preview h1 {
  margin: 32px 0;
  font-size: 28px;
}
/** ## hoge */
.markdown-preview h2 {
  margin: 32px 0 20px 0;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
  font-size: 24px;
}
/** ## hoge */
.markdown-preview h3 {
  font-size: 20px;
}
/** hoge */
.markdown-preview p {
  margin: 8px 0;
}
/** *hoge* */
.markdown-preview p em {
  font-style: italic;
}
/** **hoge** */
.markdown-preview p strong {
  font-weight: bold;
}
/** ~~hoge~~ */
.markdown-preview p s {
  text-decoration: line-through;
}
/** `hoge` */
.markdown-preview p > code {
  background-color: #eee;
  padding: 2px 8px;
}
/** ```hoge``` */
.markdown-preview pre {
  background-color: #344;
  color: #eee;
  padding: 16px;
  overflow-x: scroll;
}
/** * hoge */
.markdown-preview ul {
  padding-left: 40px;
  font-size: 100%;
  list-style: disc;
}
.markdown-preview ul ul {
  list-style: circle;
}
/** 1. hoge */
.markdown-preview ol {
  padding-left: 40px;
  font-size: 100%;
  list-style: decimal;
}
/** > hoge */
.markdown-preview blockquote {
  border-left: 4px solid #ccc;
  padding: 2px 0 2px 8px;
}
/** | hoge | fuga | piyo | */
.markdown-preview table {
  margin: 12px 0;
}
.markdown-preview table th {
  padding: 8px;
  font-weight: bold;
}
.markdown-preview table td {
  padding: 8px 16px;
}
.markdown-preview table th + th, .markdown-preview table td + td {
  border-left: 1px solid #bebebe;
}

@media screen and (max-width: 640px) {
  .markdown-preview h2 {
    width: 100%;
    margin: 32px 0 20px -2%;
    padding: 8px 2%;
  }
  .markdown-preview pre {
    padding: 16px 6%;
  }
}
</style>
