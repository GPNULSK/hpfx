<template>
  <div>
    <div>
      <div style="width: 100%;height: 100px;background-color: #92b7c2;">
        <div>
          <span style="padding-top: 18px;margin-left: 15px">厂家代码：</span>
          <el-input size="mini" v-model="providerCode"  style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>

          <span style="padding-top: 18px;margin-left: 15px">厂家名称：</span>
          <el-input size="mini" v-model="providerName"  style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>

          <span style="padding-top: 18px;margin-left: 15px">物料编码：</span>
          <el-input size="mini" v-model="materialCode" style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>

          <span style="padding-top: 18px;margin-left: 15px">物料名称：</span>
          <el-input size="mini" v-model="materialName"  style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>
        </div>

        <div>

          <span style="padding-top: 18px;margin-left: 15px">来料档次：</span>
          <el-input size="mini" v-model="materialGrade" style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>

          <span style="padding-top: 18px;margin-left: 15px">批&nbsp;&nbsp;次&nbsp;&nbsp;号：</span>
          <el-input size="mini" v-model="batchCode" style="width: 8vw;margin-top: 15px" @keyup.enter.native="search"></el-input>

          <span style="margin-left: 15px">开始时间：</span>
          <el-date-picker
            size="mini"
            v-model="startDate"
            type="date"
            @keyup.enter.native="search"
            placeholder="开始日期" style="width: 8vw;margin-top: 15px">
          </el-date-picker>

          <span style="margin-left: 15px">截止时间：</span>
          <el-date-picker
            size="mini"
            v-model="endDate"
            type="date"
            @keyup.enter.native="search"
            placeholder="截止日期" style="width: 8vw;margin-top: 15px">
          </el-date-picker>

          <el-button size="mini" type="primary" style="margin-left: 50px" @click="search">查询</el-button>
          <el-button size="mini" type="primary" style="" @click="showAll">显示全部</el-button>
        </div>
      </div>

    </div>
    <el-container>
      <el-main>
        <template>
          <div style="padding-bottom: 10px">
            <el-button type="mini" @click="openForm(true)" style="margin-left: 10px">录入</el-button>
            <el-button type="mini">编辑负责人</el-button>
            <el-button type="mini" @click="toReturn">查看</el-button>
            <el-button type="mini" @click="export2Excel">导出</el-button>
            <a href="http://localhost:8081/downloadExcel"><el-button size="mini">下载模板</el-button></a>
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
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="curPage"
              :page-sizes="[10, 15, 20, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalAccount">
            </el-pagination>
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

<!--            <el-table-column label="是否退货"  >-->
<!--              <template slot-scope="scope">-->
<!--                <el-switch-->
<!--                  v-model="scope.row.testReturn"-->
<!--                  active-text="是"-->
<!--                  @change="changeRe(scope.$index,scope.row)"-->
<!--                  inactive-text="否">-->
<!--                </el-switch>-->
<!--              </template>-->

<!--            </el-table-column>-->
            <el-table-column
              prop="account"
              label="库存数量">
            </el-table-column>

            <el-table-column
              prop="returnAccount"
              label="退单数量">
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

<!--        录入框,引用了receiveForm这个页面-->
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

<!--        退单的隐藏表单-->
        <div>
          <el-dialog title="退单" width="40%" :close-on-click-modal="false" :show-close="false" top="10%" :visible.sync="returnForm">
            <el-form :model="formName"  ref="formName" style="margin-left: 70px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="厂家代码" prop="providerCode" >
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.providerCode"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="厂家名称" prop="providerName">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.providerName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row>
                <el-col :span="10">
                  <el-form-item label="批次号" prop="batchCode" style="letter-spacing: 0.3em;">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.batchCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="物料编码" prop="materialCode">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.materialCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="物料名称" prop="materialName">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.materialName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="来料档次" prop="materialGrade">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.materialGrade"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="物料状态" prop="status">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.status"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="接收时间" prop="arrivalDate">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.arrivalDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="padding-bottom: 1vh">
                <el-col :span="10">
                  <el-form-item label="接收人" prop="operator" style="letter-spacing: 0.3em;padding-right: -0.25em">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.operator"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="接收数量" prop="operator">
                    <el-input disabled  size="mini" style="width: 10vw" v-model="formName.account"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row style="padding-bottom: 1vh">
                <el-col :span="10">
                  <el-form-item label="累计退单" prop="returnAcc">
                    <el-input disabled size="mini" style="width: 10vw" v-model="formName.totalReturn" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="退单数量" prop="returnAcc">
                    <el-input   size="mini" style="width: 10vw" v-model="returnAccount" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button size="normal" style="margin-left: 10vw" @click='returnForm=false' ref="close">取消</el-button>

                <el-button size="normal" @click="submitReturnForm('formName')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>

      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-sizes="[2,10, 15, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalAccount">
        </el-pagination>
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
      providerName:'',
      materialName:'',
      batchCode:'',
      value1:true,
      totalAccount:0,
      pageSize:10,
      curPage:1,
      startDate:'',
      endDate:'',
      searching:false,  //根据这个标志来控制下一页加载的是查询的结果还是不查询的结果
      returnForm:false, //控制退货视窗显示
      returnAccount:0,  //退货数量
      returnId:'',      //需要退单的id
      curRow:[],        //表格中被选中的行
      formName:{
        providerCode:'',
        providerName:'',
        batchCode:'',
        materialCode:'',
        materialName:'',
        materialGrade:'',
        status:'',
        arrivalDate:'',
        operator:'',
        account:0,
        totalReturn:0
      },  //表单值

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
      if (row != '' && row !=null){
        this.curRow = row[0]
        this.returnId = row[0].id
      }


    },
