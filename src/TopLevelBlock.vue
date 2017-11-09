<template>
  <div class="toplevelblock never-accept"
    :class="{disappear: disappear}"
    v-dragula="dragArray" 
    :bag="bag"
    @dg-drag="drag"
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
import BlockMixin from './BlockMixin';
import { expressions } from './Expression';

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
      disappear: false,
    };
  },
  methods: {
    drag($event) {
      this.disappear = true;
    },
    dragdrop(event) {
      this.$emit('input', event.model[0]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.toplevelblock {
  filter: drop-shadow(2px 2px 1px #444444);
  width: max-content;
  width: -moz-max-content;
}

.disappear {
  display: none;
}


</style>
