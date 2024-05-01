<template>
  <div>
    <GOOGLE_INPUT @value=data1></GOOGLE_INPUT>
    <div>{{data1}}</div>
    <GOOGLE_INPUT @value=data2></GOOGLE_INPUT>
    <div>{{data2}}</div>
  </div>
</template>
<script>

import GOOGLE_INPUT from '@/components/GOOGLE_INPUT.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    GOOGLE_INPUT,
  },
  setup() {
    const data1 = ref(233);
    const data2 = ref(233);

    watch(data1, (value)=>{
      console.log(value);
    });

    return {data1, data2};
  },
};
</script>
