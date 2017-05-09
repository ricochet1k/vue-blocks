<template>
  <div class="blockscontainer" ref="container">
    <top-level-block class="abs-object" 
      v-for="(blk, index) in data.blocks" 
      :key="keyFor(blk)"
      :style="{left: blk.x+'px', top: blk.y+'px'}"
      bag="vue-blocks-blocks"
      :component="blockComponent(blk.block)"
      :data="blk.block"
      @input="onDraggedOut(data.blocks, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(exp, index) in data.expressions" 
      :key="keyFor(exp)"
      :style="{left: exp.x+'px', top: exp.y+'px'}"
      bag="vue-blocks-expressions" 
      :component="expressionComponent(exp.expression)"
      :data="exp.expression"
      @input="onDraggedOut(data.expressions, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(stmt, index) in data.statements" 
      :key="keyFor(stmt)"
      :style="{left: stmt.x+'px', top: stmt.y+'px'}"
      bag="vue-blocks-statements" 
      :component="statementComponent(stmt.statement)"
      :data="stmt.statement"
      @input="onDraggedOut(data.statements, index)" />
  </div>
</template>

<script>
import Vue from 'vue';

import Block from '../components/Block';
import BlockMixin from '../components/BlockMixin';
import Expression from '../components/Expression';
import Statement from '../components/Statement';
import StatementsHole from '../components/StatementsHole';
import ExpressionHole from '../components/ExpressionHole';
import TopLevelBlock from '../components/TopLevelBlock';

export default {
  name: 'blockscontainer',
  mixins: [BlockMixin],
  props: ['data'],
  components: {
    StatementsHole,
    ExpressionHole,
    TopLevelBlock,
  },
  mounted() {
    this.init();
  },
  methods: {
    blockComponent: function(block) {
      return Block.blocks[block._name];
    },
    expressionComponent: function(expression) {
      return Expression.expressions[expression._name];
    },
    statementComponent: function(statement) {
      return Statement.statements[statement._name];
    },
    onDraggedOut: function(container, index) {
      console.log('onDraggedOut', container, index);
      container.splice(index, 1);
    },

    init() {
      console.log('vueDragula', Vue.dragula);
      let vD = this.$dragula;

      let clone;
      let removed;

      console.log('init', this.$refs.container);


      this.$dragula.eventBus.$on('drop-model',
        (bagName, el, dropTarget, dropSource, dropIndex) => {
          console.log('dropModel: ', bagName, el, dropTarget, dropSource, dropIndex)
          // this.updateModel(dropTarget, dropSource)
        }
      )

      this.$dragula.eventBus.$on('remove-model',
        (bagName, el, removeSource, removeIndex) => {
          console.log('removeModel: ', bagName, el, removeSource, removeIndex)
          // this.updateModel(dropTarget, dropSource)
          removed = removeSource.removed;
        }
      )

      vD.options('vue-blocks-blocks', {
        mirrorContainer: this.$refs.container,
        moves: (el, target, source, sibling) => {
          // console.log('moves', el, target, source, sibling);
          return true;
        },
        accepts: (el, target, source, sibling) => {
          // console.log('accepts', el, target, source, sibling);
          // return target.children.length === 0;
        },
        invalid: (el, handle) => {
          let ret = false;
          if (el.classList.contains('expression') || el.classList.contains('statement'))
            ret = true;
          else
            ret = false;

          console.log('block invalid', ret, el, handle);
          return ret;
        },
      });

      this.blockBag = vD.getDrake('vue-blocks-blocks');

      this.blockBag.on({
        drag: ({ el, container, service, drake }) => {
          // el.classList.remove('ex-moved');
        },
        drop: (e) => {
          let { el, container } = e;
          // el.classList.add('ex-moved');
          // console.log('drop', e, el, container);
        },
        over: ({ el, container }) => {
          // el.classList.add('ex-over');
        },
        out: ({ el, container }) => {
          // el.classList.remove('ex-over');
        },
      })

      vD.options('vue-blocks-expressions', {
        mirrorContainer: this.$refs.container,
        direction: 'vertical',
        removeOnSpill: true,
        // copy: false,
        moves: (el, target, source, sibling) => {
          // console.log('moves', el, target, source, sibling);
          return true;
        },
        accepts: (el, target, source, sibling) => {
          // console.log('accepts', el, target.children.length, target, source, sibling);
          // return target.children.length < 2;
          return target.classList.contains('empty');
          // return true;
        },
        invalid: (el, handle) => {
          // console.log('invalid', el, handle);
          // if (el.classList.contains('expression'))
          //   return true;
          return false;
        },
      });

      this.expressionBag = vD.getDrake('vue-blocks-expressions');

      this.expressionBag.on('drag', (e) => {
        let { el, container, service, drake } = e;
        // el.classList.remove('ex-moved');
        // console.log('drag', e);
      })
      this.expressionBag.on('drop', (e) => {
        let { el, container } = e;
        // el.classList.add('ex-moved');
        // console.log('drop', e);
      })
      this.expressionBag.on('over', (e) => {
        let { el, container } = e;
        // el.classList.add('ex-over');
        // console.log('over', e);
      })
      this.expressionBag.on('out', (e) => {
        let { el, container } = e;
        // el.classList.remove('ex-over');
        // console.log('out', e);
      })
      this.expressionBag.on('cancel', (e) => {
        console.log('cancel', e);
      })
      this.expressionBag.on('dragend', (e) => {
        // console.log('dragend', e);
      })
      this.expressionBag.on('shadow', function (e) {
        // console.log('shadow', arguments);
      })
      this.expressionBag.on('cloned', (e) => {
        console.log('cloned', e);
        clone = e;
      })
      this.expressionBag.on('remove', (e) => {
        let x = clone.style.left.slice(0, -2);
        let y = clone.style.top.slice(0, -2);
        // x and y are 'fixed' positions, so change them to be relative to the container
        x -= this.$refs.container.offsetLeft;
        y -= this.$refs.container.offsetTop;
        console.log('remove', e, clone, x, y, removed);
        this.data.expressions.push({x, y, expression: removed});
      })

      vD.options('vue-blocks-statements', {
        mirrorContainer: this.$refs.container,
        moves: (el, target, source, sibling) => {
          // console.log('moves', el, target, source, sibling);
          return true;
        },
        accepts: (el, target, source, sibling) => {
          // console.log('accepts', el, target, source, sibling);
          return true;
        },
        invalid: (el, handle) => {
          // console.log('invalid', el, handle);
          if (el.classList.contains('expression'))
            return true;
          return false;
        },
      });

      this.statementBag = vD.getDrake('vue-blocks-statements');

      // this.statementService.on({
      //   drag: ({ el, container, service, drake }) => {
      //     el.classList.remove('ex-moved');
      //   },
      //   drop: ({ el, container }) => {
      //     el.classList.add('ex-moved');
      //     console.log('drop', el, container);
      //   },
      //   over: ({ el, container }) => {
      //     el.classList.add('ex-over');
      //   },
      //   out: ({ el, container }) => {
      //     el.classList.remove('ex-over');
      //   },
      // })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.blockscontainer {
  position: relative;
  background-color: gray;
}

.blockscontainer .gu-mirror {
  display: table;
  box-sizing: border-box;
}

.objcontainer {
  /*position: absolute;*/
  /*left: 0;
  width: 100%;
  top: 0;
  height: 100%;*/
}

.gu-hide {
  display: block;
}

.abs-object {
  position: absolute;
}
</style>
