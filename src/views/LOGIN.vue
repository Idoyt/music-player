<script>
import {defineComponent, ref} from 'vue';
import GoogleInput from '@/components/GOOGLE_INPUT.vue';

import '@/utils/input_check';
import {emailCheck, phoneCheck} from '@/utils/input_check';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'loginPage',
  components: {
    GoogleInput,
  },
  setup() {
    const account = ref('');
    const checkBtnTextRight = ref('下一步');
    const checkBtnTextLeft = ref('创建账号');
    const router = useRouter();
    const inputStatus = ref('Correct');
    const placeholder = '电子邮件地址或电话号码';
    const getInputValue = (data)=>{
      account.value = data;
    };
    const checkMethod = [emailCheck, phoneCheck];
    const checkMethodTrigger = ref({submit: 'false'});
    // const checkResult = ref('');
    const checkAccount = ()=>{
      if (checkBtnTextRight.value === '下一步') {
        checkMethodTrigger.value.submit = 'true';
        if (emailCheck(account.value) || phoneCheck(account.value)) {
          inputStatus.value = 'Correct';

          // 这里的修改样式需要移到axios里
          document.getElementById('inputAccount').style.marginLeft = '-25vw';
          checkBtnTextRight.value = '登录';
          checkBtnTextLeft.value = '上一步';

          axios.get(`http://localhost:8000/check_email/?email=${account.value}`)
              .then((response) => {
                if (response.data === account.value) {
                  console.log(response);
                }
              });
        } else {
          inputStatus.value = 'Error';
        }
      } else {

        // check password
      }
    };
    const navigate = ()=>{
      if (checkBtnTextLeft.value === '创建账号') router.push('/register');
      else {
        document.getElementById('inputAccount').style.marginLeft = '0';
        checkBtnTextRight.value = '下一步';
        checkBtnTextLeft.value = '创建账号';
        account.value = '';
      }
    };
    return {
      inputStatus,
      placeholder,
      getInputValue,
      checkAccount,
      checkMethod,
      navigate,
      checkBtnTextRight,
      checkBtnTextLeft,
    };
  },
});
</script>

<template>
  <div id="componentBody">
    <div id="tableArea">
      <div id="leftArea"></div>
      <div id="rightArea">
        <div id="inputArea">
            <div id="inputAccount" class="inputUnite">
              <GoogleInput :status=inputStatus placeholder="电子邮箱或手机号码" @value="getInputValue"></GoogleInput>
              <span>忘记账户?</span>
            </div>
            <div id="inputPassword" class="inputUnite">
              <GoogleInput :status=inputStatus placeholder="账号密码" type="password" @value="getInputValue"></GoogleInput>
              <span>忘记密码?</span>
            </div>
        </div>
        <div id="buttonArea">
          <button id="register" class="buttonCommon" @click="navigate">{{checkBtnTextLeft}}</button>
          <button id="checkBtn" class="buttonCommon" @click="checkAccount">{{checkBtnTextRight}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

#componentBody
{
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f9;
  display: flex;
  justify-content: center;
}
#tableArea
{
  position: relative;
  display: flex;
  margin-top: 14vh;
  height: 52vh;
  width: 64vw;
  background-color: white;
  border-radius: 5vh;
}
#leftArea
{
  width: 30vw;
  height: inherit;

  background-color: #575757;
}
#rightArea
{
  width: 35vw;
  height: inherit;
  position: relative;
}
#buttonArea
{
  position: absolute;
  display: flex;
  bottom: 3vh;
  right: 2vw;

  height: 6svh;
  width: 20vw;

  justify-content: center;
  align-items: center;
}
.buttonCommon
{
  flex: 1;
  height: inherit;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5vh;
  font-size: 2.5vh;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
  background-color: white;
}
#register
{
  color: #88cccc;
}
#register:hover
{
  color: #75afaf;;
}
#checkBtn
{
  margin-left: 3vw;
  color: white;
  background-color: #88cccc;
}
#checkBtn:hover
{
  background-color: #75afaf;
}
#checkBtn:active
{
  background-color: #5b8888;
}
#inputArea
{
  margin-left: 5vw;
  margin-top: 10vh;
  height: auto;
  width: 25vw;
  white-space: nowrap;
  overflow: hidden;
}
.inputUnite
{
  display: inline-block;
  //height: 8vh;
}
#inputAccount
{
  transition: margin-left .3s;
  width: 25vw;
}
#inputPassword
{
  transition: margin-left .3s;
  width: 25vw;
}

</style>
