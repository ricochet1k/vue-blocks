<template>
  <block>
    <div class="block-text-inline">
      <span>turn left by</span>
      <expression-hole v-model="data.one" />
      <span>degrees</span>
    </div>
    <div class="block-text-inline right-hole">
      <span>only if this was really a lot longer</span>
      <expression-hole v-model="data.two" type="number" />
    </div>
    <div class="block-text-inline">
      <span>turn right by</span>
      <expression-hole v-model="data.three" />
      <span>degrees</span>
    </div>
    <statements-hole v-model="data.statements" />
  </block>
</template>

<script>
import {
  Block,
  Expression,
  ExpressionHole,
  Statement,
  StatementsHole,
} from 'src';

export default {
  name: 'testblock',
  props: ['data'],
  components: {
    Block,
    ExpressionHole,
    StatementsHole,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
