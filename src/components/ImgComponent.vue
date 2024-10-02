<template>
  <div class="img-container">
    <h1>Yu-ChatGPT</h1>
    <div class="mt-4">
      <el-input
          v-model="question"
          style="max-width: 600px"
          placeholder="Yu-ChatGPT为您服务"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 115px" @change="handleSelectChange">
            <el-option label="AI问答" value="1" />
            <el-option label="AI绘画" value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="this.$root.Search" @click="generateImage" :disabled="isLoading"/>
        </template>
      </el-input>
    </div>
<!--<div style="position: relative; display: inline-block;">
      <el-input
          style="width: 550px"
          :rows="20"
          type="textarea"
          placeholder=""
      >
        <img :src="imageUrl" alt="AI生成的图片" v-if="imageUrl" style="max-width: 100%; max-height: 100%;"/>
      </el-input>
      <el-button type="success" @click="copyImage" v-if="imageUrl" style="position: absolute; bottom: 0; right: 10px;">
        复制
      </el-button>
    </div>-->
    <div v-if="imageUrl" class="image-display">
      <img :src="imageUrl" alt="AI生成的图片" style="max-width: 100%; max-height: 100%;"/>
      <el-button type="success" @click="copyImage" v-if="imageUrl" style="position: absolute; top: 10px; right: 10px;">
        复制
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select:'2',
      question: '',
      imageUrl: '',
      // 添加加载状态
      isLoading: false,
    };
  },
  methods: {
    generateImage() {
      this.isLoading = true;
      this.$axios
          .get('/img', { params: { question: this.question } })
          .then((response) => {
            this.imageUrl = response.data;
          })
          .catch((error) => {
            console.error('API 调用失败', error);
            // 提供用户反馈
            alert('生成图片失败，请稍后再试。');
          })
          .finally(() => {
            // 结束加载
            this.isLoading = false;
          });
    },
    copyImage() {
      if (this.imageUrl) {
        // 使用新的方法来处理图片的复制或下载
        const a = document.createElement('a');
        a.href = this.imageUrl;
        // 设置下载文件名
        a.download = 'generated-image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        alert('图片已准备好下载');
      } else {
        alert('没有可复制的图片');
      }
    },
    handleSelectChange() {
      if (this.select === '1') {
        this.$router.push({ name: 'Chat' });
      }
    },
  },
};
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.img-container {
  text-align: center;
  margin: 20px;
}

.mt-4 {
  margin-bottom: 20px;
}

.image-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
