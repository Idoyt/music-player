<script>
import {defineComponent, getCurrentInstance, ref} from 'vue';
import audioPlayBar from '@/components/AUDIO_PLAY_BAR.vue';
import menuBar from '@/components/MENU_BAR.vue';
import topBar from '@/components/TOP_BAR.vue';

import personalizedRecommendations from '@/views/content_pages/RECOMMENDATIONS.vue';
import audioHall from '@/views/content_pages/MUSIC_HALL.vue';
import audioRadar from '@/views/content_pages/MUSIC_RADAR.vue';

import audioCollected from '@/views/content_pages/COLLECTED_MUSIC.vue';
import usersFollowed from '@/views/content_pages/FOLLOWED_USERS.vue';
import recordPlayed from '@/views/content_pages/AUDIO_RECORD.vue';


export default defineComponent({
  name: 'homePage',
  // 工具类Component需要放在组件Personalized之前
  components: {
    menuBar,
    audioPlayBar,
    topBar,

    personalizedRecommendations,
    audioHall,
    audioRadar,
    audioCollected,
    usersFollowed,
    recordPlayed,
  },
  setup() {
    const usingComponent = ref('personalizedRecommendations');
    const componentList = Object.keys(getCurrentInstance().type.components);
    const getUsingComponent = (navigate)=>{
      const startComponent = componentList.indexOf('personalizedRecommendations');
      usingComponent.value = componentList[startComponent + navigate];
    };

    const loginStatus = ref(true);
    return {
      usingComponent,
      getUsingComponent,
      componentList,
      loginStatus,
    };
  },
});
</script>

<template>
  <div id="appBody">
    <div id="menuBar">
      <menu-bar @navigate="getUsingComponent"/>
    </div>
    <div id="mainContent">
      <div id="topBar">
        <top-bar/>
      </div>
      <div id="content">
        <component :is="usingComponent"/>
      </div>
      <div id="audioPlayBar">
        <audio-play-bar/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "miku_font";
  src: url("http://101.201.66.67/static/font/zaozigongfangziti.otf");
}
#appBody
{
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #88cccc;

  --MenuBar-width: 13.3vw;
}
#mainContent
{
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: calc(100vw - var(--MenuBar-width));
  font-family: miku_font, serif;
}
#menuBar
{
  z-index: 3;
  width: var(--MenuBar-width);
}
#content
{
  z-index: 1;
  margin-top: 10vh;
  margin-bottom: 12vh;
  overflow: auto;
}
#content::-webkit-scrollbar
{
  width: 0;
}
#audioPlayBar
{
  position: fixed;
  bottom: 0;
  z-index:2;
  height: 12vh;
  width: inherit;
}
#topBar
{
  position: fixed;
  top: 0;
  z-index: 2;
  height: 10vh;
  width: inherit;

}
</style>
