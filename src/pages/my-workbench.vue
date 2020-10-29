<template>
  <div class="root-layout"
       v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.2)">
    <div class="item" v-for="(item,index) in workbenchConfigs" :key="index">
      <span class="item-title-style">{{item.groupTitle}}</span>
      <el-row :gutter="8" class="item-content-style">
        <el-col class="item-col" :span="3" v-for="(item, index) in item.groupConfig" :key="item.name+index">
          <el-card shadow="hover" :body-style="{background: cardBackground}">
            <el-image class="image" :src="item.image" fit="contain"></el-image>
            <el-button class="title" type="info" round v-on:click="cardClick(item)">{{item.name}}</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  const axios = require('axios')

  export default {
    name: "MyWorkBench",
    data() {
      return {
        loading: true,
        cardBackground: `#444444`,
        workbenchConfigs: []
      }
    },
    created() {
      this.queryConfigs()
    },
    methods: {
      openUrl(url) {
        window.open(url, '_blank');
      },
      queryConfigs() {
        axios.get(this.ConnectionUrl + '/workbenchConfigs')
          .then(response => {
            this.loading = false;
            this.workbenchConfigs = response.data
          })
          .catch(function (error) {
            console.log('queryConfigs', error)
          })
          .finally(function () {
          })
      },
      cardClick(item) {
        console.log(item.link)
        this.openUrl(item.link)
      }
    }
  }
</script>

<style scoped>
  .root-layout {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    width: 1268px;
    min-height: 800px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .item-title-style {
    margin-top: 5px;
    color: #cf9236;
    text-align: left;
    width: 100%;
  }

  .item-content-style {
    padding: 8px;
    margin-bottom: 12px;
  }

  .item-col {
    margin: 5px
  }

  .title {
    margin-top: 10px;
    background: #666666;
  }

  .image {
    width: 88px;
    height: 88px;
    border-radius: 50%;
  }

</style>
