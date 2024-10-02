<template>
  <div class="chat-container">
    <h1 data-text="Yu-ChatGPT">Yu-ChatGPT</h1>
    <div class="mt-4">
      <el-input
          v-model="question"
          style="max-width: 600px"
          placeholder="Yu-ChatGPT为您服务"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="Select" style="width: 115px" @change="handleSelectChange" class="my-select">
            <el-option label="AI问答" value="1" />
            <el-option label="AI绘画" value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="this.$root.Search" @click="generateText" :disabled="isLoading"/>
        </template>
      </el-input>
    </div>
    <div style="position: relative; display: inline-block;" class="chat-output">
      <el-input
          class="my-output"
          v-model="chatResult"
          style="width: 550px"
          :rows="20"
          type="textarea"
          placeholder=""
      />
      <el-button type="success" @click="copyText" style="position: absolute; bottom: 10px; right: 20px;">
        复制
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select:'1',
      question: '',
      chatResult: '',
      // 添加加载状态
      isLoading: false,
    };
  },
  methods: {
    generateText() {
      // 开始加载
      this.isLoading = true;
      this.$axios
          .get('/chat', { params: { question: this.question } })
          .then((response) => {
            this.chatResult = response.data;
          })
          .catch((error) => {
            console.error('API 调用失败', error);
            // 提供用户反馈
            alert('生成文案失败，请稍后再试。');
          })
          .finally(() => {
            // 结束加载
            this.isLoading = false;
          });
    },
    copyText() {
      if (this.chatResult) {
        navigator.clipboard.writeText(this.chatResult).then(() => {
          alert('文案已复制');
        });
      } else {
        alert('没有可复制的文案');
      }
    },
    handleSelectChange() {
      if (this.select === '2') {
        this.$router.push({ name: 'Img' });
      }
    },
  },
};
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.mt-4 {
  margin-bottom: 20px;
}

/*.my-select {
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 2em;
  padding: 0.75em 1em;
  color: blue;
  border: 0.15em solid blue;
  border-radius: 2em;
  transition: 4s;
  overflow: hidden;
}

.my-select:before,
.my-select:after {
  content: "";
  position: absolute;
  top: -1.5em;
  z-index: -1;
  width: 200%;
  aspect-ratio: 1;
  border: none;
  border-radius: 40%;
  background-color: rgb(0,0,255,0.25);
  transition: 4s;
}

.my-select:before {
  left: -80%;
  transform: translate3d(0,5em,0) rotate(-340deg);
}

.my-select:after {
  right: -80%;
  transform: translate3d(0,5em,0) rotate(390deg);
}

.my-select:hover,
.my-select:focus {
  color: white;
}

.my-select:hover:before,
.my-select:hover:after,
.my-select:focus:before,
.my-select:focus:after {
  transform: none;
  background-color: rgb(0,0,255,0.75);
}

.chat-container {
  text-align: center;
  margin: 20px;
}

input, button, textarea {
  !* 增加间距 *!
  margin: 10px 0;
}

.mt-4 {
  margin-bottom: 20px;
}

.chat-output {
  overflow: hidden;
  padding: 5px;
  border-radius: 5px;
  z-index: 0;
}

.chat-output::before {
  content: '';
  width: 200%;
  height: 200%;
  background-color: #22292f;
  position: absolute;
  left: -50%;
  top: -50%;
  background-image: conic-gradient(
  transparent,#66ddf7,transparent 30%
  );
  z-index: -2;
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  to{
    transform: rotate(360deg);
  }
}*/
</style>
