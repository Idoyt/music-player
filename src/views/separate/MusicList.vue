<script>
import {defineComponent, onBeforeMount, ref} from 'vue';

export default defineComponent({
  name: 'MusicList',
  components: {
  },
  props: {
    playlist_id: String,
  },
  setup(props) {
    const musicList = ref([]);
    const tableRowClick = (event)=>{
      const dom = event.target.closest('.tableRow');
      const siblings = dom.parentNode.querySelectorAll('.tableRow');
      siblings.forEach((each)=>{
        each.classList.remove('is-active');
      });
      dom.classList.add('is-active');
    };

    onBeforeMount(async ()=>{
      // make local data for test
      const tempInfo = {
        'title': 'temp music title',
        'artist': 'temp music artist',
        'album': 'temp music album',
        'duration': '3:14',
      };
      for (let i=0; i<40; i++) {
        musicList.value.push(tempInfo);
      }
    });

    return {
      musicList,
      tableRowClick,
    };
  },
});
</script>

<template>
  <div style="display: flex; flex-direction: column; width: 100%; font-family: 'Microsoft YaHei',serif">
    <table id="table">
      <thead>
        <tr class="tableHead">
          <th>歌曲</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tr v-for="(item, index) in musicList" :key="index" class="tableRow" @click="tableRowClick($event)">
        <td class="tableItem">
          <span style="text-overflow: ellipsis; overflow: hidden">{{item.title}}</span>
          <div class="itemIcons">
            <img alt="play" class="icon" src="http://123.57.7.117/static/icon/MusicList/play.svg">
            <img alt="like" class="icon" src="http://123.57.7.117/static/icon/MusicList/like.svg">
            <img alt="add" class="icon" src="http://123.57.7.117/static/icon/MusicList/add.svg">
            <img alt="share" class="icon" src="http://123.57.7.117/static/icon/MusicList/share.svg">
          </div>
        </td>
        <td>{{item.artist}}</td>
        <td>{{item.album}}</td>
        <td>{{item.duration}}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.tableHead
{
  display: grid;
  grid-template-columns: 3fr 2fr 3fr 1fr;
  grid-gap: 1vw;
  height: 5vh;
  width: inherit;
  white-space: nowrap;
  text-align: left;
}
#table
{
  .tableRow
  {
    display: grid;
    align-items: center;
    grid-template-columns: 3fr 2fr 3fr 1fr;
    grid-gap: 2vw;
    height: 8vh;
    width: inherit;
    white-space: nowrap;
    font-size: 17px;
  }
  .tableRow:hover
  {
    background-color: rgba(0, 0, 0, .1);
    color:#f3263f;
  }
  .tableItem
  {
    align-items: center;
    display: flex;
    gap: 30%;
  }
  .itemIcons
  {
    width: auto;
    gap: .4vw;
    display: none;
  }
  .tableRow:hover > .tableItem >.itemIcons
  {
    display: inline-flex;
  }
  .is-active
  {
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .13);
    border-width: 1px 0 1px 0;
  }
  .icon
  {
    height: 3.2vh;
    aspect-ratio: 1/1;
  }
  .icon:hover
  {
    filter: sepia(1) saturate(10000%) hue-rotate(0deg);
  }
}
</style>
