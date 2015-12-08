function make(data, helpers){
  var hit = {
    tags: {
      container: {
        tag: 'div',
        className: 'hit-container',
        id: '',
        data: [{name: 'id', value: data.id}],
        on: {
          click: [function(e){console.log('function set in template');}, function(e){console.log('and another function set in template');}]
        },
        tags: data.hit
      },
      order: ['container'],
      parent: typeof window === 'object' ? document.body : null
    }
  };
  return hit;
}

module.exports = make;
