exports.install = function (Vue, options) {
  Vue.prototype.release = true
  Vue.prototype.ConnectionUrl = Vue.prototype.release ? 'https://itman.app:996' : 'https://localhost:996';
}
