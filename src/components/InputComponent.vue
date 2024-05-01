<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'InputComponent',
  props: {
    value: String,
  },
});
</script>

<template>
  <div id="inputBody">
    {{$props.value}}
  </div>
</template>

<style scoped>

</style>
