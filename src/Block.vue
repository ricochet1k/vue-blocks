<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'block',
  data() {
    return {
    };
  },
  components: {
  },

  blocks: {},
  registerBlock(b) {
    this.blocks[b.name] = b;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.block {
  display: flex;
  flex-direction: column;
  align-items: left;
  /*background-color: #8888ff;*/
  border-radius: 4px;
  border-left: 10px solid #8888ff;
  border-right: none;
  border-top: none;
  /*box-shadow: 4 3 2px black;*/
}
/*.block:after {
  border-bottom: 10px solid #8888ff;
  border-bottom-right-radius: 4px;
  width: 50px;
  height: 0px;
  content: " ";
  display: block;
}*/

.block > .block-text-inline:first-child {
  padding-top: 2px;
  border-top-right-radius: 4px;
}

.block > .block-text-inline {
  white-space: nowrap;
  background-color: #8888ff;
  padding-right: 10px;
  display: flex;
  align-items: center;
  /*flex: 0;*/
  position: relative;
}

.block > .block-text-inline > * {
  margin-right: 4px;
}
.block > .block-text-inline > *:last-child {
  margin-right: 0;
}

.block > .block-text-inline.right-hole {
  padding-right: 0;
  border-right: none;
}

.block > .block-text-inline > span {
  padding-top: 2px;
  vertical-align: middle;
}

.block > .block-text-inline > span,
.statement > .block-text-inline > span,
.expression > span {
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: -moz-none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

/*
.block-text-inline.right-hole::before {
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
*/
</style>
