import Vue from 'vue'
import Router from 'vue-router'

import MyWorkBench from '../pages/my-workbench'
import Knowledge from '../pages/my-knowledge'
import OpenSource from '../pages/my-opensource'

import SocketIO from '../pages/socket/socket-io'
import IFramePage from '../pages/iframe/iframe-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyWorkBench
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: MyWorkBench
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: Knowledge
    },
    {
      path: '/opensource',
      name: 'openSource',
      component: OpenSource
    },
    {
      path: '/socket.io',
      name: 'SocketIO',
      component: SocketIO
    },
    {
      path: '/intbird.net',
      name: 'IntbirdNet',
      component: IFramePage
    }
  ]
})
