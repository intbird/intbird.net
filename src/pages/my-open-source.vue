<template>
  <div class="root-layout">
    <el-row style="margin-top: 20px;position: fixed;bottom: 200px;left:120px">
      <el-button style="background: #4d5669; border: 1px solid #444444" icon="el-icon-arrow-up" circle
                 onclick="window.scrollTo(0,0)"></el-button>
    </el-row>
    <el-container>
      <el-aside width="260px">
        <el-row class="menu-style">
          <el-col>
            <el-menu
              v-loading="loading"
              element-loading-background="rgba(0, 0, 0, 0.2)"
              ref="menu"
              class="menu-layout"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"
              :unique-opened="true"
              text-color="#fff"
              background-color="#3E3F43"
              active-text-color="#4299F0">
              <div v-for="(groupItem, index) in pageData" :key="index">
                <div v-for="(item,index) in groupItem.item" :key="(groupItem.key)+index">
                  <SubMenuGroup v-if="item.menus" :menu-config="item" :menu-index="groupItem.key+index"/>
                  <SubMenuSingle v-else :menu-config="item" :menu-index="groupItem.key+index"/>
                </div>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="markdown">
        <mavon-editor style="min-height: 600px" defaultOpen="preview" :subfield="false" v-model="markdownContent"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import SubMenuGroup from '../components/summenu/SubMenuGroup'
  import SubMenuSingle from '../components/summenu/SubMenuSingle'
  import startWith from "../utils/StringUtils";

  const axios = require('axios')
  const Base64 = require('js-base64').Base64

  const ROUTE_KEYS = {
    experience:'experience'
  }

  const markdownDefault = '##### 持续开发中...\n' +
    '\n' +
    '1. 项目经历\n' +
    '># [部分改造经历 -> 总览](http://intbird.world/#/opensource?action=experience)\n' +
    '\n' +
    '\n' +
    '2. 开源平台\n' +
    '># [CSDN](https://blog.csdn.net/intbird)\n' +
    '># [GitLab](https://gitlab.com/intbird)\n' +
    '># [Github](https://github.com/intbird)\n';

  export default {
    name: 'OpenSourcePage',
    components: {SubMenuGroup, SubMenuSingle},
    data() {
      return {
        loading: true,
        markdownId: 0,
        markdownContent: markdownDefault,

        pageData: {
          personal: {
            key: 'personal',
            item: [{
              icon: 'el-icon-lock',
              title: '部分改造经历',
              menus: [],
            },
              {
                icon: 'el-icon-dish',
                title: '部分快捷代码',
                menus: [],
              }, {
                icon: 'el-icon-document',
                title: '部分随手笔记',
                menus: [],
              }],
          },

          published: {
            key: 'published',
            item: [{
              icon: 'el-icon-s-promotion',
              title: 'SocketIO Control',
              menus: [],
            },
              {
                icon: 'el-icon-upload',
                title: 'Maven Publish',
                menus: [],
              },
              {
                icon: 'el-icon-video-play',
                title: 'Media Player',
                menus: [],
              }, {
                icon: 'el-icon-house',
                title: 'This Website',
                menus: [],
              },
              {title: 'CSDN', url: 'https://blog.csdn.net/intbird'},
              {title: 'Gitlab', url: 'https://gitlab.com/intbird'},
              {title: 'GitHub', url: 'https://github.com/intbird'}],
          }
        }
      }
    },
    created() {
      this.queryConfigs()
      this.addVisitor('opensrouce')
    },
    mounted() {
      this.parserQuery();
    },
    watch: {
      markdownContent: function (newValue, oldValue) {
        if (!newValue) {
          this.markdownContent = markdownDefault
        }
      }
    },
    methods: {
      parserQuery() {
        const querySets = this.$route.query
        if (!querySets) {
          return
        }
        if (querySets.action) {
          // 打开总览
          if (querySets.action === ROUTE_KEYS.experience) {
             this.queryMarkdown('1',{})
             // this.$refs.menu.open("personal0");
          }
        }
      },
      addVisitor(from) {
        axios.get(this.ConnectionUrl + '/visitor?from=' + from)
          .then(function () {
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      queryConfigs() {
        // open source
        axios.get(this.ConnectionUrl + '/openSource')
          .then(response => {
            this.loading = false
            if (response && response.data) {
              this.pageData.personal.item[0].menus = response.data
            }
          })
          .catch(function (error) {
          })
          .finally(function () {
          })

        // simple code
        axios.get(this.ConnectionUrl + '/simpleCode')
          .then(response => {
            this.loading = false
            if (response && response.data)
              this.pageData.personal.item[1].menus = response.data
          })
          .catch(function (error) {
          })
          .finally(function () {
          })

        // keynotes
        axios.get(this.ConnectionUrl + '/keynotes')
          .then(response => {
            this.loading = false
            if (response && response.data)
              this.pageData.personal.item[2].menus = response.data
          })
          .catch(function (error) {
          })
          .finally(function () {
          })

        // published
        axios.get(this.ConnectionUrl + '/published')
          .then(response => {
            this.loading = false
            if (response && response.data)
              this.pageData.published.item = response.data
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      queryMarkdown(id, callback) {
        this.loading = true
        this.markdownId = id;
        axios.get(this.ConnectionUrl + '/markdown?id=' + id)
          .then(response => {
            if (response && response.data) {
              this.loading = false
              const id = response.data.id;
              const markdown = response.data.markdown;
              if (this.markdownId.toString() === id.toString()) {
                this.markdownContent = Base64.decode(markdown)
                if (callback) callback(id, markdown)
              } else {
                this.markdownContent = '获取文档异常,请联系作者发送反馈'
              }
            } else {
              this.markdownContent = ""
            }
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      handleOpen(elKey, keyPath) {
      },
      handleSelect(elKey, keyPath) {
        for (let item in this.pageData) {
          this.handleSelectItem(elKey, this.pageData[item].key, this.pageData[item].item);
        }
      },
      handleSelectItem(elKey, configKey, configItems) {
        // SubMenu :index="menuIndex+'-'+index"
        const key = elKey.replace(configKey, '');
        if (key.indexOf('-') === -1) {
          const itemIndex = parseInt(key)
          const item = configItems[itemIndex]
          if (item && item.url) {
            window.open(item.url, '_blank')
          }
        } else {
          const indexArray = key.split('-')
          const itemIndex = parseInt(indexArray[0])
          const menuIndex = parseInt(indexArray[1])
          // menu  { icon: '', title: '', url: '', menus:[ id:'', title:'',url:"" , mkid:'', markdown:""]}
          // url -> mkid -> markdown
          const item = configItems[itemIndex]
          if (!item) return
          if (item.hasOwnProperty('url') && item.url) {
            window.open(item.url, '_blank')
          } else if (item.hasOwnProperty('menus') && item.menus) {
            const menuItem = item.menus[menuIndex]
            if (menuItem.url) {
              window.open(menuItem.url, '_blank')
            } else if (menuItem.mkid) {
              if (menuItem.markdown && menuItem.markdown.length > 0) {
                this.markdownContent = Base64.decode(menuItem.markdown)
              } else {
                this.queryMarkdown(menuItem.mkid, (id, markdown) => {
                  if (id && markdown && id.toString() === menuItem.mkid.toString()) {
                    menuItem.markdown = markdown
                  }
                })
              }
            } else if (menuItem.markdown) {
              this.markdownContent = Base64.decode(menuItem.markdown)
            }
          }
        }
      },
      handleClose(key, keyPath) {
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/navbar-style";

  .root-layout {
    display: flex;
  }

  .menu-style {
  }

  .menu-layout {
    align-items: flex-start;
    text-align: left;
    border: #515a6e
  }

  .group-title {
    color: #C5C5C5;
  }

  .markdown {
    padding-top: 0;
    padding-right: 0;
    min-width: 800px;
    min-height: 800px;
  }

</style>
