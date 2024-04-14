<script>
import {defineComponent, ref} from 'vue';
import GoogleInput from '@/components/GOOGLE_INPUT.vue';

import '@/utils/input_check';
import {emailCheck, phoneCheck} from '@/utils/input_check';
import axios from 'axios';

export default defineComponent({
  name: 'loginPage',
  components: {
    GoogleInput,
  },
  setup() {
    const account = ref('');
    const inputStatus = ref('Correct');
    const placeholder = '电子邮件地址或电话号码';
    const getInputValue = (data)=>{
      account.value = data;
    };
    const checkAccount = ()=>{
      if (emailCheck(account.value) || phoneCheck(account.value)) {
        console.log('nice');
        inputStatus.value = 'Correct';
        axios.get(`http://localhost:8000/check_email/?email=${account.value}`)
            .then((response) => {
              if (response.data === account.value) {
                console.log(response);
              }
            });
      } else inputStatus.value = 'Error';
    };
    return {
      input_status: inputStatus,
      placeholder,
      getInputValue,
      checkAccount,
    };
  },
});
</script>

<template>
  <div id="componentBody">
    <div id="login_area">
      <div id="left_info"></div>
      <div id="rightArea">
        <slot name="inputAccount">
          <GoogleInput :status=input_status placeholder="电子邮箱或手机号码" style="margin-top: 20%" @value="getInputValue"></GoogleInput>
        </slot>
        <slot name="inputPassword">
          <GoogleInput :status=input_status placeholder="账号密码" style="margin-top: 20%" type="password" @value="getInputValue"></GoogleInput>
        </slot>

        <button id="next_step" @click="checkAccount">下一步</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

#componentBody
{
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f9;
}
#login_area
{
  display: flex;
  position: relative;
  top: 44%;
  left: 50%;
  translate: -50% -50%;

  height: 52vh;
  width: 75vw;
  background-color: white;
  border-radius: 5vh;
}
#left_info
{
  width: 50%;
  height: inherit;

  background-color: #575757;
}
#rightArea
{
  margin-left: 5vw;
  width: 50%;
  position: relative;
}
#next_step
{
  position: absolute;
  display: flex;
  bottom: 3vh;
  right: 2vw;

  height: 6vh;
  width: 6vw;

  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5vh;
  background-color: #88cccc;
  font-size: 2.5vh;
  color: #f0f4f9;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
}
#next_step:hover
{
  background-color: #75afaf;
}
#next_step:active
{
  background-color: #5b8888;
}
</style>
