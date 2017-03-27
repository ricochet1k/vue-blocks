<template>
  <div class="toplevelblock"
    v-dragula="dragArray" 
    :service="service"
    :drake="drake"
  >
    <component v-for="item in dragArray" :is="component" :data="item" />
  </div>
</template>

<script>
import Vue from 'vue';
import { expressions } from '../components/Expression';

export default {
  name: 'top-level-block',
  props: ['data', 'service', 'drake', 'component'],
  data() {
    let dragArray = [];
    if (this.data) {
      dragArray.push(this.data);
    }
    return {
      dragArray,
    };
  },
  watch: {
    dragArray: function(da) {
      console.log("watch dragArray", arguments)
      this.$emit('input', da[0]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
