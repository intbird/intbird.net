const Keys = {
  HTTPS: false,
  SOCKET_PORT: 8083, // 8080 ; 996
  SOCKET_PATH: '/socket/socket.io/',

  ON_EVENT_MESSAGE: 'message',

  ON_EVENT_DB_QUERY: 'query',
  ON_EVENT_DB_QUERY_LIKE: 'queryLike',

  ON_EVENT_DB_DELETE_ONE: 'deleteOne',
  ON_EVENT_DB_DELETE_MANY: 'deleteMany',

  EMIT_TRACK: 'trackFlow',
  EMIT_EVENT_MESSAGE: 'message',
  EMIT_EVENT_MESSAGES: 'messages',

  USE_DB: true,
  BROADCAST: true,
}

exports.Keys = Keys
