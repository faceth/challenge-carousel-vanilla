class Slider {

  constructor ( slides, width ) {

    this.wrap = document.querySelector('#slider');
    this.slides = slides;
    this.width = width || this.wrap.scrollWidth;
    this.active = 0;

    this.rail = document.createElement('div');
    this.rail.setAttribute('id', 'rail');
    this.wrap.appendChild(this.rail);
  }

  init () {
    

    for ( let [i, s] of this.slides.entries() ) {
      let el = document.createElement('div');
      el.classList.add('slide');
      el.setAttribute('id', 'other-slide-' + i);
      el.style.backgroundImage = 'url("' + s + '")';
      el.style.left = (i * this.width) + 'px';
      this.rail.appendChild(el);
    }

    this.addEvent();
  }

  addEvent () {
    let prev = document.querySelector('#prev');
    prev.onclick = (e) => {
      this.handleMove(e, -1);
    }

    let next = document.querySelector('#next');
    next.onclick = (e) => {
      this.handleMove(e, +1);
    }
  }

  handleMove (e, direction) {
    this.active += direction;
    if ( this.active < 0 ) this.active = this.slides.length-1;
    if ( this.active > (this.slides.length-1) ) this.active = 0;
    this.rail.style.marginLeft = -(this.width*this.active) + 'px';
  }
}

const otherSlides = [
  './imgs/img-a.png',
  './imgs/img-b.png',
  './imgs/img-c.png',
  './imgs/img-d.png',
  './imgs/img-e.png',
  './imgs/img-f.png',
  './imgs/img-g.png',
  './imgs/img-h.png',
  './imgs/img-i.png'
];

const slider = new Slider(otherSlides);
slider.init();