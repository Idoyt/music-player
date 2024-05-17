<script>
import {defineComponent, onBeforeMount, ref} from 'vue';
import axios from 'axios';
import {API_BASE_URL} from '@/assets/constants';

export default defineComponent({
  name: 'TaskManager',
  setup() {
    const taskInfo = ref(null);

    onBeforeMount(async ()=>{
      const data = {'data': {}};
      const response = await axios.get(API_BASE_URL+'/get_task/', {params: data, withCredentials: true});
      if (response.data.state === 'success') {
        taskInfo.value = response.data.message;
        console.log(taskInfo);
      }
    });
  },
});
</script>

<template>
  <div id="TaskManagerBody">

  </div>
</template>

<style scoped>

</style>
