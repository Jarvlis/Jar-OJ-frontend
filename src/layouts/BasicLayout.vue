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
        <a href="http://jarvlis.top" target="_blank"> 森海的blog </a>
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
#basicLayout {
}

#basicLayout .header {
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
</style>
