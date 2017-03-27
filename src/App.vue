<template>
  <div id="app">
    <blocks-container :data="data" :style="{float: 'left', width: '500px', height: '500px'}"/>
    <!-- <test-block :data="{}" />
    <number :data="{value: 10}" /> -->
    <pre>{{render(data)}}</pre>
    <pre>{{JSON.stringify(data, undefined, '  ')}}</pre>
  </div>
</template>

<script>
import BlocksContainer from './components/BlocksContainer';
import Block from './components/Block';
import Expression from './components/Expression';
import ExpressionHole from './components/ExpressionHole';
import Statement from './components/Statement';
import StatementsHole from './components/StatementsHole';
import TestBlock from './blocks/TestBlock';
import Number from './blocks/Number';
import Square from './blocks/Square';
import LessThan from './blocks/LessThan';
import LengthOf from './blocks/LengthOf';
import TurnLeft from './blocks/TurnLeft';
import IfThen from './blocks/IfThen';

Block.registerBlock(TestBlock);
Expression.registerExpression(Number);
Expression.registerExpression(Square);
Expression.registerExpression(LessThan);
Expression.registerExpression(LengthOf);
Statement.registerStatement(TurnLeft);
Statement.registerStatement(IfThen);

function fmt(strings, ...values) {
  strings = Array.prototype.slice.call(strings);
  // console.log('fmt', strings, values);
  let li = strings.length-1;
  strings[0] = strings[0].replace(/^\n+/, '');
  strings[li] = strings[li].replace(/\s+$/, '');
  let indent = strings[0].match(/^[\t ]*/)[0];
  // console.log('indent', JSON.stringify(indent));
  if (indent.length) {
    strings[0] = strings[0].slice(indent.length);
    for (let i = 0; i < strings.length; i++) {
      strings[i] = strings[i].replace(new RegExp('\n'+indent, 'g'), '\n');
    }
  }

  let parts = [];
  for (let i = 0; i < values.length; i++) {
    parts.push(strings[i]);
    let value = values[i];
    if (typeof value !== 'string')
      value = `<${typeof value} ${value}>`;
    let predent = strings[i].match(/\n[\t ]+$/);
    if (predent) {
      value = value.replace(/\n/g, predent[0]);
    }
    parts.push(value);
  }
  parts.push(strings[strings.length-1]);

  return parts.join('');
}

const renderFns = (()=>{
  let r = renderCode;
  return {
    // expressions
    'number': ({value}) => `${value}`,
    'lengthof': ({value}) => `${r(value)}.length`,
    'lessthan': ({left, right}) => `${r(left)} < ${r(right)}`,

    // statements
    'turnleft': ({value}) => fmt`
      turnLeft(${r(value)})
      `,

    'ifthen': ({condition, stmts}) => fmt`
      if (${r(condition)}) {
        ${stmts? stmts.map(r).join('\n') : ''}
      }
      `,

    // blocks
    'testblock': ({one, two, three, statements}) => fmt`
      testBlock(${r(one)}, ${r(two)}, ${r(three)}, () => {
        ${statements? statements.map(r).join('\n') : ''}
      })
      `,
  }
})();

function renderCode(data) {
  if (data) {
    var fn = renderFns[data._name];
    if (fn) return fn(data);
    return `<unknown '${data._name}'>`;
  }
  
  return `<${data}>`;
  // return JSON.stringify(data);
}


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
                  _name: 'number',
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
    TestBlock,
    Number,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
