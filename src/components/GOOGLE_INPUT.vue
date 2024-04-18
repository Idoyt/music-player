<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue';

export default defineComponent({
  name: 'Google_Input',
  props: {
    placeholder: {
      type: String,
      default: '输入内容',
      validator: (value) => {
        return value.length < 21;
      },
    },
    status: {
      type: String,
      default: 'Correct',
      validator: (value) => {
        const allowedValue = ['Correct', 'Error'];
        return allowedValue.includes(value);
      },
    },
    type: {
      type: String,
      // text, password
      default: 'text',
      validator: (value) => {
        const allowedValue = ['text', 'password'];
        return allowedValue.includes(value);
      },
    },
    checkMethod: {
      type: Array,
      // required: true,
      validator: (value) => {
        if (value.length > 10) return false;
        else {
          value.forEach((item)=>{
            if (typeof (item) !== 'function') return false;
          });
          return true;
        }
      },
    },
    checkTriggerTime: {
      type: Object,
      // {input, none}  {submit, chang this after submit finished} {none, none}
      default: {time: 'none', trigger: 'none'},
      validator: (value)=>{
        if (!value) return false;
        const allowedKeys = ['none', 'input', 'submit'];
        const allowedObject = {none: ['none'], input: ['none'], submit: ['true', 'false']};
        if (allowedKeys.includes(value['time'])) {
          return allowedObject[value['time']].includes(value['trigger']);
        } else return false;
      },
    },
  },
  setup(props) {
    // param for main content
    const inputText = ref('');

    // param for dom
    const domInput = ref(null);
    const domPlaceholder = ref(null);

    // param for status
    const inputType = ref('text');
    const isPwd = ref(false);
    const showPwdStatus = ref('clos');
    const allowedType = ['text', 'password'];

    const imageSrc = computed(()=>{
      return 'http://101.201.66.67/static/icon/google_input/eye_' + showPwdStatus.value + '_gray.svg';
    });

    // check input type is allowed or not, if not , change it to 'text' type
    inputType.value = allowedType.includes(props.type) ? props.type : 'text';
    isPwd.value = (inputType.value === 'password');

    const focus = ()=>{
      if (!domInput.value) return;
      domInput.value.classList.add('input' + props.status);
      domInput.value.classList.add('inputFocus');

      domPlaceholder.value.classList.add('placeholder' + props.status);
      domPlaceholder.value.classList.add('placeholderFocus');
      // console.log(domPlaceholder.value.classList);
    };
    const blur = ()=>{
      if (inputText.value === '') {
        domPlaceholder.value.classList.remove('placeholderFocus');
        showPassword();
      } else focus();
      domPlaceholder.value.classList.remove('placeholder' + props.status);
      domInput.value.classList.remove('input' + props.status);
      domInput.value.classList.remove('inputFocus');
    };
    const showPassword = ()=>{
      showPwdStatus.value = showPwdStatus.value === 'clos' ? 'open' : 'clos';
      inputType.value = showPwdStatus.value === 'clos' ? 'password' : 'text';
    };

    const checkWhileInput = ()=>{
      console.log('checking on while');
    };
    const checkAfterInput = ()=>{
      console.log('checking on after');
    };
    onMounted(()=>{
      if (inputType.value === 'password') {
        if (!domInput.value) return;
        domInput.value.classList.add('inputPwd');
      }

      const checktTime = props.checkTriggerTime['time'];
      if (checktTime == 'input') {
        watch(inputText, ()=>{
          props.checkMethod.forEach((item)=>{
            console.log(item);
          });
        });
      } else if (checktTime == 'submit') {
        const checktTime = ref(props.checkTriggerTime['trigger']);
        watch(checktTime, ()=>{
          if (checktTime.value == 'true') {
            console.log(props.checkMethod);
            // props.checkMethod.forEach((item)=>item(inputText.value));
          }
        });
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
