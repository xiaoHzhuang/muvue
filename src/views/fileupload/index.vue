<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="/file/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList"
    :http-request="uploadFileMethod"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import fileUploadApi from "@/api/fileupload/fileupload";

export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    uploadFileMethod(params) {
      let fileObject = params.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      fileUploadApi.uploadFile(formData).then((response) => {
        if (response.data.status == 1) {
          this.$message({
            message: "上传文件成功",
            type: "success",
          });
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style scoped></style>
