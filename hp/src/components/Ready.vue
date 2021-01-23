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
          <el-button size="mini" type="primary" style="margin-top: 15px;float: right;margin-right: 10px">显示全部</el-button>
        </div>
      </el-header>
      <el-main>

        <template>
          <div style="padding-bottom: 10px">
            <el-button type="mini" @click="openForm(true)" style="margin-left: 10px">录入</el-button>
            <el-button type="mini">编辑负责人</el-button>
            <el-button type="mini">查看</el-button>
            <el-button type="mini">导出</el-button>
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
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            style="width: 100%"
            height="75vh"
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
<!--            <el-table-column-->
<!--              prop="isReturn"-->
<!--              label="是否退货">-->
<!--            </el-table-column>-->
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
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
      value1:true
    }
  },
  methods: {
    //删除按钮触发的方法
    handleDelete(index,row){
      this.$confirm('是否永久删除此数据','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消'
      }).then(()=>{
        this.$message.success('删除成功')
      }).catch(()=>{
        this.$message.success('已取消删除')
      })
    },
    handleSelectionChange(val){
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    ...mapActions(
      ['openForm','flushTable','noFlush'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
    ),

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

    uploadSuccess(response, file, fileList) {
      if (response) {
        console.log(response)
        console.log(file)
        alert("文件导入成功");
      } else {
        console.log(response)
        console.log(file)
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
      })
    },

    loadTableDate(){
      this.axios({
        url:'http://localhost:8081/findAll'
      }).then(res=>{
       if (res.data == 'success'){
         this.$message.success('退货状态修改成功')
       }
        this.tableData = res.data

      })
    }

  },


  computed: {
    ...mapGetters(['flag']),// 动态计算属性，相当于this.$store.getters.resturantNam
    //...mapGetters(['isFlush']),
    isFlush:function (){
      this.flushFlag = this.$store.getters.isFlush
      return this.$store.getters.isFlush
    }
  },
  watch:{
    isFlush(val){
      if (val){
        this.axios({
          url:'http://localhost:8081/findAll'
        }).then(res=>{

          this.tableData = res.data
          let e = document.createEvent('MouseEvent');
          e.initEvent('click', false, false);
          this.$refs.noFlush.$el.dispatchEvent(e);
        })
      }
    }
  },
  created() {
    this.axios({
      url:'http://localhost:8081/findAll'
    }).then(res=>{
      this.tableData = res.data

    })
  }
}
</script>

<style scoped>

.el-header{
  background-color: azure;
}

</style>
