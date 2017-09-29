<template>
  <div id="app">
    <blocks-container :data="data" :style="{display: 'inline-block', width: '500px', height: '500px'}"/>
    <!-- <test-block :data="{}" />
    <number :data="{value: 10}" /> -->
    <pre :style="{display: 'inline-block', 'vertical-align': 'top'}" >{{render(data)}}</pre>
    <div><pre>{{JSON.stringify(data, undefined, '  ')}}</pre></div>
  </div>
</template>

<script>
import {
  BlocksContainer,
  Block,
  Expression,
  ExpressionHole,
  Statement,
  StatementsHole,
} from 'src';

// import BlocksContainer from './components/BlocksContainer';
// import Block from './components/Block';
// import Expression from './components/Expression';
// import ExpressionHole from './components/ExpressionHole';
// import Statement from './components/Statement';
// import StatementsHole from './components/StatementsHole';
import TestBlock from './blocks/TestBlock';
import Number from './blocks/Number';
import String from './blocks/String';
import Square from './blocks/Square';
import LessThan from './blocks/LessThan';
import LengthOf from './blocks/LengthOf';
import TurnLeft from './blocks/TurnLeft';
import IfThen from './blocks/IfThen';

import {renderCode} from './format';

Block.registerBlock(TestBlock);
Expression.registerExpression(Number);
Expression.registerExpression(String);
Expression.registerExpression(Square);
Expression.registerExpression(LessThan);
Expression.registerExpression(LengthOf);
Statement.registerStatement(TurnLeft);
Statement.registerStatement(IfThen);


export default {
  name: 'app',
  data: function() {
    return {
      data: {
        blocks: [
          {
            x: 10,
            y: 10,
            block: {
              _name: 'testblock',
              one: {
                _name: 'number',
                value: 15,
              },
              two: {
                _name: 'lengthof',
                value: {
                  _name: 'string',
                  value: 'name',
                },
              },
              three: {
                _name: 'lessthan',
                left: {
                  _name: 'number',
                  value: '18',
                },
                right: {
                  _name: 'number',
                  value: '20',
                },
              },
              statements: [
                {
                  _name: 'turnleft',
                  value: null,
                },
                {
                  _name: 'ifthen',
                  condition: {
                    _name: 'number',
                    value: '1',
                  },
                  stmts: [
                    {
                      _name: 'turnleft',
                      value: null,
                    },
                  ],
                },
                {
                  _name: 'turnleft',
                  value: {
                    _name: 'square',
                  },
                },
              ],
            }
          }
        ],
        expressions: [
          {
            x: 400,
            y: 10,
            expression: {
              _name: 'number',
              value: 10,
            }
          }
        ],
        statements: [],
      }
    }
  },
  methods: {
    render(data) {
      return data.blocks.map(({block}) => renderCode(block)).join('\n');
    },
  },
  components: {
    BlocksContainer,
  },
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
}



</style>
