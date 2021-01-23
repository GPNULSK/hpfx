<template>
  <div>

    <el-container>
      <el-header style="padding: 0">
        <div style="width: 100%;height: 100%;background-color: aqua;text-align: center">
          <span style="display: inline-block;vertical-align: middle;padding-top: 18px">测试数据</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="17vw" style="background-color: bisque;text-align: center;padding: 0;">

          <h2>来料数据</h2>

          <el-row>
            <el-col :span="6">分选机位:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br>

          <el-row>
            <el-col :span="6">厂家编码:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br>

          <el-row>
            <el-col :span="6">物料编码:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br>

          <el-row>
            <el-col :span="6">来料档次:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br>

          <el-row>
            <el-col :span="6">来料数量:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br>

          <el-row>
            <el-col :span="6">满盒数:</el-col>
            <el-col :span="18"><el-input size="mini" v-model="fxPosition" value="分选机我" style="width: 90%"></el-input></el-col>
          </el-row><br><br>



          <el-button size="normal" type="primary">扫码更新信息</el-button><br><br>
          <el-button size="normal" type="info">手工录入（返修用）</el-button>

        </el-aside>
        <el-container>
          <el-main>

            <template>
              <el-table
                :data="tableData"
                style="width: 100%"
              height="80vh">

                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>

                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>

                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>

                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>


                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>


                <el-table-column
                  prop="date"
                  label="分选档次">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="数量">
                </el-table-column>


                <!--        通过v-model响应式绑定数据，直接修改table中的属性值      -->

                <el-table-column prop="remark" label="备注">
                  <template slot-scope="{row, $index}">
                    <div @click.stop="changeNum($index,'editRemarkInput')">
                      <el-input
                        v-if="editable[$index]"
                        v-model="row.remark"
                        size="mini"
                        class="editRemarkInput">
                      </el-input>
                      <span v-else>{{row.remark}}</span>
                    </div>
                  </template>
                </el-table-column>

              </el-table>
            </template>


          </el-main>
          <el-footer>
            <div style="text-align: center">
              <el-button size="mini">报工送总装</el-button>
              <el-button size="mini">手动入库</el-button>
              <el-button size="mini">修改滑片档次模板</el-button>
              <el-button size="mini">报工</el-button>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>


  </div>
</template>

<script>
export default {
  name: "MyTable",
  data(){
    return{

      fxPosition:'',
      editable:'',

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        remark:'测试'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        remark:'测试'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },{
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        remark:'测试'
      },]
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
  }
}
</script>

<style scoped>

header .el-header {
  padding: 0;
}

.el-aside {
  background-color: bisque;
  height: 93vh;
}

</style>
