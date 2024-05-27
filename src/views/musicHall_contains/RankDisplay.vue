<script>
import {defineComponent, ref} from 'vue';
import LITTLE_TILE from '@/components/PlaylistTile.vue';

export default defineComponent({
  name: 'rankDisplay',
  components: {
    LITTLE_TILE,
  },
  setup() {
    const rankTile = ['飙升榜', '热歌榜', '新歌榜', '原创榜'];
    const rankInfo = ref([]);
    // temp rank information for test
    const tempInfo = {
      title: 'Temp Rank Title',
      playVolume: 23333,
      musicList: [
        {title: 'temp music title in list', artist: 'temp artist in list'},
        {title: 'temp music title in list', artist: 'temp artist in list'},
        {title: 'temp music title in list', artist: 'temp artist in list'}],
    };
    const areaRankInfo = ref([
      'https://qpic.y.qq.com/music_cover/0nn3FBrD9a0ycluZIdnoFZ1q86s6DiaYnP2a6MaMhhqHVfrLylBjbPw/600?n=1',
      'https://qpic.y.qq.com/music_cover/gnK6ofEkAfamfp7GAZzsNFNU0fpaPcICDxibW6zAzBcNe8oibNpHPOVw/600?n=1',
      'https://qpic.y.qq.com/music_cover/USH8Nb3Hz5S24DSyMWr3mibzghMsD1XqmicxaTPibias3EuJicvA6V1AFmw/600?n=1',
      'https://qpic.y.qq.com/music_cover/N4HWkmwbSVSc98ubOQJiafCU8Tz0QAQGUepEfFiaaQzs1EafIGX5CWfQ/600?n=1',
      'https://qpic.y.qq.com/music_cover/QXV6fXmfbiaelBofYCHbY9AIFO3aV6EBY2iaoBtaEfaaGPicHPzJByBlKWwsMPFUX8q/600?n=1',
      'https://qpic.y.qq.com/music_cover/ufMTIVudlV4mw1GfIia7va3fQncF2aynVg4yXPqPdS5sVqTJAtLMwxw/600?n=1',
      'https://qpic.y.qq.com/music_cover/xeFoiatia5BBV6neqwnYwuAdoObIZ3oQFQhgKsqjojfMmdzYRvnX2DDQ/600?n=1',
    ]);

    rankInfo.value = [
      {
        title: '飙升榜',
        coverUrl: 'https://y.qq.com/music/photo_new/T002R300x300M000003bzQbg0actxt_2.jpg?max_age=2592000',
        playVolume: 1864,
        musicList: [
          {title: '若月亮没来', artist: '杨宗纬'},
          {title: '原谅', artist: '陈楚生'},
          {title: '三日月之舞', artist: '北宇治高校吹奏部'},
        ],
      },
      {
        title: '热歌榜',
        coverUrl: 'https://y.qq.com/music/photo_new/T002R300x300M000000lliBl4F6BFW_1.jpg?max_age=2592000',
        playVolume: 1950,
        musicList: [
          {title: '青鸟与利兹-第三乐章-爱的决断', artist: '北宇治高校吹奏部'},
          {title: 'Miku', artist: '初音未来'},
          {title: '霜雪卡年', artist: '洛天依/乐正绫'},
        ],
      },
      {
        title: '新歌榜',
        coverUrl: 'https://y.qq.com/music/photo_new/T002R300x300M000004J6rWU2O162A_1.jpg?max_age=2592000',
        playVolume: 1644,
        musicList: [
          {title: 'Flight School', artist: 'Johan Soderqvist'},
          {title: 'Notitle', artist: 'REOL'},
          {title: '鸟之诗', artist: 'TAMUSIC'},
        ],
      },
      {
        title: '原创榜',
        coverUrl: 'https://y.qq.com/music/photo_new/T002R300x300M0000022kx9O4Oy0d9_1.jpg?max_age=2592000',
        playVolume: 1454,
        musicList: [
          {title: 'Asssassin\'s Creed', artist: 'The Fights'},
          {title: 'Main Theme', artist: 'Gareth Coker'},
          {title: 'Cleric Beast', artist: 'Ryan Amon'},
        ],
      },
      {
        title: '流行指数榜',
        coverUrl: 'https://y.qq.com/music/photo_new/T002R300x300M000001SzJIX4YzUrS_2.jpg?max_age=2592000',
        playVolume: 1644,
        musicList: [
          {title: 'He Has Returned to Mordor', artist: 'Nathan Grigg'},
          {title: 'Notitle', artist: 'REOL'},
          {title: '鸟之诗', artist: 'TAMUSIC'},
        ],
      },
      {
        title: '劲歌榜',
        coverUrl: 'https://qpic.y.qq.com/music_cover/8eiaDBJ27yYicpMibYZmmEdNOvXEIcsWe4myOLw4iaUEFicTdfToialaJaiag/600?n=1',
        playVolume: 1644,
        musicList: [
          {title: '快乐崇拜(Recover)', artist: 'Hanser'},
          {title: 'Never Gonna Give You Up', artist: 'Rick Astley'},
          {title: 'Main Theme', artist: 'Gareth Coker'},
        ],
      },
    ];

    return {
      rankTile,
      rankInfo,
      areaRankInfo,
    };
  },
});
</script>

<template>
  <div id="rankDisplayBody">
    <div id="bigRanks">
      <div v-for="(item, index) in rankInfo" :key = index class="rankUniteCover">
        <div class="rankUnite">
          <div class="rankCover">
            <LITTLE_TILE :list_cover="item.coverUrl" :showPlayVolume=false></LITTLE_TILE>
          </div>

          <div class="rankPreview">
            <span style="font-size: 18px; font-weight: 600;margin: 1vh 0 2vh 0">{{item.title}}</span>
            <div v-for="(music, musicIndex) in item.musicList" :key="musicIndex" class="music">
              <span style="margin-right: .3vw">{{musicIndex + 1}}.</span>
              <span>{{music.title}} - {{music.artist}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div id="areaRank">
      <div style="font-size: 20px; font-weight: 600; margin-bottom: 2vh">
        <span>地区榜</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(7, auto); grid-gap: 1vw">
        <div v-for="(item) in areaRankInfo" :key="item" class="areaRankUniteCover">
          <div class="areaRankCover">
            <LITTLE_TILE :list_cover="item"></LITTLE_TILE>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
#rankDisplayBody
{
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei", serif;
}
#bigRanks
{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vw;
}
.rankUnite
{
  display: flex;
  height: 20vh;
  max-width: 25vw;
  border-radius: 1.2vh;
  background-color: rgba(0, 0, 0, .1);
  transition-duration: .1s;
}
.rankUniteCover:hover
{
  margin-top: -1vh;
}
.rankCover
{
  aspect-ratio: 1/1;
  max-height: 25vh;
  border-radius: 1.2vh;
}
.rankPreview
{
  display: flex;
  margin-left: 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-direction: column;
  height: inherit;
  flex: 1;
}
.music
{
  flex: 1;
  font-size: 13px;
  color: #737373;
}
#areaRank
{
  margin-top: 5vh;
}
.areaRankCover
{
  min-height: 5vh;
  aspect-ratio: 1/1;
  transition-duration: .1s;
}
.areaRankUniteCover:hover
{
  margin-top: -1vh;
}
</style>
