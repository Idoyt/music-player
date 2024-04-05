<script>
import {defineComponent} from 'vue';
import '@/assets/style/global.css';

export default defineComponent({
  name: 'Menu_Bar',
  setup(props, {emit}) {
    const navigate = (pageIndex)=> {
      emit('navigate', pageIndex);
    };
    return {navigate};
  },
});


</script>

<template>
  <div id="componentBody">
    <div class="iconArea">
      <img alt="icon" src="https://zh.minecraft.wiki/images/thumb/Redstone_Dust_JE2_BE2.png/32px-Redstone_Dust_JE2_BE2.png?030c0">
      <span style="font-size: 1.5vw;">米库音乐</span>
    </div>
    <div id="inherentArea">
      <span class="optionsTitle">在线音乐</span>
      <span class="optionsContent" @click="navigate(0)">推荐歌曲</span>
      <span class="optionsContent" @click="navigate(1)">音乐馆</span>
      <span class="optionsContent" @click="navigate(2)">雷达</span>

      <!--中央间隔-->
      <span style="height: 5vh; display: block"></span>

      <span class="optionsTitle">我的音乐</span>
      <span class="optionsContent" @click="navigate(3)">我喜欢</span>
      <span class="optionsContent" @click="navigate(4)">我的关注</span>
      <span class="optionsContent" @click="navigate(5)">最近播放</span>

    </div>
    <div id="customizeArea">
      <span class="optionsTitle">创建的歌单</span>
      <span class="songList">test</span>
      <span class="songList">test</span>
      <span>test</span>
    </div>
    <router-link class="admin" to="/admin">Admin Only</router-link>
  </div>
</template>

<style scoped>
#componentBody
{
  display: block;
  position: relative;
  height: 100vh;
  width: 13.3vw;

  background-color: rgba(255, 255, 255, .5);
  font-family: miku_font, serif;
}

.iconArea
{
  display: flex;
  align-items: center;
  justify-content: center;

  height: 10vh;
  width: inherit;
}
#inherentArea
{
  margin-top: 3vh;
}
#customizeArea
{
  margin-top: 3vh;
}
.optionsTitle
{
  height: 6vh;
  color: #575757;
  font-size: 0.9vw;
  padding-left: 1vw;
}

.optionsContent
{
  display: flex;
  padding-left: 1vw;
  align-items: center;
  height: 6vh;
  font-size: 2.4vh;

  cursor: pointer;
}
.optionsContent:hover
{
  border-right: .4vw solid red;
  background-color: rgba(255, 255, 255, .7);
}

.songList
{
  display: block;
}

.admin
{
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
