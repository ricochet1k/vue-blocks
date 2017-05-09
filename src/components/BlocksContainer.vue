<template>
  <div class="blockscontainer">
    <top-level-block class="abs-object" 
      v-for="(blk, index) in data.blocks" 
      :style="{left: blk.x+'px', top: blk.y+'px'}"
      bag="vue-blocks-blocks"
      :component="blockComponent(blk.block)"
      :data="blk.block"
      @input="onDraggedOut(data.blocks, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(exp, index) in data.expressions" 
      :style="{left: exp.x+'px', top: exp.y+'px'}"
      bag="vue-blocks-expressions" 
      :component="expressionComponent(exp.expression)"
      :data="exp.expression"
      @input="onDraggedOut(data.expressions, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(stmt, index) in data.statements" 
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
import Expression from '../components/Expression';
import Statement from '../components/Statement';
import StatementsHole from '../components/StatementsHole';
import ExpressionHole from '../components/ExpressionHole';
import TopLevelBlock from '../components/TopLevelBlock';

// var dragArraySym = Symbol('dragArraySym');

// import { ModelManager } from 'vue2-dragula'

// class MyModelManager extends ModelManager {
//   constructor(opts) {
//     super(opts)
//   }

//   createModel() {
//     console.log("createModel");
//     return []; //new ImmutableList()
//   }

//   createFor(opts) {
//     console.log('createFor', opts);
//     return new MyModelManager(opts);
//   }

//   removeAt(index) {
//     console.log("removeAt", index);
//     super.removeAt(index);
//   }

//   insertAt(index, item) {
//     console.log("insertAt", index, item);
//     super.insertAt(index, item);
//   }

//   move({dragIndex, dropIndex}) {
//     console.log("move", dragIndex, dropIndex);
//     super.move({dragIndex, dropIndex});
//   }
// }

// function createModelManager(opts) {
//   console.log('createModelManager', opts)
//   return new MyModelManager(opts)
// }

export default {
  name: 'blockscontainer',
  props: ['data'],
  // data() {
  //   return {
  //   };
  // },
  components: {
    StatementsHole,
    ExpressionHole,
    TopLevelBlock,
  },
  created() {
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

    updateModel (dropTarget, dropSource) {
      dropSource.vm[dropSource.expression] = dropSource.model
      if (dropTarget.el === dropSource.el) { return }
      dropTarget.vm[dropTarget.expression] = dropTarget.model
    },

    init() {
      console.log('vueDragula', Vue.dragula);
      let vD = this.$dragula;


      this.$dragula.eventBus.$on('drop-model',
        (bagName, el, dropTarget, dropSource, dropIndex) => {
          console.log('dropModel: ', bagName, el, dropTarget, dropSource, dropIndex)
          // this.updateModel(dropTarget, dropSource)
        }
      )

      vD.options('vue-blocks-blocks', {
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
        console.log('drag', e);
      })
      this.expressionBag.on('drop', (e) => {
        let { el, container } = e;
        // el.classList.add('ex-moved');
        console.log('drop', e);
      })
      this.expressionBag.on('over', (e) => {
        let { el, container } = e;
        // el.classList.add('ex-over');
        console.log('over', e);
      })
      this.expressionBag.on('out', (e) => {
        let { el, container } = e;
        // el.classList.remove('ex-over');
        console.log('out', e);
      })
      this.expressionBag.on('cancel', (e) => {
        console.log('cancel', e);
      })
      this.expressionBag.on('dragend', (e) => {
        console.log('dragend', e);
      })
      this.expressionBag.on('shadow', function (e) {
        console.log('shadow', arguments);
      })
      this.expressionBag.on('cloned', (e) => {
        console.log('cloned', e);
      })
      this.expressionBag.on('remove', (e) => {
        console.log('remove', e);
      })

      vD.options('vue-blocks-statements', {
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
