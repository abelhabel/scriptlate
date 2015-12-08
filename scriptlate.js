function scriptlate(template, data) {
  var tags = template(data, scriptlate.helpers).tags;
  if(!tags.order) throw new Error('order attribute not defined on template');
  if(typeof window === 'object') {
    return loopKeys(tags, tags.parent);
  }else {
    return concatenateTemplate(tags);
  }
}

function registerHelpers(helpers) {
  this.helpers = helpers;
}
scriptlate.registerHelpers = registerHelpers;
scriptlate.helpers = {};

function concatenateTemplate(tags) {
  var str = '', open ='<', content = '', openEnd = '>', close = '</', closeEnd = '>';
  tags.order.forEach(function(key) {

    if(key === 'order' || !tags[key]) return;
    str += open + tags[key].tag;
    if(tags[key].id) str += " id='" + tags[key].id + "'";
    if(tags[key].className) str += " class='" + tags[key].className + "'";
    if(tags[key].src) str += " src='" + (tags[key].src || "") + "'";
    str += openEnd;

    str += tags[key].innerHTML || '';

    if(tags[key].tags) {
      console.log(tags[key].tags.tags);
      str += concatenateTemplate(tags[key].tags);
    }

    str += close + tags[key].tag + closeEnd;
  });

  return str;
}


function loopKeys(tags, parent) {
  var view = {};
  tags.order.forEach(function(key) {
    view[key] = makeTag(tags[key]);
    if(parent) parent.appendChild(view[key]);
    if(tags[key].tags) loopKeys(tags[key].tags, view[key]);
  });
  return view;
}

function updateKeys(tags) {
  tags.order.forEach(function(key) {
    updateTag(view[key], tags[key]);
    if(tags[key].tags) updateKeys(tags[key].tags);
  });
}

function updateTag(tag, options) {
  if(options.className) tag.className = options.className;
  if(options.id) tag.id = options.id;
  if(options.innerHTML) tag.innerHTML = options.innerHTML;
  if(options.src) tag.src = options.src;
  if(options.data) {
    options.data.forEach(function(data) {
      tag.setAttribute('data-' + data.name, data.value);
    });
  }
  if(options.on) {
    for(var event in options.on) {
      for(var i = 0; i < options.on[event].length; i += 1) {
        tag.addEventListener(event, options.on[event][i], false);
      }
    }
  }
  return tag;
}

function makeTag(options) {
  var tag = document.createElement(options.tag);
  updateTag(tag, options);
  return tag;
}
module.exports = scriptlate;
