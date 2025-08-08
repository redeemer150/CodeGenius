<script setup lang="ts">
import { Layout } from 'ant-design-vue'
</script>

<template>
  <Layout.Footer class="global-footer">
    <div class="footer-content">
      <span>ai代码生成智能体 by </span>
      <a href="https://github.com/redeemer150" target="_blank">程序员炼金术士</a>
    </div>
  </Layout.Footer>
</template>

<style scoped>
.global-footer {
  text-align: center;
  padding: 16px 20px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-content {
  color: rgba(0, 0, 0, 0.65);
}

.footer-content a {
  color: #1890ff;
  text-decoration: none;
}

.footer-content a:hover {
  color: #40a9ff;
}
</style> 