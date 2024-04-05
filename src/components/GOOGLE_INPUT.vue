<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Google_Input',
  props: {
    placeholder: {
      type: String,
      default: '输入内容',
    },
    status: {
      type: String,
      default: 'Correct',
    },
  },
  setup(props) {
    const inputText = ref('');
    const localStatus = ref(props.status);
    const domInput = ref(null);
    const domPlaceholder = ref(null);

    const focus = ()=>{
      if (!domInput.value) return;
      domInput.value.className = '';
      domInput.value.classList.add('input' + localStatus.value);

      domPlaceholder.value.className = '';
      domPlaceholder.value.classList.add('placeholder' + localStatus.value);
    };
    const blur = ()=>{
      console.log(1);
      if (inputText.value === '') {
        domInput.value.className='';
        domPlaceholder.value.className='';
      } else domInput.value.focus();
    };

    return {
      inputText,
      focus,
      blur,
      domInput,
      domPlaceholder,
    };
  },
});
</script>

<template>
  <div id="inputBox">
    <input
        id="input" ref="domInput"
        v-model="inputText"
        @blur="blur"
        @focus="focus"
        @input="$emit('value', inputText)"
    >
    <label id="placeholder" ref="domPlaceholder">{{$props.placeholder}}</label>
  </div>
</template>

<style scoped>
#inputBox
{
  position: relative;
  display: flex;
  align-items: center;

  width: 80%;

  --input_border-width: 2px;
}
#input
{
  z-index: 1;
  position: absolute;
  height: 8vh;
  width: inherit;

  padding: 0;
  border-width: var(--input_border-width);
  text-indent: calc(1vw + 1%);

  outline: none;
  box-sizing: border-box;
  border-style: solid;
  border-radius: 1vh;
  font-size: 2.5vh;
}
#input:focus
{
  border-width: .5vh;
}
#placeholder
{
  z-index: 2;
  position: absolute;
  margin-left: calc(var(--input_border-width) + 1vw);
  padding: 0 1% 0 1%;
  height: inherit;
  pointer-events: none;
  font-size: 2.5vh;
  background-color: white;
  white-space: nowrap;

  transform: translateY(0);
  transition-duration: .3s;
}
#input:focus + #placeholder
{
  font-size: 1.8vh;
  transform: translateY(-4vh);
}
.inputError
{
  border-color: #F3263F;
}
.inputCorrect
{
  border-color: #88cccc;
}
.placeholderError
{
  color: #F3263F;
}
.placeholderCorrect
{
  color: #88cccc;
}
</style>
