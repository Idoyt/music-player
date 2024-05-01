<script>
import {defineComponent, onMounted, ref, watch} from 'vue';
import GoogleInput from '@/components/GOOGLE_INPUT.vue';

import '@/utils/input_check';
import {emailCheck, phoneCheck} from '@/utils/input_check';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {API_BASE_URL} from '@/assets/constants';

export default defineComponent({
  name: 'loginPage',
  components: {
    GoogleInput,
  },
  setup() {
    const account = ref('');
    const password = ref('');
    const checkBtnTextRight = ref('下一步');
    const checkBtnTextLeft = ref('创建账号');
    const accountInputState = ref('Correct');
    const placeholder = '电子邮件地址或电话号码';
    const accountErrorMessage = ref('');
    const passwordErrorMessage = ref('');
    const loginState = ref(false);
    const needSelect = ref(false);

    const domAccountError = ref(null);
    const domPasswordError = ref(null);
    const router = useRouter();
    const store = useStore();

    const getAccount = (data)=>{
      account.value = data;
    };
    const getPassword = (data)=>{
      password.value = data;
    };
    const checkMethodTrigger = ref({submit: 'false'});
    // const checkResult = ref('');
    const checkAccount = ()=>{
      if (checkBtnTextRight.value === '下一步') {
        checkMethodTrigger.value.submit = 'true';
        if (emailCheck(account.value) || phoneCheck(account.value)) {
          accountInputState.value = 'Correct';

          axios.post(API_BASE_URL + `/check_email/`, {'email': account.value})
              .then((response) => {
                console.log(response);
                if (response.data.state === 'success') {
                  document.getElementById('inputAccount').style.marginLeft = '-25vw';
                  checkBtnTextRight.value = '登录';
                  checkBtnTextLeft.value = '上一步';
                  needSelect.value = false;
                } else {
                  accountErrorMessage.value = response.data.message;
                }
              });
        } else {
          accountInputState.value = 'Error';
        }
      } else {
        // check password
        axios.post(API_BASE_URL + '/login/', {'email': account.value, 'password': password.value})
            .then((response) => {
              if (response.data.state === 'success') {
                router.push('/');
                store.commit('audioModule/updateLoginState', true);
              } else {
                passwordErrorMessage.value = response.data.message;
              }
            });
      }
    };
    const navigate = ()=>{
      if (checkBtnTextLeft.value === '创建账号') router.push('/register');
      else {
        document.getElementById('inputAccount').style.marginLeft = '0';
        checkBtnTextRight.value = '下一步';
        checkBtnTextLeft.value = '创建账号';
        needSelect.value = false;
      }
    };

    onMounted(()=>{
      domAccountError.value.style.display = 'none';
      watch(accountErrorMessage, (value)=>{
        if (!loginState.value && value !== '') {
          needSelect.value = true;
          domAccountError.value.style.display = 'block';
        }
      });
      watch(account, (value)=>{
        if (value === '') {
          needSelect.value = false;
          domAccountError.value.style.display = 'none';
        }
      });

      domPasswordError.value.style.display = 'none';
      watch(passwordErrorMessage, (value)=>{
        if (!loginState.value && value !== '') {
          needSelect.value = true;
          domPasswordError.value.style.display = 'block';
        }
      });
      watch(password, (value)=>{
        if (value === '') {
          needSelect.value = false;
          domPasswordError.value.style.display = 'none';
        }
      });
    });
    return {
      accountInputState,
      placeholder,
      getAccount,
      getPassword,
      checkAccount,
      navigate,
      checkBtnTextRight,
      checkBtnTextLeft,
      accountErrorMessage,
      passwordErrorMessage,
      needSelect,

      domAccountError,
      domPasswordError,
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
              <GoogleInput :need-select="needSelect" :state="accountInputState" placeholder="电子邮箱或手机号码" @value="getAccount"></GoogleInput>
              <div ref="domAccountError" style="color: #f3263f">错误: {{accountErrorMessage}}</div>
              <span>忘记账户?</span>
            </div>
            <div id="inputPassword" class="inputUnite">
              <GoogleInput placeholder="账号密码" type="password" @value="getPassword"></GoogleInput>
              <div ref="domPasswordError" style="color: #f3263f">错误: {{passwordErrorMessage}}</div>
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
