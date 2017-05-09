<template>
  <div class="expression">
    <slot />
  </div>
</template>

<script>


export default {
  name: 'expression',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.expression {
  /*position: relative;*/
  padding-right: 7px;
  padding-left: 12px;
  background-color: #ddddaa;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;
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

.expression > span {
  /*padding-top: 8px;*/
  /*vertical-align: middle;*/
  /*height: 1em;*/
  /*display: inline-block;*/
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
  border-radius: 0;
  vertical-align: inherit;
}

.expression::before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(194, 225, 245, 0);
  border-left-color: white;
  border-width: 10px;
  margin-top: -10px;
  margin-right: -20px;
  z-index: 1;
}
</style>
