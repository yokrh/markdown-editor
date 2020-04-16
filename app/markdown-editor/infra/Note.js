/**
 * ノート。
 */
class Note {
  constructor({
    id,
    title,
    description,
    thumbnail,
    tags,
    markdown,
  }) {
    this.id = id || '-1'
    this.title = title || 'default title'
    this.description = description || 'default description'
    this.thumbnail = thumbnail || null
    this.tags = tags || []
    this.markdown = markdown || ''
  }
}

export default Note
