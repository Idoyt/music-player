<script>
import {defineComponent, onMounted, reactive, ref} from 'vue';

export default defineComponent({
  name: 'Top_bar',
  setup() {
    const searchContainer = ref('');
    const searchDefault = '搜索音乐';
    const userInfo = reactive({
      id: 'default',
      name: 'login',
      avatar: 'http://101.201.66.67/assets/images/avatar/',
    });

    const initUserInfo = ()=>{
      userInfo.avatar = userInfo.avatar + userInfo.id + '.jpg';
    };

    const changeSearchBarStyle = (isFocus)=> {
      searchContainer.value =
          isFocus ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0' : '';
    };

    onMounted(()=>{
      initUserInfo();
    });


    return {
      init_user_info: initUserInfo,
      change_search_container_style: changeSearchBarStyle,
      search_default_value: searchDefault,
      search_container: searchContainer,
      user_info: userInfo,
    };
  },
});
</script>

<template>
  <div id="component_body">
    <div id="search" :style="search_container">
      <input id="input" :placeholder=this.search_default_value @blur="change_search_container_style(false)" @focus="change_search_container_style(true)">
      <span id="search_icon"/>
      <div id="search_info" @click.prevent>
        <div id="hot" @click.stop></div>
        <div id="history" @click.stop></div>
        <div id="pre_result" @click.stop></div>
      </div>
    </div>

    <div id="right_area">
      <div id="user_info">
        <img id="usr_avatar" :src=user_info.avatar alt="user's avatar">
        <span id="usr_id">{{user_info.name}}</span>
      </div>
      <div id="function_btn">
        <span id="msg" class="btn"></span>
        <span id="set" class="btn"></span>
        <span id="thm" class="btn"></span>
      </div>
    </div>

  </div>
</template>

<style scoped>
#component_body
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
#input:focus + #search_icon + #search_info
{
  display: block;
}
#search_info
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
#input:focus + #search_icon
{
  display: block;
}
#search_icon
{
  display: none;
  height: 2.5vh;
  width: 2.5vh;

  background-image: url("http://101.201.66.67/static/icon/top_bar/search.svg");
  background-size: cover;
}
#right_area
{
  margin-right: 3vw;
  display: flex;
}
#user_info
{
  display: flex;
}
#usr_avatar
{
  margin-right: 1vw;
  height: 3.5vh;
  width: 3.5vh;

  border-radius: 1vh;
}
#usr_id
{
  vertical-align: bottom;
}
#function_btn
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
  background-image: url("http://101.201.66.67/static/icon/top_bar/message.svg");
}
#set
{
  background-image: url("http://101.201.66.67/static/icon/top_bar/setting.svg");
}
#thm
{
  background-image: url("http://101.201.66.67/static/icon/top_bar/theme.svg");
}
</style>
