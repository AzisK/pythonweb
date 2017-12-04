require('../scss/style.scss');

var Router = require('./router').default;
var Layout = require('./layout').default;
var Page = require('./page').default;

const r = new Router(
  {
    add: new Layout(new Page('nav.html'), new Page('add.html')),
    search: new Layout(new Page('nav.html'), new Page('search.html')),
    '#default': new Page('nav.html')
  },
  document.querySelector('main')
);