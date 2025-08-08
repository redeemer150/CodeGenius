<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Layout, Menu, Button } from 'ant-design-vue'

defineProps({
  title: {
    type: String,
    default: 'CodeGenius'
  },
  menus: {
    type: Array,
    default: () => [
      {
        key: 'home',
        title: '首页',
        path: '/'
      },
      {
        key: 'about',
        title: '关于',
        path: '/about'
      }
    ]
  }
})

const selectedKeys = ref(['home'])
</script>

<template>
  <Layout.Header class="global-header">
    <div class="logo-container">
      <img src="@/assets/logo1.png" alt="Logo" class="logo" />
      <h1 class="title">{{ title }}</h1>
    </div>
    <Menu
      mode="horizontal"
      v-model:selectedKeys="selectedKeys"
      class="menu"
    >
      <Menu.Item v-for="item in menus" :key="item.key">
        <RouterLink :to="item.path">{{ item.title }}</RouterLink>
      </Menu.Item>
    </Menu>
    <div class="user-info">
      <Button type="primary">登录</Button>
    </div>
  </Layout.Header>
</template>

<style scoped>
.global-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 64px;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
  margin-right: 12px;
}

.title {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 18px;
  white-space: nowrap;
}

.menu {
  flex: 1;
  line-height: 64px;
}

.user-info {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .title {
    display: none;
  }
  
  .menu {
    flex: none;
  }
}
</style> 