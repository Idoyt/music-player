<script>
import {defineComponent, ref} from 'vue';
import rankDisplay from '@/components/contentComponent/rankDisplay.vue';

export default defineComponent({
  name: 'musicHall',
  setup() {
    const index = ref(0);
    const nowComponent = [rankDisplay];
    const changeNowComponent = (selectedIndex)=>{
      index.value = selectedIndex;
      const parentDom = document.getElementById('navigateMenu');
      const childNodes = parentDom.childNodes;
      childNodes.forEach((item, index)=>{
        if (index === selectedIndex) item.classList.add('selectedMenuUnite');
        else item.classList.remove('selectedMenuUnite');
      });
    };
    const scrollListener = (event)=>{
      console.log(event);
    };

    return {
      nowComponent,
      index,
      changeNowComponent,
      scrollListener,
    };
  },
});
</script>

<template>
  <div id="musicHallBody" @scroll="scrollListener">
    <div id="title">音乐馆</div>
    <div id="navigateMenu">
      <div id="rank" class="menuUnite" @click="changeNowComponent(0)">排行</div>
      <div id="singer" class="menuUnite" @click="changeNowComponent(1)">歌手</div>
      <div id="album" class="menuUnite" @click="changeNowComponent(2)">专辑</div>
    </div>
    <div class="componentArea">
      <component :is="nowComponent[0]"></component>
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
  position: sticky;
  display: flex;
  top: 0;
  height: 6vh;
  background-color: #88cccc;
}
.menuUnite
{
  display: flex;
  margin-right: 6vw;
  height: inherit;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.menuUnite:hover
{
  color: #f3263f;
}
.selectedMenuUnite
{
  color: #f3263f;
  box-sizing: border-box;
  border-bottom: 2px solid #f3263f;;
}
.componentArea
{
  margin-top: 3vh;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow-y: auto;
  scroll-margin: 10vh 0 0 0;
}
</style>
