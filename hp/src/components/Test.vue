<template>
  <el-header style="padding: 0">
    <div style="width: 100%;height: 100%;background-color: #92b7c2;">

      <div>
        <span style="padding-top: 18px;float: left;margin-left: 15px">厂家代码：</span>
        <el-input size="mini" v-model="providerCode"  style="float: left;width: 8vw;margin-top: 15px"></el-input>

        <span style="padding-top: 18px;float: left;margin-left: 10px">物料编码：</span>
        <el-input size="mini" v-model="materialCode" style="float: left;width: 8vw;margin-top: 15px"></el-input>

        <span style="padding-top: 18px;float: left;margin-left: 10px">来料档次：</span>
        <el-input size="mini" v-model="materialGrade" style="float: left;width: 8vw;margin-top: 15px"></el-input>

        <span style="padding-top: 18px;float: left;margin-left: 10px">批次号：</span>
        <el-input size="mini" v-model="batchCode" style="float: left;width: 8vw;margin-top: 15px"></el-input>
      </div>

      <div>
        <el-date-picker
          size="mini"
          v-model="startDate"
          type="date"
          placeholder="开始日期" style="width: 8vw;margin-left: 1vw;margin-top: 15px">
        </el-date-picker>

        <el-date-picker
          size="mini"
          v-model="endDate"
          type="date"
          placeholder="截止日期" style="width: 8vw;margin-left: 1vw;margin-top: 15px">
        </el-date-picker>

        <el-button size="mini" type="primary" style="margin-top: 15px;float: right;margin-right: 50px" @click="search">查询</el-button>
        <el-button size="mini" type="primary" style="margin-top: 15px;float: right;margin-right: 10px" @click="showAll">显示全部</el-button>
      </div>

    </div>
    <div>

    </div>
  </el-header>
</template>

<script>
import XLSX from "xlsx";

export default {
  data() {
    return {
      upload_file: "",
      lists: []
    };
  },
  methods: {

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

  }
};
</script>
