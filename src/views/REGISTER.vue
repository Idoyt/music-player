<script>
import {defineComponent, ref} from 'vue';
import GoogleInput from '@/components/GOOGLE_INPUT.vue';
import {useRouter} from 'vue-router';
import {emailCheck, phoneCheck} from '@/utils/input_check';

export default defineComponent({
  name: 'registerPage',
  components: {GoogleInput},
  setup() {
    const leftButtonText = ref('返回登录');
    const rightButtonText = ref('下一步');
    const router = useRouter();
    const checkMethod = [emailCheck, phoneCheck];
    const leftButtonClick = ()=>{
      if (leftButtonText.value === '返回登录') {
        router.push('/login');
      } else {
        leftButtonText.value = '返回登录';
        rightButtonText.value = '下一步';
        document.getElementById('part1').style.marginLeft = '0';
      }
    };
    const rightButtonClick = ()=> {
      if (rightButtonText.value === '下一步') {
        leftButtonText.value = '上一步';
        rightButtonText.value = '注册';
        document.getElementById('part1').style.marginLeft = '-25vw';
      } else {
        // register step
      }
    };

    return {
      leftButtonText,
      rightButtonText,
      leftButtonClick,
      rightButtonClick,
      checkMethod,
    };
  },
});
</script>

<template>
  <div id="registerBody">
    <div id="tableArea">
      <div id="leftArea">
      </div>
      <div id="rightArea">
        <div id="inputArea">
          <div id="part1" class="inputUnite">
            <div id="username">
              <GoogleInput placeholder="用户名"></GoogleInput>
            </div>
            <div id="account">
              <GoogleInput :check-method="checkMethod" placeholder="电子邮箱或手机号码"></GoogleInput>
            </div>
          </div>
          <div id="part2" class="inputUnite">
            <div id="password">
              <GoogleInput placeholder="密码" type="password"></GoogleInput>
              <div id="passwordComplexity"></div>
            </div>
            <div id="repeatPassword">
              <GoogleInput placeholder="再次输入密码" type="password"></GoogleInput>
            </div>
          </div>
        </div>
        <div id="buttonArea">
          <button id="backToLogin" class="buttonCommon" @click = leftButtonClick>{{leftButtonText}}</button>
          <button id="checkBtn" class="buttonCommon" @click = rightButtonClick>{{rightButtonText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#registerBody
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
#inputArea
{
  margin-left: 5vw;
  margin-top: 10vh;
  height: auto;
  width: 25vw;
  white-space: nowrap;
  overflow: hidden;
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
.inputUnite
{
  display: inline-block;
  width: 25vw;
  transition: margin-left .3s;
}
#backToLogin
{
  color: #88cccc;
}
#backToLogin:hover
{
  color: #5b8888;
}
#checkBtn
{
  background-color: #88cccc;
  color: white;
}
#checkBtn:hover
{
  background-color: #5b8888;
}
</style>
