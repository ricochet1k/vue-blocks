<template>
  <div class="statement">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'statement',
  data() {
    return {
    };
  },
  components: {
  },

  statements: {},
  registerStatement(ex) {
    this.statements[ex.name] = ex;
    // return ex;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.statement {
  position: relative;
  display: table;
  border-radius: 4px;
  border-left: 10px solid #8888ff;
  border-right: none;
  border-top: none;
  /*z-index: 1;*/
}
/*.statement:after {
  border-bottom: 10px solid #8888ff;
  border-bottom-right-radius: 4px;
  width: 50px;
  height: 0px;
  content: " ";
  display: block;
}*/

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
  /*border-top-right-radius: 4px;*/
}
.statement > .block-row:last-child > .block-left {
  padding-bottom: 2px;
  /*border-bottom-right-radius: 4px;*/
}


.statement > .block-text-inline {
  background-color: #8888ff;
  padding-right: 10px;
  display: flex;
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

/*.statement > .block-row > .block-right-hole > .statements-hole {
  border-top: 5px solid #8888ff;
  border-bottom: 5px solid #8888ff;
}*/

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
  /*vertical-align: text-bottom;*/
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


.statement:before {
  bottom: 100%;
  left: 8px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(136, 183, 213, 0);*/
  border-top-color: white;
  border-width: 5px;
  margin-left: -5px;
  margin-bottom: -9.8px;
  z-index: 1;
}
.statement:after {
  top: 100%;
  left: 8px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(194, 225, 245, 0);*/
  border-top-color: #8888ff;
  border-width: 5px;
  margin-left: -5px;
  /*margin-top: -10px;*/
  z-index: 2;
}


</style>
