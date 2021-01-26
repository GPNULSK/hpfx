<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <div style="width: 100%;height: 100%;background-color: #92b7c2;">
          <span style="padding-top: 18px;float: left;margin-left: 15px">厂家代码：</span>
          <el-input size="mini" v-model="providerCode"  style="float: left;width: 8vw;margin-top: 15px"></el-input>

          <span style="padding-top: 18px;float: left;margin-left: 10px">物料编码：</span>
          <el-input size="mini" v-model="materialCode" style="float: left;width: 8vw;margin-top: 15px"></el-input>

          <span style="padding-top: 18px;float: left;margin-left: 10px">来料档次：</span>
          <el-input size="mini" v-model="materialGrade" style="float: left;width: 8vw;margin-top: 15px"></el-input>

          <span style="padding-top: 18px;float: left;margin-left: 10px">批次号：</span>
          <el-input size="mini" v-model="batchCode" style="float: left;width: 8vw;margin-top: 15px"></el-input>

          <el-button size="mini" type="primary" style="margin-top: 15px;float: right;margin-right: 50px" @click="search">查询</el-button>
          <el-button size="mini" type="primary" style="margin-top: 15px;float: right;margin-right: 10px" @click="showAll">显示全部</el-button>
        </div>
      </el-header>
      <el-main>

        <template>
          <div style="padding-bottom: 10px">
            <el-button type="mini" @click="openForm(true)" style="margin-left: 10px">录入</el-button>
            <el-button type="mini">编辑负责人</el-button>
            <el-button type="mini">查看</el-button>
            <el-button type="mini" @click="export2Excel">导出</el-button>
            <a href="http://localhost:8081/exportToExcel"><el-button size="mini">导出</el-button></a>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="http://localhost:8081/uploadExcel"
              name="excelFile"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-error="uploadFalse"
              :on-success="uploadSuccess"
              :auto-upload="true"
              :before-upload="beforeAvatarUpload" style="float: left">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </div>

          <el-table
            :data="tableData"
            border
            id="out-table"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%"
            height="75vh"
            @select="selectRow"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="id" v-if="false">
            </el-table-column>
            <el-table-column
              prop="providerCode"
              label="厂家代码">
            </el-table-column>
            <el-table-column
              prop="providerName"
              label="厂家名称">
            </el-table-column>
            <el-table-column
              prop="batchCode"
              label="批次号">
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料编码">
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称">
            </el-table-column>
            <el-table-column
              prop="materialGrade"
              label="来料档次">
            </el-table-column>
            <el-table-column
              prop="status"
              label="物料状态">
            </el-table-column>
            <el-table-column
              prop="arrivalDate"
              label="接收时间">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="接收人">
            </el-table-column>

            <el-table-column label="是否退货"  >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.testReturn"
                  active-text="是"
                  @change="changeRe(scope.$index,scope.row)"
                  inactive-text="否">
                </el-switch>
              </template>

            </el-table-column>
            <el-table-column width="100vw" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

<!--        录入框-->
        <div >
          <el-dialog
            title="接收入库"
            width="40%"
            :close-on-click-modal="false"
            :show-close="false"
            top="10%"
            :visible.sync="flag">
            <ReceiveForm/>
          </el-dialog>

        </div>

      </el-main>
      <el-footer>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 15, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalAccount">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import ReceiveForm  from "./ReceiveForm";
import {mapActions, mapGetters} from 'vuex'
import XLSX from 'xlsx'

