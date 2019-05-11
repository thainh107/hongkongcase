export default (id, name, timestamp, images) => ({
    id: id,
    name: name,
    todos: [],
    timestamp: timestamp,
    images: images || []
  })