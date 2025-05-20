<template>
  <div class="logging-container">
    <h1>Logging Dashboard</h1>
    
    <!-- 发送日志表单 -->
    <form @submit.prevent="sendLog">
      <div class="form-group">
        <label>Action</label>
        <input v-model="logAction" type="text" required />
      </div>
      <div class="form-group">
        <label>Details</label>
        <textarea v-model="logDetails" rows="3"></textarea>
      </div>
      <button type="submit">Send Log</button>
    </form>

    <!-- 显示日志列表 -->
    <div class="log-list">
      <h3>Recent Logs</h3>
      <ul>
        <li v-for="log in logs" :key="log.id">
          [{{ log.timestamp }}] {{ log.action }}: {{ log.details }}
        </li>
      </ul>
    </div>

    <!-- 状态消息 -->
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const logAction = ref('');
const logDetails = ref('');
const logs = ref([]);
const error = ref('');
const success = ref('');
const API_URL = 'http://localhost:3000';

// 发送日志
const sendLog = async () => {
  try {
    const response = await axios.post(`${API_URL}/logging`, {
      action: logAction.value,
      details: logDetails.value
    });
    console.log(response);
    
    success.value = 'Log sent successfully';
    error.value = '';
    logAction.value = '';
    logDetails.value = '';
    
    
    // 刷新日志列表
    fetchLogs();
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to send log';
    success.value = '';
  }
};

// 获取日志列表
const fetchLogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/logs`);
    logs.value = response.data.logs;
  } catch (err) {
    console.error('Failed to fetch logs:', err);
  }
};

// 组件加载时获取日志
onMounted(fetchLogs);
</script>

<style>
.logging-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.log-list {
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>