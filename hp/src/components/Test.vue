<template>
  <div>
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
      :before-upload="beforeAvatarUpload">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </div>
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
