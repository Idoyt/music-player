<script>
import {defineComponent, onMounted, reactive, ref} from 'vue';
import {STATIC_BASE_URL} from '@/assets/constants';
import {useStore} from 'vuex';

export default defineComponent({
  name: 'Top_bar',
  setup(props, {emit}) {
    const searchContainer = ref('');
    const searchDefault = 'Search';
    const store = useStore();
    const userInfo = reactive({
      username: 'login',
      avatar: STATIC_BASE_URL + '/assets/images/avatar/',
    });

    const initUserInfo = ()=>{
      userInfo.avatar = userInfo.avatar + 'default' + '.jpg';
      userInfo.username = store.state.audioModule.userInfo.username;
    };

    const changeSearchBarStyle = (isFocus)=> {
      searchContainer.value =
          isFocus ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0' : '';
    };

    const navigate = ()=> {
      emit('navigate');
    };

    onMounted(()=>{
      initUserInfo();
    });


    return {
      initUserInfo,
      changeSearchBarStyle,
      searchDefault,
      searchContainer,
      userInfo,
      navigate,
    };
  },
});
</script>

<template>
  <div id="topBarBody">
    <div id="search" :style="searchContainer">
      <input id="input" :placeholder=searchDefault @blur="changeSearchBarStyle(false)" @focus="changeSearchBarStyle(true)">
      <span id="searchIcon"/>
      <div id="searchInfo" @click.prevent>
        <div id="hot" @click.stop></div>
        <div id="history" @click.stop></div>
        <div id="pre_result" @click.stop></div>
      </div>
    </div>

    <div id="rightArea">
      <div id="userInfo">
        <img id="userAvatar" :src=userInfo.avatar alt="user's avatar" @click="navigate">
        <span id="username" @click="navigate">{{userInfo.username}}</span>
      </div>
      <div id="functionBtn">
        <span id="msg" class="btn"></span>
        <span id="set" class="btn"></span>
        <span id="thm" class="btn"></span>
      </div>
    </div>

  </div>
</template>

<style scoped>
#topBarBody
{
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  --search-height: 5vh;
  --search-widht: 20vw;
}
#search
{
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 4vw;
  height: var(--search-height);
  width: var(--search-widht);

  border-radius: 2vh;
  background-color: rgba(255, 255, 255, 0.5);

}
#input
{
  margin-left: 1vw;
  padding: 0;

  height: var(--search-height);
  width: calc(.82 * var(--search-widht));

  font-size: calc(.4 *var(--search-height));
  background: none;
  outline: none;
  border: none;
}
#input:focus::placeholder
{
  opacity: 0;
}
#input:focus + #searchIcon + #searchInfo
{
  display: block;
}
#searchInfo
{
  display: none;
  position: absolute;
  top: var(--search-height);
  left: 0;

  padding: 0;
  height: 20vh;
  width: calc(2 * var(--search-widht));
  border-radius: 0 1vh 1vh 1vh;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}
#input:focus + #searchIcon
{
  display: block;
}
#searchIcon
{
  display: none;
  height: 2.5vh;
  width: 2.5vh;

  background-image: url("http://123.57.7.117/static/icon/top_bar/search.svg");
  background-size: cover;
}
#rightArea
{
  margin-right: 3vw;
  display: flex;
}
#userInfo
{
  display: flex;
}
#userAvatar
{
  margin-right: 1vw;
  height: 3.5vh;
  width: 3.5vh;

  border-radius: 1vh;
  cursor: pointer;
}
#username
{
  vertical-align: bottom;
  cursor: pointer;
}
#functionBtn
{
  display: flex;
  margin-left: 1vw;
}
.btn
{
  margin-left: .8vw;
  height: 3vh;
  width: 3vh;
  background-size: cover;
}
#msg
{
  background-image: url("http://123.57.7.117/static/icon/top_bar/message.svg");
}
#set
{
  background-image: url("http://123.57.7.117/static/icon/top_bar/setting.svg");
}
#thm
{
  background-image: url("http://123.57.7.117/static/icon/top_bar/theme.svg");
}
</style>
