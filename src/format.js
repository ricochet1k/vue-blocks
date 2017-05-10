
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
  parts.push(strings[li]);

  return parts.join('');
}

const renderFns = (()=>{
  let r = renderCode;
  let f = (strings, ...values) => fmt(strings, ...values.map(x => r(x)));
  return {
    // expressions
    'number': ({value}) => f`${value}`,
    'lengthof': ({value}) => f`${value}.length`,
    'lessthan': ({left, right}) => f`${left} < ${right}`,

    // statements
    'turnleft': ({value}) => f`
      turnLeft(${value})
      `,

    'ifthen': ({condition, stmts}) => f`
      if (${condition}) {
        ${stmts}
      }
      `,

    // blocks
    'testblock': ({one, two, three, statements}) => f`
      testBlock(${one}, ${two}, ${three}, () => {
        ${statements}
      })
      `,
  }
})();

export function renderCode(data, sep) {

  if (Array.isArray(data)) {
    return data.map(renderCode).join(sep || '\n');
  }
  if (typeof data === "string" || typeof data === "number") return ''+data;
  if (data && typeof data === "object") {
    var fn = renderFns[data._name];
    if (fn) return fn(data);
    return `<unknown '${data._name}'>`;
  }
  
  return `<${data}>`;
  // return JSON.stringify(data);
}
