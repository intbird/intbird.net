const express = require('../express/express.js')
const ioKeys = require('./key/socketio-keys')
const http = require('http')
const https = require('https')
const fs = require('fs')
var path = require('path')

var httpsServer = https.createServer({
  cert: fs.readFileSync(path.join(__dirname, '../cert/intbird.net.cloudflare.pem')),
  key: fs.readFileSync(path.join(__dirname, '../cert/intbird.net.cloudflare.key'))
}, express.app)

const httpServer = http.createServer(express.app)

const server = ioKeys.Keys.HTTPS ? httpsServer : httpServer
const socketio = require('socket.io')(server, {path: ioKeys.Keys.SOCKET_PATH})
server.listen(ioKeys.Keys.SOCKET_PORT, function () {
  console.log(`\nsuccess : http://localhost:${ioKeys.Keys.SOCKET_PORT} \n`)
})

const mongodb = require('../mongo/mongodb-socket.js')
// 监听消息
socketio.on('connection', function (socket) {
  trackFlow('connection')

  socket.on(ioKeys.Keys.ON_EVENT_MESSAGE, function (messageBody) {
    const result = messageBody
    if (ioKeys.Keys.USE_DB) {
      mongodb.insert(result, () => {
        sendMessage(ioKeys.Keys.BROADCAST, result)
      }, error => {
        trackFlow('error', error)
      })
    } else {
      sendMessage(ioKeys.Keys.BROADCAST, result)
    }
  })

  socket.on(ioKeys.Keys.ON_EVENT_DB_QUERY, function (messageBody) {
    mongodb.query( {identifyId: messageBody.identifyId}, dbResult => {
      const result = dbResult || dbResult.length ? dbResult : []
      sendMessages(ioKeys.Keys.BROADCAST, result)
    }, error => {
      trackFlow('error', error)
    })
  })

  socket.on(ioKeys.Keys.ON_EVENT_DB_QUERY_LIKE, function (messageBody) {
    mongodb.query(messageBody, dbResult => {
      const result = dbResult || dbResult.length ? dbResult : []
      sendMessages(ioKeys.Keys.BROADCAST, result)
    }, error => {
      trackFlow('error', error)
    })
  })

  socket.on(ioKeys.Keys.ON_EVENT_DB_DELETE_ONE, function (messageBody) {
    mongodb.delete(true, {identifyId: messageBody.identifyId}, () => {
      mongodb.query({identifyId: messageBody.identifyId}, dbResult => {
        const result = dbResult || dbResult.length ? dbResult : []
        sendMessages(ioKeys.Keys.BROADCAST, result)
      }, error => {
        trackFlow('error', error)
      })
    }, error => {
      trackFlow('error', error)
    })
  })

  socket.on(ioKeys.Keys.ON_EVENT_DB_DELETE_MANY, function (messageBody) {
    mongodb.delete(false, {identifyId: messageBody.identifyId}, () => {
      mongodb.query({identifyId: messageBody.identifyId}, dbResult => {
        const result = dbResult || dbResult.length ? dbResult : []
        sendMessages(ioKeys.Keys.BROADCAST, result)
      }, error => {
        trackFlow('error', error)
      })
    }, error => {
      trackFlow('error', error)
    })
  })

  socket.on('disconnect', function () {
    trackFlow('disconnect')
  })

  function sendMessage(broadcast, message) {
    if (broadcast) {
      socketio.emit(ioKeys.Keys.EMIT_EVENT_MESSAGE, message)
    } else {
      socket.emit(ioKeys.Keys.EMIT_EVENT_MESSAGE, message)
    }
  }

  function sendMessages(broadcast, messages) {
    if (broadcast) {
      socketio.emit(ioKeys.Keys.EMIT_EVENT_MESSAGES, messages)
    } else {
      socket.emit(ioKeys.Keys.EMIT_EVENT_MESSAGES, messages)
    }
  }

  function trackFlow(connect, error) {
    const result = {id: socket.id, connect: connect}
    console.log(result);
    express.trackFlow(result)
    socketio.emit(ioKeys.Keys.EMIT_TRACK, result)

    if (error) {
      console.log(error);
    }
  }
})
