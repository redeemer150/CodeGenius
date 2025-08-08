<template>
  <Layout class="basic-layout">
    <GlobalHeader />
    <Layout.Content class="content">
      <div class="content-inner">
        <router-view />
      </div>
    </Layout.Content>
    <GlobalFooter />
  </Layout>
</template>

<script setup lang="ts">
import { Layout } from 'ant-design-vue'
import GlobalHeader from '../components/layout/GlobalHeader.vue'
import GlobalFooter from '../components/layout/GlobalFooter.vue'

</script>

<style scoped>
.basic-layout {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.content {
  padding: 0 50px;
  display: flex;
  flex-direction: column;
}

.content-inner {
  background: #fff;
  padding: 24px;
  margin: 24px 0;
  flex: 1;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .content {
    padding: 0 12px;
  }

  .content-inner {
    padding: 16px;
    margin: 16px 0;
  }
}
</style>
