class Note {
  constructor({
    id,
    title,
    description,
    thumbnail,
  }) {
    this.id = id || 0
    this.title = title || 'default title'
    this.description = description || 'default description'
    this.thumbnail = thumbnail || null
  }
}

export default Note
