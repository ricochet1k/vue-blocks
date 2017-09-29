<template>
  <statement>
    <div class="block-text-inline">
      <span>turn left by</span>
      <expression-hole type="number" v-model="data.value" />
      <span>degrees</span>
    </div>
  </statement>
</template>

<script>
import {Statement, ExpressionHole} from 'src';

export default {
  name: 'turnleft',
  props: ['data'],
  data() {
    return {
    };
  },
  components: {
    Statement,
    ExpressionHole,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
