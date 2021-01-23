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
          <el-form-item label="接收时间" prop="">
            <el-input size="mini" style="width: 10vw" v-model="formName.arrivalDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="padding-bottom: 1vh">
        <el-col :span="10">
          <el-form-item label="接收人" prop="operator" style="letter-spacing: 0.3em;padding-right: -0.25em">
            <el-input  size="mini" style="width: 10vw" v-model="formName.operator"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button size="normal" style="margin-left: 10vw" @click="closeForm(false)" ref="close">取消</el-button>

        <el-button @click="resetForm('formName')">重置</el-button>
        <el-button size="normal" @click="submitForm('formName')">提交</el-button>
      </el-form-item>
    </el-form>


    <el-button  @click="flushTable(true)" ref="flushT"></el-button>
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
        providerCode:'0',
        providerName:'0',
        batchCode:'0',
        materialCode:'0',
        materialName:'0',
        materialGrade:'0',
        status:'0',
        arrivalDate:'0',
        operator:'0',
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


    submitForm1(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm(formName) {
      console.log(formName)
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
            data:formData

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

              //let e1 = document.createEvent('MouseEvent');
              e.initEvent('click', false, false);
              this.$refs.flushT.$el.dispatchEvent(e);
            }
          })

          // let e = document.createEvent('MouseEvent');
          // e.initEvent('click', false, false);
          // this.$refs.close.$el.dispatchEvent(e);

        } else {
          console.log('error submit!!');
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
    let _this = this;
    let yy = new Date().getFullYear();
    let mm = new Date().getMonth()+1;
    let dd = new Date().getDate();
    let hh = new Date().getHours();
    let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    this.formName.arrivalDate = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    console.log(this.formName.arrivalDate)
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
