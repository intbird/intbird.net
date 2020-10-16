exports.install = function (Vue, options) {
  Vue.prototype.release = false
  Vue.prototype.ConnectionUrl = Vue.prototype.release ? 'https://intbird.net:996' : 'https://localhost:996';
}
