<script>
import {computed, defineComponent, onMounted, ref} from 'vue';

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
    type: {
      type: String,
      // text, password
      default: 'text',
    },
  },
  setup(props) {
    const inputText = ref('');
    const localStatus = ref(props.status);
    const domInput = ref(null);
    const domPlaceholder = ref(null);
    const inputType = ref('text');
    const isPwd = ref(false);
    const showPwdStatus = ref('clos');
    const allowedType = ['text', 'password'];
    const imageSrc = computed(()=>{
      return 'http://101.201.66.67/static/icon/google_input/eye_' + showPwdStatus.value + '_gray.svg';
    });

    inputType.value = allowedType.includes(props.type) ? props.type : 'text';
    isPwd.value = (inputType.value === 'password');

    const focus = ()=>{
      if (!domInput.value) return;
      domInput.value.classList.add('input' + localStatus.value);
      domInput.value.classList.add('inputFocus');

      domPlaceholder.value.classList.add('placeholder' + localStatus.value);
      domPlaceholder.value.classList.add('placeholderFocus');
    };
    const blur = ()=>{
      if (inputText.value === '') {
        domInput.value.classList.remove('input' + localStatus.value);
        domInput.value.classList.remove('inputFocus');

        domPlaceholder.value.classList.remove('placeholder' + localStatus.value);
        domPlaceholder.value.classList.remove('placeholderFocus');
        showPassword();
      } else focus();
    };
    const showPassword = ()=>{
      showPwdStatus.value = showPwdStatus.value === 'clos' ? 'open' : 'clos';
      inputType.value = showPwdStatus.value === 'clos' ? 'password' : 'text';
    };
    onMounted(()=>{
      if (inputType.value === 'password') {
        if (!domInput.value) return;
        domInput.value.classList.add('inputPwd');
      }
    });

    return {
      inputText,
      focus,
      blur,
      domInput,
      domPlaceholder,
      inputType,
      showPassword,
      isPwd,
      imageSrc,
    };
  },
});
</script>

<template>
  <div>
    <div id="inputBox">
      <input
          ref="domInput" v-model="inputText"
          :type=inputType
          class="input"
          @blur="blur"
          @focus="focus"
          @input="$emit('value', inputText)"
      >
      <label ref="domPlaceholder" class="placeholder">{{$props.placeholder}}</label>
      <img
          v-if="isPwd && inputText !== ''"
          id="showPwd"
          :src=imageSrc
          @click = showPassword
      />
    </div>

  </div>

</template>

<style scoped>
#inputBox
{
  position: relative;
  display: flex;
  align-items: center;

  width: 20vw;

  --input_border-width: 2px;
  --input-height: 8vh;
}
.input
{
  z-index: 1;
  position: absolute;
  height: var(--input-height);
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
.inputFocus
{
  border-width: .5vh !important;
}
.placeholder
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
.placeholderFocus
{
  font-size: 1.8vh !important;
  transform: translateY(-4vh) !important;
}
.inputError
{
  border-color: #F3263F;
}
.inputCorrect
{
  border-color: #88cccc;
}
.inputPwd
{
  padding-right: 3vw;
}
.placeholderError
{
  color: #F3263F;
}
.placeholderCorrect
{
  color: #88cccc;
}

#showPwd
{
  z-index: 3;
  position: absolute;
  width: 2vw;
  right: 1vw;
}
</style>
