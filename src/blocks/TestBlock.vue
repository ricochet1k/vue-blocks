<template>
  <block>
    <div class="block-text-inline">
      <span>turn left by</span>
      <expression-hole v-model="data.one" />
      <span>degrees</span>
    </div>
    <div class="block-text-inline right-hole">
      <span>only if this was really a lot longer</span>
      <expression-hole v-model="data.two" />
    </div>
    <div class="block-text-inline">
      <span>turn right by</span>
      <expression-hole v-model="data.three" />
      <span>degrees</span>
    </div>
    <statements-hole v-model="data.statements">
      <div class="block">
        <div class="block-text-inline">
          <span>turn left by</span>
          <div class="expression-hole">
            <div class="expression">
              <span>15</span>
            </div>
          </div>
          <span>degrees</span>
        </div>
        <div class="statements-hole">
          <div class="block">
            <div class="block-text-inline">
              <span>turn left by</span>
              <div class="expression-hole">
                <div class="expression">
                  <span>15</span>
                </div>
              </div>
              <span>degrees</span>
            </div>
          </div>
        </div>
      </div>
    </statements-hole>
  </block>
</template>

<script>
import Block from '../components/Block';
import ExpressionHole from '../components/ExpressionHole';
import StatementsHole from '../components/StatementsHole';

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
