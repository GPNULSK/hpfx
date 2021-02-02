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
        <el-col :span="10">
          <el-form-item label="接收数量" prop="operator" style="letter-spacing: 0.3em;padding-right: -0.25em">
            <el-input  size="mini" style="width: 10vw" v-model="formName.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button size="normal" style="margin-left: 10vw" @click="closeForm(false)" ref="close">取消</el-button>

        <el-button size="normal" @click="submitForm('formName')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
name: "ReturnOrder",
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
        account:0,
      },
    }
  }
}
</script>

<style scoped>

</style>
