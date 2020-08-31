<template>
  <div>
    <el-form ref="form" :inline="true" :model="contentMap"  size="small" class="demo-form-inline searchForm">
      <el-form-item prop="contentMap" style="width:150px">
        <el-input v-model="contentMap.msg" placeholder="消息内容"></el-input>
      </el-form-item>
      <el-form-item style="margin-left:150px">
        <el-button type="primary" icon="el-icon-search" @click="sendMsg" width="50px">发送消息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import kafkaApi from "@/api/kafka/kafka";
export default {
  data () {
    return {
        contentMap:{
            msg:""
        }
    }
  },

  components: {},

  methods: {
      sendMsg(){
        kafkaApi.sendMsg(this.contentMap.msg).then({

        })
      }
  }
}
</script>

<style scoped>
</style>
