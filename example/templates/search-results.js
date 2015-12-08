function make(data, helpers) {
  var el = {
    tags: {
      container: {tag: 'div', id: 'search-results'},
      order: ['container']
    }
  };
  return el;
}

module.exports = make;