export default {
  name: "Ready",
  components: {ReceiveForm},
  data() {
    return {
      tableData: [],
      currentPage4:1,
      formVisible:true,
      flag1:true,
      flushFlag:false,
      providerCode:'',
      materialCode:'',
      materialGrade:'',
      batchCode:'',
      value1:true,
      totalAccount:0,
      pageSize:10,
      curPage:1

    }
  },
  methods: {
/*------------------表格点击的方法-------------------*/
    //删除按钮触发的方法
    handleDelete(index,row){
      this.$confirm('是否永久删除此数据','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(()=>{
        this.axios('http://localhost:8081/delete',{
          params:{
            id:row.id
          }
        }).then(res=>{
          if (res.data == 'success'){
            this.$message.success('删除成功')
            this.loadTableDate();
          }else {
            this.$message.error('删除失败')
          }
        })
      }).catch(()=>{
        this.$message.success('已取消删除')
      })
    },

    //当选择项发生变化时会触发该事件
    handleSelectionChange(val){
      //当选择项发生变化时会触发该事件
    },
    //当用户手动勾选数据行的 Checkbox 时触发的事件
    selectRow(row){

    },
/*------------------el-table相关方法结束-----------------------------*/


 /*----------------功能按钮方法----------------*/
    //搜索
    search(){
      this.axios('http://localhost:8081/search',{
        params: {
          providerCode:this.providerCode,
          materialCode:this.materialCode,
          materialGrade:this.materialGrade,
          batchCode:this.batchCode
        }
      }).then(res=>{
        this.tableData = res.data
      })
    },

    //更改退货状态
    changeRe(index,row){
      this.axios('http://localhost:8081/changeStatus',{
        params:{
          id:row.id,
          testReturn:row.testReturn
        }
      }).then(res=>{
        if (res.data== 'success'){
          this.$message.success('退货状态修改成功')
        }
        this.loadTableDate()
      }).catch(res=>{
        console.log(row.testReturn)
        this.$message.error('状态修改失败')
        if (row.testReturn == false){
          row.testReturn = true;
        }else if (row.testReturn == true){
          row.testReturn = false;
        }
      })
    },

/*------------------功能按钮方法结束----------------------*/

/*------------分页相关的方法-----------------------*/
    //更改每页的大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadTableDate()
    },

    //更改当前页方法
    handleCurrentChange(val) {
      this.curPage = val;
      this.loadTableDate()
    },
/*--------分页相关操作结束----------------*/


/*------文件上传相关方法-----------*/
    //文件上传成功的回调函数
    uploadSuccess(response, file, fileList) {
      if (response) {
        alert("文件导入成功");
        this.loadTableDate()
      } else {
        alert("文件导入失败");
      }
    },
    uploadFalse(response, file, fileList) {
      alert("文件上传失败！");
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";

      if (!extension && !extension2 ) {
        alert("上传模板只能是 xls、xlsx 格式!");
      }
      return extension || extension2;
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      if (file.response.status) {
        alert("此文件导入成功");
      } else {
        alert("此文件导入失败");
      }
    },
/*----------文件上传操作方法结束---------------*/


/*-------------公共加载页面数据条数，根据当前分页设定----------*/
    loadTableDate(){
      this.axios({
        url:'http://localhost:8081/findAll',
        params: {
          curPage:this.curPage,
          pageSize:this.pageSize
        }
      }).then(res=>{
        this.tableData = res.data
      })
      this.axios('http://localhost:8081/totalAccount').then(res=>{
        this.totalAccount = res.data
      })
    },
/*--------------公共函数结束------------------------*/
    //   点击按钮  导出excel表格：
    export2Excel: function () {
      let tables = document.getElementById("out-table");
      let table_book = this.$XLSX.utils.table_to_book(tables);
      var table_write = this.$XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        this.$FileSaver.saveAs(
          new Blob([table_write], {type: "application/octet-stream"}),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    },
    showAll(){

    }
  },

/*-------------vuex相关操作--------------------*/
  ...mapActions(
    ['openForm','flushTable','noFlush'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
  ),

  computed: {
    ...mapGetters(['flag']),// 动态计算属性，相当于this.$store.getters.resturantNam
    //...mapGetters(['isFlush']),
    isFlush:function (){
      this.flushFlag = this.$store.getters.isFlush
      return this.$store.getters.isFlush
    }
  },
/*-------------vuex相关操作结束----------------------*/

  /*-------监听receiveForm页面的提交按钮，提交成功之后刷新---------*/
  watch:{
    isFlush(val){
      if (val){
        this.axios({
          url:'http://localhost:8081/findAll',
          params:{
            curPage:this.curPage,
            pageSize:this.pageSize
          }
        }).then(res=>{
          this.tableData = res.data
          let e = document.createEvent('MouseEvent');
          e.initEvent('click', false, false);
          this.$refs.noFlush.$el.dispatchEvent(e);
        })
      }
    }
  },
/*------------页面加载完成时获取表格数据和分页数据------------------*/
  created() {
    //获取table数据
    this.axios({
      url:'http://localhost:8081/findAll',
      params: {
        curPage:this.curPage,
        pageSize:this.pageSize
      }
    }).then(res=>{
      this.tableData = res.data
    }).catch(res=>{
      this.$message.error('加载数据失败')
    });

    this.axios('http://localhost:8081/totalAccount').then(res=>{
      this.totalAccount = res.data
    })
  }
}
</script>

<style scoped>

.el-header{
  background-color: azure;
}

</style>
