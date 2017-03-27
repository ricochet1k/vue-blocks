<template>
  <expression>
    <span>{{data.value}}</span>
  </expression>
</template>

<script>
import Expression from '../components/Expression';

export default {
  name: 'number',
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
