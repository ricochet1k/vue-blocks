<template>
  <div class="toplevelblock"
    v-dragula="dragArray" 
    :bag="bag"
    @dragdrop="dragdrop($event)"
  >
    <component v-for="item in dragArray" 
      :is="component" 
      :data="item"
      :key="keyFor(item)" 
      />
  </div>
</template>

<script>
import Vue from 'vue';
import BlockMixin from '../components/BlockMixin';
import { expressions } from '../components/Expression';

export default {
  name: 'top-level-block',
  mixins: [BlockMixin],
  props: ['data', 'bag', 'component'],
  data() {
    let dragArray = [];
    if (this.data) {
      dragArray.push(this.data);
    }
    return {
      dragArray,
    };
  },
  // watch: {
  //   dragArray: function(da) {
  //     console.log("watch dragArray", arguments)
  //     this.$emit('input', da[0]);
  //   },
  // },
  methods: {
    dragdrop(event) {
      this.dragArray = event.model;
      if (event.removed) this.$emit('input', event.model[0]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
