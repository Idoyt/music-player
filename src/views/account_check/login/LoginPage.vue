<script>
import {defineComponent, reactive, ref} from 'vue';
import GoogleInput from '@/components/GoogleLikeInputBox.vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'LoginPage',
  components: {GoogleInput},
  setup() {
    const router = useRouter();
    const store = useStore();
    const leftBtnText = ref('创建账号');
    const rightBtnText = ref('下一步');

    const errorMsg = ref('');
    const account = reactive({
      status: -1,
      value: '',
    });
    const password = reactive({
      status: -1,
      value: '',
    });

    const leftButtonClick = ()=>{
      const dom = document.getElementById('accountBox');
      if (leftBtnText.value === '上一步') {
        dom.style.marginLeft = '0';
        leftBtnText.value = '创建账号';
        rightBtnText.value = '下一步';
      } else {
        router.push('/register');
      }
    };
    const rightButtonClick = async ()=>{
      const dom = document.getElementById('accountBox');

      if (leftBtnText.value === '创建账号') {
        account.status = await checkEmail(account.value) ? 1 : 0;
        if (!account.status) return;
        dom.style.marginLeft = '-420px';
        leftBtnText.value = '上一步';
        rightBtnText.value = '登录';
      } else {
        // 登录逻辑
        await login();
      }
    };


    const checkEmail = async (email)=>{
      const data = {email: email};
      const response = await axios.get(API_BASE_URL + `/check_email/`, {params: data, withCredentials: true});
      if (response.status !== 200) {
        errorMsg.value = 'Network Error';
        return false;
      } else if (response.data.status !== 'success') {
        errorMsg.value = response.data.message;
        return false;
      }
      return true;
    };

    const login = async ()=>{
      const data = {email: account.value, password: password.value};
      const response = await axios.post(API_BASE_URL+'/login/', data, {withCredentials: true});

      if (response.status !== 200) {
        alert('Network Error');
        return false;
      }
      if (response.data.status !== 'success') {
        errorMsg.value = response.data.message;
        return false;
      }

      await storageUserInfo();
      return true;
    };

    const storageUserInfo = async ()=>{
      const data = {'quantity': '1'};
      const response = await axios.get(API_BASE_URL + '/get_user_info/', {params: data, withCredentials: true});
      if (response.data.status === 'success') {
        await store.commit('audioModule/updateUserInfo', response.data.message);
        await router.push('/');
      }
    };

    return {
      leftButtonClick,
      rightButtonClick,
      leftBtnText,
      rightBtnText,


      account,
      password,
    };
  },
});
</script>

<template>
  <div id="loginBody">
    <div id="variableContentBox">
      <div id="accountBox">
        <div style="width: 400px">
          <GoogleInput v-model="account.value" :check-result="account.status" placeholder="电子邮箱地址"></GoogleInput>
        </div>
        <div class="forget">忘记电子邮箱地址?</div>
      </div>
      <div id="passwordBox">
        <div style="width: 400px">
          <GoogleInput v-model="password.value" :check-result="password.status" placeholder="密码" type="password"></GoogleInput>
        </div>
        <div class="forget">忘记密码?</div>
      </div>
    </div>
    <div id="buttonsBox">
      <button class="btnCommon" style="background: none; color: #88cccc" @click="leftButtonClick">{{leftBtnText}}</button>
      <button class="btnCommon" style="background: #88cccc; color: white" @click="rightButtonClick">{{rightBtnText}}</button>
    </div>
  </div>
</template>

<style scoped>
#loginBody
{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 120px;
  height: 100%;
  width: 100%;
}
#variableContentBox
{
  display: flex;
  gap: 20px;
  width: 400px;
  overflow: hidden;
}
.forget
{
  display: inline-block;
  padding: 0 8px 0 8px;
  height: 22px;
  margin: 12px 4px;
  cursor: pointer;
  border-radius: 99999px;
}
.forget:hover
{
  background-color: #88cccc;
  color: white;
}
#accountBox
{
  transition-duration: .3s;
}
#buttonsBox
{
  display: flex;
  gap: 20px;
  margin: 0 40px 0 auto;
}
.btnCommon
{
  border: none;
  padding: 0;

  border-radius: 9999999px;
  height: 40px;
  width: 100px;

  font-size: 18px;
  font-weight: 520;
  cursor: pointer;

}
.btnCommon:active
{
  filter: brightness(.91);
}
</style>
