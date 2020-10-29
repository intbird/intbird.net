exports.install = function (Vue, options) {
  Vue.prototype.release = true
  Vue.prototype.SocketConnectURL = Vue.prototype.release ? 'https://intbird.net' : 'http://localhost:8083'
  Vue.prototype.SocketConnectPATH = '/socket/socket.io/'
  Vue.prototype.ConnectionUrl = Vue.prototype.release ? 'https://intbird.net/express' : 'http://localhost:8083'
}
