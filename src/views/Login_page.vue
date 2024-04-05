<script>
import {defineComponent, ref} from 'vue';
import GOOGLE_INPUT from '@/components/GOOGLE_INPUT.vue';

import '@/utils/input_check';
import {emailCheck, phoneCheck} from '@/utils/input_check';

export default defineComponent({
  name: 'Login_page',
  components: {
    Google_Input: GOOGLE_INPUT,
  },
  setup() {
    const text = ref('');
    const inputStatus = ref('Correct');
    const placeholder = '电子邮件地址或电话号码';
    const getInputValue = (data)=>{
      text.value = data;
    };
    const checkAccount = ()=>{
      if (emailCheck(text.value) || phoneCheck(text.value)) {
        console.log('nice');
        inputStatus.value = 'Correct';
      } else inputStatus.value = 'Error';
    };
    return {
      text,
      input_status: inputStatus,
      placeholder,
      get_input_value: getInputValue,
      check_account: checkAccount,
    };
  },
});
</script>

<template>
  <div id="componentBody">
    <div id="login_area">
      <div id="left_info">{{text}}</div>
      <div id="rightArea">
        <Google_Input :placeholder=placeholder :status=input_status style="margin-top: 20%" @value="get_input_value"></Google_Input>
        <button id="next_step" @click="check_account">下一步</button>
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
