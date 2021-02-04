<template>
  <div style="margin-top: 40vh;">
    <span style="margin-left: 30vw;margin-top: 40vh;">工号：</span>
    <el-input size="mini" v-model="employeeId" placeholder="请输入工号" style="width: 20vw"></el-input><br><br>
    <span  style="margin-left: 30vw;margin-top: 40vh;">密码：</span>
    <el-input show-password v-model="password" size="mini" placeholder="请输入密码" style="width: 20vw" @keyup.enter.native="loginMethod"/>
    <el-button size="mini" @click="loginMethod">登录</el-button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
name: "Login",
  data(){
    return{
      employeeId:'',
      password:'',
    }
  },

  methods: {
    loginMethod(){


      this.axios({
        url:'http://localhost:8081/user/login',
        params: {
          employeeId:this.employeeId,
          password:this.password
        }
      }).then(res=>{
        let data = res.data;
        console.log(data)
        if (data.code == 200){
          let username = data.result.username;
          console.log(username)
          this.$root.loginUser = username
          this.$root.employeeId = data.result.employeeId
          sessionStorage.setItem('username',username)
          this.$message.success('登录成功')
          this.$router.push('/index')
        }
        if (data.code == 201){
          this.$message.error('没有该账号，请检查账号是否正确')
        }
        if (data.code == 202){
          this.$message.error('密码错误');
        }

      });
    },

    ...mapActions(
      ['login']
    )

  }

}
</script>

<style scoped>

</style>
