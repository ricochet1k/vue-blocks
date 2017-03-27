<template>
  <statement>
    <div class="block-row">
      <div class="block-left">
        <span>if</span>
      </div>
      <div class="block-right-hole">
        <expression-hole v-model="data.condition" />
      </div>
    </div>
    <div class="block-row">
      <div class="block-left">
        <span>do</span>
      </div>
      <div class="block-right-hole">
        <statements-hole v-model="data.stmts" />
      </div>
    </div>
  </statement>
</template>

<script>
import Statement from '../components/Statement';
import ExpressionHole from '../components/ExpressionHole';
import StatementsHole from '../components/StatementsHole';

export default {
  name: 'ifthen',
  props: ['data'],
  data() {
    return {
    };
  },
  components: {
    Statement,
    ExpressionHole,
    StatementsHole,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
