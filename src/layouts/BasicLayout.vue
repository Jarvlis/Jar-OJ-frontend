<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        森海的其它项目
        <a href="http://book.jarvlis.top" target="_blank" class="footStyle">
          图书信息平台
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  components: { GlobalHeader },
};
</script>

<style scoped>
.header {
  background: inherit;
}

#basicLayout .content {
  padding: 20px;
}

#basicLayout .footer {
  padding: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.footStyle {
  text-decoration: none;
  colot: black;
}
</style>
