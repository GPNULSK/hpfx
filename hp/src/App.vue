<template>
  <div id="app">
    <template>

      <el-container>
        <!--      header显示导航栏-->
        <el-header>
          <img src="./assets/images/love.png" style="float: left;">
          <div class="nav_menu" style="height: 100%;z-index: 10;padding-left: 250px">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b" >
              <img src="./assets/images/logout.png" title="退出" style="float: right;width: 30px;margin-top: 14px;margin-right: 50px;cursor: pointer">

              <p class="uname">用户名</p>
              <img class="user_icon" src="./assets/images/userIcon.png">
            </el-menu>

          </div>
        </el-header>
        <!--      header导航栏end-->

        <el-container>
          <!--        aside显示侧边栏-->
          <el-aside width="14vw">
            <div class="nav_upright">
              <div style="height: 100%">
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  :router="f1"
                  active-text-color="#ffd04b" style="height: 100%">


                  <el-menu-item index="table">
                    <i class="el-icon-s-home"></i>
                    <span slot="title" @click="toTable">分选</span>
                  </el-menu-item>


                  <el-menu-item index="3">
                    <i class="el-icon-upload"></i>
                    <span slot="title">分选报工</span>
                  </el-menu-item>


                  <el-menu-item index="5">
                    <i class="el-icon-menu"></i>
                    <span slot="title">中间库库存查询</span>
                  </el-menu-item>


                  <el-menu-item index="6">
                    <i class="el-icon-menu"></i>
                    <span slot="title">备料清单</span>
                  </el-menu-item>

                  <el-menu-item index="7">
                    <i class="el-icon-menu"></i>
                    <span slot="title">入库管理</span>
                  </el-menu-item>


                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>来料管理</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="1-1" @click="toReady">备料清单</el-menu-item>
                      <el-menu-item index="1-2">入库管理</el-menu-item>
                      <el-menu-item index="1-3" @click="toTest">测试</el-menu-item>
                    </el-menu-item-group>

                  </el-submenu>

                </el-menu>

              </div>
            </div>
          </el-aside>
          <!--aside侧边栏end-->

          <!--        main区域-->
          <el-main style="height: 100vh;padding: 0;margin: 0">
            <!--    引入MyTable 页面      -->
            <router-view v-wechat-title="$route.meta.title"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </template>



  </div>
</template>

<script>
export default {
  name: 'App',

  data(){
    return{
      f1:true,
    }
  },

  methods: {
    changeNum(index, className) {

      //设置是否可以编辑
      // tableList为表格数据
      this.editable = new Array(this.tableData.length);

      this.editable[index] = true;

      this.$set(this.editable, index, true);
      //让input自动获取焦点
      this.$nextTick(function () {
        let editInputList = document.getElementsByClassName(className);
        editInputList[0].children[0].focus();
      });
    },

    toReady(){
      this.$router.replace('/ready')
    },
    toTable(){
      this.$router.replace('/table')
    },
    toTest(){
      this.$router.replace('/test')
    }

  },
}
</script>

<style>

/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*-webkit-font-smoothing: antialiased;*/
/*-moz-osx-font-smoothing: grayscale;*/
/*text-align: center;*/
/*color: #2c3e50;*/

html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}


/*body > .el-container {*/
/*  margin-bottom: 40px;*/
/*}*/

.user_icon{
  float: right;
  width: 30px;
  margin-top: 14px;
  margin-right: 2px;
  cursor: pointer;
}
.uname{
  float: right;
  margin-right: 20px;
  cursor: pointer;
  color: rgb(244, 245, 215);
  text-align: center;
}



/*.el-container {*/
/*  padding: 0;*/
/*}*/

/*header.el-header {*/
/*  margin-top: -10px;*/
/*  padding: 0;*/
/*}*/

/*header.el-aside {*/
/*  padding: 0;*/
/*  height: 100vh;*/
/*}*/

/*main.el-main {*/
/*  height: 100vh;*/
/*  padding: 0;*/
/*}*/

.el-aside {
  background-color: rgb(84, 92, 100);
  height:100vh;
}

.el-header {
  background-color: rgb(84, 92, 100);
}
.el-menu.el-menu--horizontal{
  height: 100%;
}

</style>
