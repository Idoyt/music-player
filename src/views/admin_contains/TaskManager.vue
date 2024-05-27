<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';
import {tabBarProps} from 'element-plus';

export default defineComponent({
  name: 'TaskManager',
  computed: {
    tabBarProps() {
      return tabBarProps;
    },
  },
  setup() {
    const taskInfo = ref(null);
    const taskTableKeys = ref([]);
    const taskTitles = ref([]);
    const total = ref(0);

    const upper = (word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    };

    onBeforeMount(async ()=>{
      const data = {'data': {}};
      const response = await axios.get(API_BASE_URL+'/get_task/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        taskInfo.value = response.data.message;

        if (taskInfo.value.length === 0) return;

        taskTableKeys.value = Object.keys(taskInfo.value[0]);
        total.value = taskInfo.value.length;
        console.log(taskTableKeys.value);

        taskTableKeys.value.forEach((each)=>{
          let word = each.split('_');
          word = word.map(upper);
          word = word.join(' ');
          taskTitles.value.push(word);
        });
      }
    });

    return {
      taskInfo,
      taskTableKeys,
      taskTitles,
      total,
    };
  },
});
</script>

<template>
  <div id="TaskManagerBody">
    <div class="table">
      <div id="head" class="tableRow tableHead">
        <div v-for="(title) in taskTitles" :key="title" class="tableUnite">
          <span>{{title}}</span>
        </div>
      </div>
      <div id="data">
        <div v-for="(data, index) in taskInfo" :key="index" class="tableRow">
          <div v-for="(key) in taskTableKeys" :key="key" class="tableUnite">
            <span v-if="data[key]">{{data[key]}}</span>
            <span v-else-if="key==='task_priority'">0</span>
            <span v-else-if="!data[key]" style="color: #f3263f">Null</span>
          </div>
          <div>
            <button>更新</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </div>
    <el-pagination :total="total" layout="prev, pager, next" />
  </div>
</template>

<style scoped>
#TaskManagerBody
{
  height: 100%;
  width: 100%;
}
.table
{
  margin: 0 2vw 0 2vw;
  height: 90vh;
  width: auto;
  overflow: hidden;

  #data
  {
    display: flex;
    flex-direction: column;
    gap: 2vh;
  }
}
.tableHead
{
  font-size: 16px;
  text-overflow: clip;
}
.tableRow
{
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1vw;
  align-items: center;
}
.tableRow:hover
{
  background-color: #e7e7e7;
}
.tableUnite
{
  overflow: hidden;
  text-overflow: ellipsis;
}
.handleButton
{
  padding: 0;
  border: none;

  height: 5vh;
  width: 5vw;
  border-radius: 3vh;
}
</style>
