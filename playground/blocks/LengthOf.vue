<template>
  <expression class="right-hole">
    <span>length of</span>
    <expression-hole v-model="data.value" />
  </expression>
</template>

<script>
import {Expression, ExpressionHole} from 'src';

export default {
  name: 'lengthof',
  props: ['data'],
  data() {
    return {
    };
  },
  components: {
    Expression,
    ExpressionHole,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
