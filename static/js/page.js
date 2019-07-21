class Page {
  constructor(url) {
    this.url = '../static/views/' + url;
  }

  load() {
  	return fetch(this.url)
  		.then(response => response.text())
  		.then(data => this.html = data);
  }  

  show(el) {
    el.innerHTML = this.html;
  }
}

export default Page;