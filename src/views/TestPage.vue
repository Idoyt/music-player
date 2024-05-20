<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>


export default {
  setup() {
    const canvas = document.getElementById('canvas');
    canvas.fillStyle = 'Red';
    canvas.fillRect(0, 0, 100, 100);
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0);
}

#canvas {
  display: block;
  width: 100%;
  height: 600px;
  border-bottom: 2px solid #fff;
}

#audio {
  display: block;
  margin: 30px auto 0;
}

</style>
