<template>
  <div>
    <el-form :model="formName"  :rules="rules" ref="formName">
      <el-row>
        <el-col :span="10">
          <el-form-item label="厂家代码" prop="providerCode" >
            <el-input size="mini" style="width: 10vw" v-model="formName.providerCode"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="厂家名称" prop="providerName">
            <el-input size="mini" style="width: 10vw" v-model="formName.providerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="批次号" prop="batchCode" style="letter-spacing: 0.3em;">
            <el-input size="mini" style="width: 10vw" v-model="formName.batchCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物料编码" prop="materialCode">
            <el-input size="mini" style="width: 10vw" v-model="formName.materialCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="物料名称" prop="materialName">
            <el-input size="mini" style="width: 10vw" v-model="formName.materialName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来料档次" prop="materialGrade">
            <el-input size="mini" style="width: 10vw" v-model="formName.materialGrade"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="物料状态" prop="status">
            <el-input size="mini" style="width: 10vw" v-model="formName.status"></el-input>
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
          <el-form-item label="接收数量" prop="operator" style="">
            <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" size="mini" style="width: 10vw" v-model="formName.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button size="normal" style="margin-left: 10vw" @click="closeForm(false)" ref="close">取消</el-button>

        <el-button @click="resetForm('formName')">重置</el-button>
        <el-button size="normal" @click="submitForm('formName')">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// import {closeForm} from "../store/actions";


export default {

  name: "ReceiveForm",
  data(){
    return{
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
        account:'',
        username:'',
        employeeId1:'',
      },
      rules:{
        providerCode: [{ required: true, message: '请输入客户代码', trigger: 'blur' },],
        providerName: [{ required: true, message: '请输入客户名称', trigger: 'blur' },],
        batchCode: [{ required: true, message: '请输入来料档次', trigger: 'blur' },],
        materialCode: [{ required: true, message: '请输入物料编码', trigger: 'blur' },],
        materialName: [{ required: true, message: '请输入物料名称', trigger: 'blur' },],
        materialGrade: [{ required: true, message: '请输入来料档次', trigger: 'blur' },],
        status: [{ required: true, message: '请输入物料状态', trigger: 'blur' },],
        arrivalDate: [{ required: true, message: '请输入到达时间', trigger: 'blur' },],
        operator: [{ required: true, message: '请输入操作人姓名', trigger: 'blur' },],
       },
    }
  },
  methods: {
    ...mapActions(
      ['closeForm','flushTable'], // 相当于this.$store.dispatch('modifyName'),提交这个方法
    ),


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    submitForm(formName) {
      console.log('submit begin')

      let formData = new FormData();
      for(let key in this.formName){
        formData.append(key,this.formName[key]);
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            method: "POST",
            url:'http://localhost:8081/record',
            //
            // headers: {
            //   "Content-Type": "application/json"
            // },
            // withCredentials:true,
            data:formData,
          }).then(res=>{
            console.log(res.data)
            if(res.data == 'SUCCESS'){

              let e = document.createEvent('MouseEvent');
              e.initEvent('click', false, false);
              this.$refs.close.$el.dispatchEvent(e);
              this.$message({
                message:'录入成功',
                type:'success'
              })

              this.formName.materialGrade = null;
              this.formName.account = null;
              this.formName.materialName = null;
              this.formName.materialCode = null;
              this.formName.providerName = null;
              this.formName.providerCode = null;
              this.formName.batchCode = null;
              this.formName.status = null;

              this.$store.commit('flushTable',true)
              // let e1 = document.createEvent('MouseEvent');
              // e1.initEvent('click', false, false);
              // this.$refs.flushT.$el.dispatchEvent(e1);
            }else {
              this.$message.error('录入失败')
            }
          })

          // let e = document.createEvent('MouseEvent');
          // e.initEvent('click', false, false);
          // this.$refs.close.$el.dispatchEvent(e);

        } else {
          this.$notify.error({
            title: '请注意',
            message: '录入失败'
          });
          return false;
        }
      });
    },

  },

  computed: {
    ...mapGetters(['flag']) ,// 动态计算属性，相当于this.$store.getters.resturantName
    ...mapGetters(['isFlush'])
  },

  watch:{

  },

  mounted() {
    //获取当前时间
    let _this = this;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth()+1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    this.formName.arrivalDate = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;

  },
  created() {
    this.username = sessionStorage.getItem('username');
    this.employeeId1 = this.employeeId;
    this.formName.operator = sessionStorage.getItem('username')

  }

}
</script>

<style scoped>


.el-form-item label {
  width: 5em;
}

.span_left{
  width: 4em;
}

.el-input {
  padding-left: 10px;
}

.btn_div {

}

</style>
