<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'LoginTps',
  setup() {
    const title = ref('登录');
    const description = ref('使用您的 MiKu Music 账号');

    return {
      title,
      description,
    };
  },
});
</script>

<template>
<div id="loginTipsBody">
  <div id="logo" style="height: 70px">
    <img alt="icon" src="http://123.57.7.117/static/icon/AccountCheck/icon.png" style="height: inherit">
  </div>
  <div style="display: flex; flex-direction: column; gap: 16px;margin-left: 5px">
    <span style="font-size: 34px;margin-top: 20px">{{title}}</span>
    <span>{{description}}</span>
  </div>
</div>
</template>

<style scoped>
#loginTipsBody
{
  margin: 30px 30px;
  display: flex;
  flex-direction: column;
}
</style>
