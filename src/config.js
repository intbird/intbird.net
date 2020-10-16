exports.install = function (Vue, options) {
  Vue.prototype.release = true
  Vue.prototype.ConnectionUrl = Vue.prototype.release ? 'https://api.intbird.net:443' : 'https://localhost:996';
}
