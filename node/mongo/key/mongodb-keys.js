const config = require('./mongodb-config')

module.exports = {
  dbUrl: config.url,
  dbName: config.db,

  connSocket: 'socketio',
  connVisitor: 'visitor',
  connWorkbench: 'workbench',
  knowledge: 'knowledge',

  openSource: 'openSource',
  simpleCode: 'simpleCode',
  keynotes: 'keynotes',
  published: 'published',

  markdown: 'markdown',
}
