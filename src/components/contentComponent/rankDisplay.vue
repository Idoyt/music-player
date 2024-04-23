<script>
import {defineComponent} from 'vue';
import LITTLE_TILE from '@/components/LITTLE_TILE.vue';

export default defineComponent({
  name: 'rankDisplay',
  components: {
    LITTLE_TILE,
  },
  setup() {
    const rankTile = ['飙升榜', '热歌榜', '新歌榜', '原创榜'];

    return {
      rankTile,
    };
  },
});
</script>

<template>
  <div id="rankDisplayBody">
    <div v-for="(item, index) in rankTile" :key = index class="rankUnite">
      <div class="rankCover">
        <LITTLE_TILE :showPlayVolume=false></LITTLE_TILE>
      </div>

      <div class="rankPreview">
        <span>{{item}}</span>
        <span>temp</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#rankDisplayBody
{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28%, 1fr));
  gap: 1vw;
  height: inherit;
  width: inherit;
}
.rankUnite
{
  display: flex;
  height: 25vh;
  aspect-ratio: 2.2/1;
  border-radius: 1.2vh;
  background-color: #b6b6b6;
}
.rankCover
{
  aspect-ratio: 1/1;
  max-height: 25vh;
  border-radius: 1.2vh;
}
.rankPreview
{
  height: inherit;
  flex: 1;
}
</style>
