<template>
  <expression>
    <span :style="{'background-color': 'green', width: '50px', height: '50px'}"></span>
  </expression>
</template>

<script>
import Expression from '../components/Expression';

export default {
  name: 'square',
  props: ['data'],
  data() {
    return {
    };
  },
  components: {
    Expression,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
