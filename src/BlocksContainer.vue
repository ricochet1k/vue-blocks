<template>
  <div class="blockscontainer" ref="container">
    <top-level-block class="abs-object" 
      v-for="(blk, index) in data.blocks" 
      :key="keyFor(blk)"
      :style="{left: blk.x+'px', top: blk.y+'px'}"
      bag="vue-blocks-blocks"
      :component="blockComponent(blk.block)"
      :data="blk.block"
      @input="dragdrop(data.blocks, index, 'block', $event)" />
    
    <top-level-block class="abs-object" 
      v-for="(exp, index) in data.expressions" 
      :key="keyFor(exp)"
      :style="{left: exp.x+'px', top: exp.y+'px'}"
      bag="vue-blocks-expressions" 
      :component="expressionComponent(exp.expression)"
      :data="exp.expression"
      @input="dragdrop(data.expressions, index, 'expression', $event)" />
    
    <top-level-block class="abs-object" 
      v-for="(stmt, index) in data.statements" 
      :key="keyFor(stmt)"
      :style="{left: stmt.x+'px', top: stmt.y+'px'}"
      bag="vue-blocks-statements" 
      :component="statementComponent(stmt.statement)"
      :data="stmt.statement"
      @input="dragdrop(data.statements, index, 'statement', $event)" />
  </div>
</template>

<script>
import Block from './Block';
import BlockMixin from './BlockMixin';
import Expression from './Expression';
import Statement from './Statement';
import StatementsHole from './StatementsHole';
import ExpressionHole from './ExpressionHole';
import TopLevelBlock from './TopLevelBlock';

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
    dragdrop: function(container, index, key, value) {
      // console.log('dragdrop', container, index, key, value);
      if (!value)
        container.splice(index, 1);
      else
        container[index][key] = value;
    },

    init() {
      console.log('vueDragula', this.$dragula);
      let vD = this.$dragula;

      let clone;
      let removed;

      console.log('init', this.$refs.container);


      this.$dragula.eventBus.$on('drop-model',
        (bagName, el, dropTarget, dropSource, dropIndex) => {
          // console.log('dropModel: ', bagName, el, dropTarget, dropSource, dropIndex)
          // this.updateModel(dropTarget, dropSource)
        }
      )

      this.$dragula.eventBus.$on('remove-model',
        (bagName, el, removeSource, removeIndex) => {
          // console.log('removeModel: ', bagName, el, removeSource, removeIndex)
          // this.updateModel(dropTarget, dropSource)
          removed = removeSource.removed;
        }
      )

      vD.options('vue-blocks-blocks', {
        mirrorContainer: this.$refs.container,
        removeOnSpill: true,
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

          // console.log('block invalid', ret, el, handle);
          return ret;
        },
      });

      this.blockBag = vD.getDrake('vue-blocks-blocks');
      this.blockBag.on('cloned', (e) => {
        // console.log('cloned', e);
        clone = e;
      })
      this.blockBag.on('remove', (e) => {
        let x = clone.style.left.slice(0, -2);
        let y = clone.style.top.slice(0, -2);
        // x and y are 'fixed' positions, so change them to be relative to the container
        x -= this.$refs.container.offsetLeft;
        y -= this.$refs.container.offsetTop;
        // console.log('remove', e, clone, x, y, removed);
        this.data.blocks.push({x, y, block: removed});
      })

      // this.blockBag.on({
      //   drag: ({ el, container, service, drake }) => {
      //     // el.classList.remove('ex-moved');
      //   },
      //   drop: (e) => {
      //     let { el, container } = e;
      //     // el.classList.add('ex-moved');
      //     // console.log('drop', e, el, container);
      //   },
      //   over: ({ el, container }) => {
      //     // el.classList.add('ex-over');
      //   },
      //   out: ({ el, container }) => {
      //     // el.classList.remove('ex-over');
      //   },
      // })

      vD.options('vue-blocks-expressions', {
        mirrorContainer: this.$refs.container,
        // direction: 'horizontal',
        removeOnSpill: true,
        // copy: false,
        moves: (el, target, source, sibling) => {
          // console.log('moves', el, target, source, sibling);
          return true;
        },
        accepts: (el, target, source, sibling) => {
          console.log('accepts', el, target, source);
	  let targetType = target.dataset.type;
	  let sourceType = el.dataset.type;
	  console.log('accepts vue', target.__vue__, source.__vue__);
	  console.log('accepts type', targetType, sourceType);
	  if (targetType && sourceType && targetType != sourceType)
	    return false;
          // return target.children.length < 2;
          let cl = target.classList;
          if (cl.contains('never-accept')) return false;
          if (cl.contains('only-one')) return cl.contains('empty');
          return true;
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
        // console.log('cancel', e);
      })
      this.expressionBag.on('dragend', (e) => {
        // console.log('dragend', e);
      })
      this.expressionBag.on('shadow', function (e) {
        // console.log('shadow', arguments);
      })
      this.expressionBag.on('cloned', (e) => {
        // console.log('cloned', e);
        clone = e;
      })
      this.expressionBag.on('remove', (e) => {
        let x = clone.style.left.slice(0, -2);
        let y = clone.style.top.slice(0, -2);
        // x and y are 'fixed' positions, so change them to be relative to the container
        x -= this.$refs.container.offsetLeft;
        y -= this.$refs.container.offsetTop;
        // console.log('remove', e, clone, x, y, removed);
        this.data.expressions.push({x, y, expression: removed});
      })

      vD.options('vue-blocks-statements', {
        mirrorContainer: this.$refs.container,
        removeOnSpill: true,
        moves: (el, target, source, sibling) => {
          // console.log('moves', el, target, source, sibling);
          return true;
        },
        accepts: (el, target, source, sibling) => {
          // console.log('accepts', el, target, source, sibling);
          let cl = target.classList;
          if (cl.contains('never-accept')) return false;
          if (cl.contains('only-one')) return cl.contains('empty');
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
      this.statementBag.on('cloned', (e) => {
        // console.log('cloned', e);
        clone = e;
      })
      this.statementBag.on('remove', (e) => {
        let x = clone.style.left.slice(0, -2);
        let y = clone.style.top.slice(0, -2);
        // x and y are 'fixed' positions, so change them to be relative to the container
        x -= this.$refs.container.offsetLeft;
        y -= this.$refs.container.offsetTop;
        // console.log('remove', e, clone, x, y, removed);
        this.data.statements.push({x, y, statement: removed});
      })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.blockscontainer {
  position: relative;
  background-color: #eeeeee;
}

.blockscontainer .gu-mirror {
  /*display: table;*/
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
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}
.gu-hide {
  /*display: none !important;*/
  visibility: hidden;
}
.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}
.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}


</style>
