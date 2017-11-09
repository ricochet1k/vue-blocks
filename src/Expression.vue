<template>
  <div class="expression" :data-type="type">
    <slot />
  </div>
</template>

<script>


export default {
  name: 'expression',
  props: ['type'],
  data() {
    return {
    };
  },
  components: {
  },

  expressions: {},
  registerExpression(ex) {
    this.expressions[ex.name] = ex;
  },
};
</script>

<style>
.expression {
  position: relative;
  padding-right: 7px;
  padding-left: 12px;
  background-color: #ddddaa;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;

  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% calc(50% + 10px), 10px 50%, 0 calc(50% - 10px));
}

.expression > * {
  margin-right: 4px;
}
.expression > *:last-child {
  margin-right: 0;
}

.expression.right-hole {
  padding-right: 0;
  border-right: none;
}

.expression.right-hole > .expression-hole:last-child {
  display: flex;
  align-items: stretch;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  /*padding-left: 0;*/
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  vertical-align: inherit;
}
</style>
