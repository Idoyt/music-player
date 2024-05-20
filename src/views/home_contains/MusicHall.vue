<script>
import {defineComponent, ref} from 'vue';
import rankDisplay from '@/views/musicHall_contains/RankDisplay.vue';
import artistDisplay from '@/views/musicHall_contains/ArtistDisplay.vue';
import albumDisplay from '@/views/musicHall_contains/AlbumDisplay.vue';

export default defineComponent({
  name: 'musicHall',
  components: {
    rankDisplay,
    artistDisplay,
    albumDisplay,
  },
  setup() {
    const index = ref(0);
    const usingComponent = ref('rankDisplay');
    const changeNowComponent = (event, component)=>{
      const dom = event.target;
      const siblings = dom.parentNode.childNodes;

      siblings.forEach((each)=>{
        each.classList.remove('is-active');
      });
      dom.classList.add('is-active');
      usingComponent.value = component;
    };

    return {
      usingComponent,
      index,
      changeNowComponent,
    };
  },
});
</script>

<template>
  <div id="musicHallBody">
    <div id="title">音乐馆</div>
    <div id="navigateMenu">
      <div id="rank" class="menuUnite" @click="changeNowComponent($event, 'rankDisplay')">排行</div>
      <div id="singer" class="menuUnite" @click="changeNowComponent($event, 'artistDisplay')">歌手</div>
      <div id="album" class="menuUnite" @click="changeNowComponent($event, 'albumDisplay')">专辑</div>
    </div>
    <div class="componentArea">
      <component :is="usingComponent"></component>
    </div>
  </div>
</template>

<style scoped>
#musicHallBody
{
  position: relative;
  top: 0;
  margin-left: 2vw;
  margin-right: 2vw;
  font-family: "Microsoft YaHei UI",serif;
}
#title
{
  font-size: 40px;
  font-weight: bolder;
}
#navigateMenu
{
  z-index: 2;
  margin: 3vh 0 3vh 0 ;
  position: sticky;
  display: flex;
  gap: 6vw;
  top: 0;
  background-color: #88cccc;
}
.menuUnite
{
  display: flex;
  height: 4vh;
  font-size: 17px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 3px solid rgba(0, 0, 0, 0);

  font-family: "Microsoft YaHei", serif;
  font-weight: 600;
}
.menuUnite:hover
{
  color: #f3263f;
}
.is-active
{
  color: #f3263f;
  border-color: #f3263f;
}
.componentArea
{
  padding-top: 3vh;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow-y: auto;
  scroll-margin: 10vh 0 0 0;
}
</style>
