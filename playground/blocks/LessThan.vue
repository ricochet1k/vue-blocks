<template>
  <expression>
    <expression-hole v-model="data.left" />
    <span>&lt;</span>
    <expression-hole v-model="data.right" />
  </expression>
</template>

<script>
import {Expression, ExpressionHole} from 'src';

export default {
  name: 'lessthan',
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
