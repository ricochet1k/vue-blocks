<template>
  <div class="statements-hole">
    <div class="top-border"></div>
    <div class="stmts-list"
    v-dragula="value" 
    bag="vue-blocks-statements"
    @dragdrop="dragdrop($event)">
      <component v-for="stmt in value" 
        :is="statementComponent(stmt)" 
        :data="stmt"
        :key="keyFor(stmt)"
      />
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import BlockMixin from '../components/BlockMixin';
import { statements } from '../components/Statement';

export default {
  name: 'expression-hole',
  mixins: [BlockMixin],
  props: ['value'],
  data() {
    return {
    };
  },
  methods: {
    dragdrop(event) {
      console.log('stmt DRAGDROP', event);
      this.$emit('input', event.model);
    },
    statementComponent(stmt) {
      if (!stmt) return null;

      // console.log('statementComponent: ', stmt._name, stmt);
      return statements[stmt._name];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


.statements-hole {
  position: relative;
  display: inline-block;
  /*background-color: white;*/
  /*vertical-align: -100%;*/ /* why does this work?? */
}
.statements-hole > .stmts-list {
  position: relative;
  padding: 2px;
  min-height: 20px;
  min-width: 100px;
  /*display: inline-block;*/
  /*background-color: white;*/
  z-index: 0;
}


/*.block > .statements-hole:last-child::after {
  margin-left: -2px;
  margin-top: 2px;
  margin-bottom: -2px;
  border-bottom: 10px solid #8888ff;
  border-bottom-right-radius: 4px;
  width: 100px;
  height: 0px;
  content: " ";
  display: block;
  z-index: 1;
}*/

.statements-hole:before {
  bottom: 100%;
  left: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(136, 183, 213, 0);*/
  border-top-color: #8888ff;
  border-width: 5px;
  margin-left: -5px;
  margin-bottom: -13.5px;
  z-index: 2;
}
.statements-hole::after {
  top: 100%;
  left: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(194, 225, 245, 0);*/
  border-top-color: white;
  border-width: 5px;
  margin-left: -5px;
  margin-top: -6px;
  z-index: 1;
}

/*
.statements-hole::before {
  display: block;
  content: " ";
  background-color: white;
  position: absolute;
  height: 100%;
  /*width: 100vw;* /
  width: 200%;
  z-index: -100;
}
*/

.statements-hole > .top-border {
  width: 26px;
  height: 4px;
  background-color: #8888ff;
}
.statements-hole > .bottom-border {
  width: 26px;
  height: 6px;
  background-color: #8888ff;
}

.statements-hole > .stmts-list > .statement {
  margin-bottom: 3px;
}

.statements-hole > .stmts-list > .statement:last-child {
  margin-bottom: 0;
}

</style>
