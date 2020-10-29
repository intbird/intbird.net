<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu ref="menu" id="menu"
                 mode="horizontal" @select="handleSelect"
                 text-color="#fff"
                 background-color="#3E3F43"
                 active-text-color="#4299F0">

          <el-menu-item v-for="(item, index) in myApp.Menus"
                        :key="myApp.Key+index"
                        :index="myApp.Key+index">
            {{item.title}}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import startWith from './utils/StringUtils'

  const axios = require('axios')
  export default {
    name: 'App',
    components: {},
    data () {
      return {
        myApp: {
          Key: '1-',
          title: 'app bar',
          Menus: [
            {title: 'Workbench', route: '/workbench'},
            {title: 'Knowledge', route: '/knowledge'},
            {title: 'Keynotes', route: '/opensource'},
            {title: 'socket.io', route: '/socket.io'},
            {title: 'intbird.net', route: '/intbird.net?url=https://www.intbird.net'},
          ],
        },
      }
    },
    created () {
      this.addVisitor('app')
    },
    methods: {
      addVisitor(from) {
        axios.get(this.ConnectionUrl + '/visitor?from=' + from)
          .then(function () {
            console.log('thanks 访问 +1')
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      getSelect(selectKeyPath, arrayKey, array) {
        if (startWith(selectKeyPath, arrayKey)) {
          const index = selectKeyPath.toString().replace(arrayKey, '')
          if (index >= 0 && index < array.length) {
            return array[index]
          }
        }
      },
      handleSelect(key, keyPath) {
        // app menu
        const appMenuItem = this.getSelect(key, this.myApp.Key, this.myApp.Menus)
        if (appMenuItem) {
          const routUrl = appMenuItem.route
          if (routUrl) {
            this.$router.push(routUrl)
          }
        }
        // contact menu
        const contactItem = this.getSelect(key, this.myBlog.Key, this.myBlog.Menus)
        if (contactItem) {
          const linkUrl = contactItem.url
          if (linkUrl) {
            if (linkUrl === "intbird@163.com") {
              window.location = "mailto:intbird@163.com?subject=hello intbird&body=hello:intbird";
            } else {
              window.open(linkUrl, '_blank')
            }
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "assets/css/navbar-style";

  #app {
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;

    display: flex;
    align-items: flex-start;
    text-align: center;
    flex-direction: column;
    justify-content: center;
  }

  #menu {
    width: 100%;
    margin-bottom: 20px;
    border: #606266;
  }
</style>
