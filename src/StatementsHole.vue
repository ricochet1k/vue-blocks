<template>
  <div class="statements-hole">
    <div class="top-border"></div>
    <div class="stmts-list"
    v-dragula="safeValue"
    bag="vue-blocks-statements"
    @dragdrop="dragdrop($event)">
      <component v-for="stmt in value"
        :is="statementComponent(stmt)"
        :data="stmt"
        :key="keyFor(stmt)"
      />
    </div>
    <div class="bottom-border"></div>
  </div>
</template>

<script>
import BlockMixin from './BlockMixin';
import { statements } from './Statement';

export default {
  name: 'statements-hole',
  mixins: [BlockMixin],
  props: ['value', 'type'],
  data() {
    return {
    };
  },
  methods: {
    dragdrop(event) {
      // console.log('stmt DRAGDROP', event);
      this.$emit('input', event.model);
    },
    statementComponent(stmt) {
      if (!stmt) return null;

      return statements[stmt._name];
    },
  },
  computed: {
    safeValue() {
      return this.value || [];
    }
  }
};
</script>


<style>
.statements-hole {
  position: relative;
  display: inline-block;
}
.statements-hole > .stmts-list {
  position: relative;
  padding: 2px;
  min-height: 20px;
  min-width: 100px;
  z-index: 0;
}


.statements-hole > .top-border:after {
  bottom: 100%;
  left: 20px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  /*border-color: rgba(136, 183, 213, 0);*/
  border-top-color: #8888ff;
  border-width: 5px;
  margin-left: -5px;
  margin-bottom: -13.5px;
  z-index: 2;
}

.statements-hole > .top-border {
  width: 26px;
  height: 4px;
  background-color: #8888ff;
}
.statements-hole > .bottom-border {
  width: 26px;
  height: 6px;
  background-color: #8888ff;

  clip-path: polygon(0% 0%, 15px 0, 20px 5px, 25px 0, 100% 0%, 100% 120%, 0% 120%);
}

.statements-hole > .stmts-list > .statement {
  margin-bottom: 3px;
}

.statements-hole > .stmts-list > .statement:last-child {
  margin-bottom: 0;
}

</style>
