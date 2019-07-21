var Router = require('./router').default;
var Layout = require('./layout').default;
var Page = require('./page').default;

const r = new Router(
  {
    add: new Layout(new Page('add.html')),
    search: new Layout(new Page('search.html')),
    '#default': new Page('add.html')
  },
  document.querySelector('main')
);
