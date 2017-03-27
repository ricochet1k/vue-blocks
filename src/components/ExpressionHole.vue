<template>
  <div class="expression-hole"
    v-dragula="dragArray" 
    service="vue-blocks-expressions"
    drake="main"
  >
    <component v-for="item in dragArray" :is="expressionComponent(item)" :data="item" />
  </div>
</template>

<script>
import Vue from 'vue';
// import { DragHandler } from 'vue2-dragula';
import { expressions } from '../components/Expression';

// class MyDragHandler extends DragHandler {

// }

// function createDragHandler({ctx, name, drake}) {
//   return new MyDragHandler({ ctx, name, drake })
// }

export default {
  name: 'expression-hole',
  props: ['value'],
  data() {
    let dragArray = [];
    if (this.value) {
      dragArray.push(this.value);
    }
    return {
      dragArray,
    };
  },
  watch: {
    dragArray: function(da) {
      console.log("watch dragArray", arguments)
      if (da[0] !== this.value)
        this.$emit('input', da[0]);
    },
    value: function(val) {
      console.log("watch value", arguments)
      if (val !== this.dragArray[0])
        this.$set(this.dragArray, 0, val);
    },
  },
  methods: {
    expressionComponent(item) {
      if (!item) return null;

      // console.log('expressionComponent: ', this.value._name, this.value);
      return expressions[item._name];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.expression-hole:empty {
  min-height: 1em;
  min-width: 20px;
}

.expression-hole > :nth-child(2) {
  display: none;
}

.expression-hole {
  position: relative;
  display: flex;
  align-self: stretch;
  align-items: stretch;
  background-color: white;
  padding: 1px;
  /*vertical-align: middle;*/
  border-radius: 2px;
  margin: 1px 0;
}

.block-text-inline > .expression-hole::before {
  border-left-color: #8888ff;
}

.block-right-hole > .expression-hole::before {
  border-left-color: #8888ff;
}

.block-text-inline.right-hole > .expression-hole:last-child::before {
  border-width: 9px;
  margin-top: -9px;
  margin-right: -17px;
}

.expression > .expression-hole::before {
  border-left-color: #ddddaa;
}

.expression-hole::before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(194, 225, 245, 0);*/
  border-width: 9px;
  margin-top: -9px;
  margin-right: -17.5px;
  z-index: 2;
}

.block-text-inline.right-hole > .expression-hole:last-child {
  display: flex;
  /*position: absolute;*/
  margin-left: 5px;
  width: auto;
  height: auto;
  min-height: none;
  min-width: none;
  background: white;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 0;
  padding: 0;
  padding-left: 1px;
}


</style>
