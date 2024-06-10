<script>
import {defineComponent, ref} from 'vue';

import LoginTips from '@/views/account_check/login/LoginTips.vue';
import LoginPage from '@/views/account_check/login/LoginPage.vue';

import RegisterTips from '@/views/account_check/register/RegisterTips.vue';
import RegisterPage from '@/views/account_check/register/RegisterPage.vue';

export default defineComponent({
  name: 'AccountCheck',
  components: {
    LoginPage,
    LoginTips,
    RegisterTips,
    RegisterPage,
  },
  setup() {
    const usingTip = ref('LoginTips');
    const usingForm = ref('LoginPage');

    return {
      usingTip,
      usingForm,
    };
  },
});
</script>

<template>
  <div id="accountCheckBody">
    <div id="mainBox">
      <div id="tipsBox" style="flex: 1">
        <component :is="usingTip"/>
      </div>
      <div id="formBox" style="flex: 1">
        <component :is="usingForm"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#accountCheckBody
{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f9;
}
#mainBox
{
  display: flex;

  height: 360px;
  margin: 100px auto;
  min-width:1000px;
  background-color: white;
  border-radius: 30px;

  overflow: hidden;
}
</style>