/*------------------el-table相关方法结束-----------------------------*/


 /*----------------功能按钮方法----------------*/
    //搜索
    search(){
      let date1=this.$moment(this.startDate).utcOffset(480).format("YYYY-MM-DD")
      let date2=this.$moment(this.endDate).utcOffset(480).format("YYYY-MM-DD")
      console.log(date1)
      console.log(date2)
      if (date1 === 'Invalid date'){
        date1='';
      }
      if (date2 === 'Invalid date'){
        date2='';
      }

      this.axios('http://localhost:8081/search',{
        method:'POST',
        params: {
          providerCode:this.providerCode,
          providerName:this.providerName,
          materialCode:this.materialCode,
          materialName:this.materialName,
          materialGrade:this.materialGrade,
          batchCode:this.batchCode,
          startDate:date1,
          endDate:date2,
          curPage:this.curPage,
          pageSize:this.pageSize
        }
      }).then(res=>{
        this.tableData = res.data.result;
        this.totalAccount = res.data.account
        this.searching = true;
      })
    },


    showAll(){  //搜索完后需要显示全部的方法
      this.loadTableDate()
      this.searching=false
    },

    toReturn(){   //跳转到退货的视窗
      this.returnForm = true;
      this.formName.providerCode=this.curRow.providerCode;
      this.formName.providerName=this.curRow.providerName;
      this.formName.batchCode=this.curRow.batchCode;
      this.formName.materialCode=this.curRow.materialCode;
      this.formName.materialName=this.curRow.materialName;
      this.formName.status=this.curRow.status;
      this.formName.arrivalDate=this.curRow.arrivalDate;
      this.formName.operator=this.curRow.operator;
      this.formName.account=this.curRow.account;
      this.formName.materialGrade=this.curRow.materialGrade;
      this.formName.totalReturn=this.curRow.returnAccount;
    },

    submitReturnForm(){

      console.log(this.curRow.account)
      if (this.returnAccount>(this.curRow.account-this.curRow.returnAccount)){
        this.$message.error('退货数量超过可退货数量')
        return;
      }
      this.axios({
        method:'POST',
        url:'http://localhost:8081/returnOrder',
        params:{
          id:this.returnId,
          account:this.returnAccount
        }
      }).then(res=>{
        if (res.data === 'success'){
          this.$message.success('退单成功')
          this.returnForm =false
          this.loadTableDate()
        }else if (res.data === 'fail'){
          this.$message.error('退单失败')
        }
      }).catch(res=>{
        console.log(res)
        alert('系统出现异常')
      })
    },


/*------------------功能按钮方法结束----------------------*/

/*------------分页相关的方法-----------------------*/
    //更改每页的大小
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.searching){
        this.search();
      }
      else{
        this.loadTableDate()
      }
    },

    //更改当前页方法
    handleCurrentChange(val) {
      this.curPage = val;
      if (this.searching){
        this.search();
      }else {
        this.loadTableDate();
      }

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


    /*-------------vuex方法-----------------*/
    ...mapActions(
      ['openForm','flushTable','noFlush'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
    ),
  },

/*-------------vuex相关操作--------------------*/



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
          this.$store.commit('noFlush',false)
        })
      };
    },

    returnAccount(val){
      this.returnAccount=val.replace
      if (val === 0 || val === '0' || val === '') {
        return ''
      } else {

        let value = null
        value = String(val).replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
        this.returnAccount=value;
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
