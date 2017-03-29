<template>
  <div class="blockscontainer">
    <top-level-block class="abs-object" 
      v-for="(block, index) in data.blocks" 
      :style="{left: block.x+'px', top: block.y+'px'}"
      service="vue-blocks-blocks"
      drake="main"
      :component="blockComponent(block.block)"
      :data="block.block"
      @input="onDraggedOut(data.blocks, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(expression, index) in data.expressions" 
      :style="{left: expression.x+'px', top: expression.y+'px'}"
      service="vue-blocks-expressions" 
      drake="main"
      :component="expressionComponent(expression.expression)"
      :data="expression.expression"
      @input="onDraggedOut(data.expressions, index)" />
    
    <top-level-block class="abs-object" 
      v-for="(statement, index) in data.statements" 
      :style="{left: statement.x+'px', top: statement.y+'px'}"
      service="vue-blocks-statements" 
      drake="main"
      :component="statementComponent(statement.statement)"
      :data="statement.statement"
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

import { ModelManager } from 'vue2-dragula'

class MyModelManager extends ModelManager {
  constructor(opts) {
    super(opts)
  }

  createModel() {
    console.log("createModel");
    return []; //new ImmutableList()
  }

  createFor(opts) {
    console.log('createFor', opts);
    return new MyModelManager(opts);
  }

  removeAt(index) {
    console.log("removeAt", index);
    super.removeAt(index);
  }

  insertAt(index, item) {
    console.log("insertAt", index, item);
    super.insertAt(index, item);
  }

  move({dragIndex, dropIndex}) {
    console.log("move", dragIndex, dropIndex);
    super.move({dragIndex, dropIndex});
  }
}

function createModelManager(opts) {
  console.log('createModelManager', opts)
  return new MyModelManager(opts)
}

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
    init() {
      this.blockService = Vue.$dragula.createService({
        name: 'vue-blocks-blocks',
        // createDragHandler,
        drakes: {
          main: {
            moves: (el, target, source, sibling) => {
              // console.log('moves', el, target, source, sibling);
              return true;
            },
            accepts: (el, target, source, sibling) => {
              // console.log('accepts', el, target, source, sibling);
              // return target.children.length === 0;
            },
            invalid: (el, handle) => {
              // console.log('block invalid', el, handle);
              if (el.classList.contains('expression') || el.classList.contains('statement'))
                return true;
              return false;
            },
          },
        },
      });

      this.blockService.on({
        drag: ({ el, container, service, drake }) => {
          el.classList.remove('ex-moved');
        },
        drop: (e) => {
          let { el, container } = e;
          el.classList.add('ex-moved');
          // console.log('drop', e, el, container);
        },
        over: ({ el, container }) => {
          el.classList.add('ex-over');
        },
        out: ({ el, container }) => {
          el.classList.remove('ex-over');
        },
      })

      this.expressionService = Vue.$dragula.createService({
        name: 'vue-blocks-expressions',
        // createDragHandler,
        createModelManager,
        drakes: {
          main: {
            direction: 'horizontal',
            removeOnSpill: true,
            moves: (el, target, source, sibling) => {
              // console.log('moves', el, target, source, sibling);
              return true;
            },
            accepts: (el, target, source, sibling) => {
              // console.log('accepts', el, target, source, sibling);
              return target.children.length === 0;
            },
            invalid: (el, handle) => {
              // console.log('invalid', el, handle);
              // if (el.classList.contains('expression'))
              //   return true;
              return false;
            },
          },
        },
      });

      this.expressionService.on({
        drag: ({ el, container, service, drake }) => {
          el.classList.remove('ex-moved');
        },
        drop: (e) => {
          let { el, container } = e;
          el.classList.add('ex-moved');
          // console.log('drop', e, el, container);
        },
        over: ({ el, container }) => {
          el.classList.add('ex-over');
        },
        out: ({ el, container }) => {
          el.classList.remove('ex-over');
        },
        remove: (e) => {
          console.log('remove', e, new Error());
        }
      })

      this.statementService = Vue.$dragula.createService({
        name: 'vue-blocks-statements',
        drakes: {
          main: {
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
          },
        },
      });

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
