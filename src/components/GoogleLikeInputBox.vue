<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {STATIC_BASE_URL} from '@/assets/constants';

export default defineComponent({
  name: 'Google_Input',
  props: {
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    needSelect: {
      type: Boolean,
      default: true,
    },
    checkResult: {
      type: Number,
      default: -1,
    },
  },
  setup(props, {emit}) {
    // param for main content
    const inputText = ref('');

    // param for dom
    const domInput = ref(null);
    const domPlaceholder = ref(null);

    // param for status
    const inputType = ref('text');
    const isPwd = ref(false);
    const showPwdState = ref('clos');
    const allowedType = ['text', 'password'];

    const imageSrc = computed(()=>{
      return STATIC_BASE_URL+'/static/icon/google_input/eye_' + showPwdState.value + '_gray.svg';
    });

    // check input type is allowed or not, if not , change it to 'text' type
    inputType.value = allowedType.includes(props.type) ? props.type : 'text';
    isPwd.value = (inputType.value === 'password');

    const focusStyle = ()=>{
      if (!domInput.value) return;
      domInput.value.classList.add('inputCorrect');
      domInput.value.classList.add('inputFocus');

      domPlaceholder.value.classList.add('placeholderCorrect');
      domPlaceholder.value.classList.add('placeholderFocus');
    };
    const focus = ()=>{
      focusStyle();
      if (props.needSelect && inputText.value!=='') domInput.value.select();
    };
    const blur = ()=>{
      if (inputText.value === '') {
        domPlaceholder.value.classList.remove('placeholderFocus');
      } else focusStyle();
      if (domPlaceholder.value !== null && domInput.value !== null) {
        domPlaceholder.value.classList.remove('placeholderCorrect');
        domInput.value.classList.remove('inputCorrect');
        domInput.value.classList.remove('inputFocus');
      }
    };
    const showPassword = ()=>{
      showPwdState.value = showPwdState.value === 'clos' ? 'open' : 'clos';
      inputType.value = showPwdState.value === 'clos' ? 'password' : 'text';
    };

    const returnValue = ()=>{
      emit('update:modelValue', inputText.value);
    };

    onMounted(()=>{
      if (inputType.value === 'password') {
        if (!domInput.value) return;
        domInput.value.classList.add('inputPwd');
      } else {
        if (!domInput.value) return;
        domInput.value.classList.remove('inputPwd');
      }
    });

    watch(()=>props.checkResult, (value)=>{
      if (value === 0) {
        console.log('fail');
      }
      if (value === 1) {
        console.log('success');
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
      returnValue,
    };
  },
});
</script>

<template>
  <div>
    <div id="inputBox">
      <input
          ref="domInput"
          v-model="inputText"
          :type=inputType
          class="input"
          @blur="blur"
          @focus="focus"
          @input="returnValue"
      >
      <label ref="domPlaceholder" class="placeholder">{{$props.placeholder}}</label>
      <img
          v-if="isPwd && inputText !== ''"
          id="showPwd"
          :src=imageSrc
          @click = showPassword
          alt="none"
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

  width: 100%;
  height: 10vh;

  --input_border-width: 2px;
  --input-height: 8vh;
  --input-width: 100%;
}
.input
{
  z-index: 1;
  position: absolute;
  height: var(--input-height);
  width: var(--input-width);

  padding: 0;
  border-width: var(--input_border-width);
  text-indent: calc(1vw + 1%);

  outline: none;
  box-sizing: border-box;
  border-style: solid;
  border-radius: 1vh;
  font-size: calc(2.5/8 * var(--input-height));
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
  pointer-events: none;
  font-size: calc(2.5/8 * var(--input-height));
  background-color: white;
  white-space: nowrap;

  transform: translateY(0);
  transition-duration: .3s;
}
.placeholderFocus
{
  font-size: calc(1.8/8 * var(--input-height)) !important;
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
