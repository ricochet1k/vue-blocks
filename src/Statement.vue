<template>
  <div class="statement">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'statement',
  props: ['type'],
  data() {
    return {
    };
  },
  components: {
  },

  statements: {},
  registerStatement(ex) {
    this.statements[ex.name] = ex;
  },
};
</script>


<style>
.statement {
  position: relative;
  display: block;
  border-radius: 4px;
  border-left: 10px solid #8888ff;
  border-right: none;
  border-top: none;

  clip-path: polygon(0% 0%, 13px 0, 18px 5px, 23px 0, 100% 0%, 100% 120%, 0% 120%);
  transform-box: fill-box;
}

.statement > .block-text-inline > * {
  margin-right: 4px;
}
.statement > .block-text-inline > *:last-child {
  margin-right: 0;
}

.statement > .block-row > .block-left > * {
  margin-right: 4px;
}
.statement > .block-row > .block-left > *:last-child {
  margin-right: 0;
}

.statement > .block-text-inline:first-child {
  padding-top: 2px;
  border-top-right-radius: 4px;
}
.statement > .block-text-inline:last-child {
  padding-bottom: 2px;
  border-bottom-right-radius: 4px;
}

.statement > .block-row:first-child > .block-left {
  padding-top: 5px;
}
.statement > .block-row:last-child > .block-left {
  padding-bottom: 2px;
}


.statement > .block-text-inline {
  background-color: #8888ff;
  padding-right: 10px;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.statement > .block-row {
  padding-right: 10px;
  display: flex;
  position: relative;
}

.statement > .block-row > .block-left {
  background-color: #8888ff;
  display: flex;
  align-items: center;
  padding-right: 5px;
}

.statement > .block-row > .block-right-hole {
  position: relative;
  /*background-color: #8888ff;*/
  display: flex;
}

.statement > .block-text-inline.right-hole {
  display: table;
  padding-right: 0;
  border-right: none;
}

.statement > .block-text-inline.right-hole:before {
  display: none;
}

.statement > .block-text-inline > span {
  padding-top: 2px;
  display: table-cell;
}

.statement > .block-row > .block-left > span {
  display: table-cell;
}


.statement > .block-text-inline.right-hole::before {
  left: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(194, 225, 245, 0);
  border-left-color: #8888ff;
  border-width: 9px;
  margin-top: -9px;
}


.statement::after {
  top: 100%;
  left: 8px;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  display: block;
  position: absolute;
  pointer-events: none;
  border-top-color: #8888ff;
  border-width: 5px;
  margin-left: -5px;
  transform-box: fill-box;
}
@-moz-document url-prefix() {
  .statement::after {
    left:18px;
  }
}


</style>
