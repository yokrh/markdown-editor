// @ts-nocheck
import mockmd from './SampleMarkdown.md'

export default [
  {
    id: '0',
    title: 'note0',
    description: 'note0 desu.',
    thumbnail: '',
    tags: [
      { id: 0, name: 'seriesAAA' },
      { id: 1, name: 'title0' },
      { id: 2, name: 'tag0' },
    ],
    markdown: mockmd,
  },
  {
    id: '1',
    title: 'note1',
    description: 'note1 desuyo.',
    thumbnail: '',
    tags: [
      { id: 3, name: 'seriesBBB' },
      { id: 4, name: 'title11' },
      { id: 2, name: 'tag0' },
      { id: 5, name: 'tag01' },
    ],
    markdown: mockmd,
  },
  {
    id: '2',
    title: 'hogehogehoge',
    description: 'note2 desuyo hogehoge.',
    thumbnail: '',
    tags: [],
    markdown: '',
  },
]
