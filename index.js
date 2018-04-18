class Carousel {

  constructor ( slides, count, width ) {

    this.wrap = document.querySelector('#carousel');
    this.slides = slides;
    this.count = count || 5; //this.slides.length < 5 ? ( this.slides.length % 2 == 0 ? this.slides.length-1 : this.slides.length ) : 5;

    // all of these could also be methods in order to handle responsivenes
    this.width = width || this.wrap.scrollWidth;
    this.active = this.range = Math.floor(this.count / 2);
    this.size = this.width/this.count;
    this.eStart = 0;
    
  }

  init () {
    for ( let [i, s] of this.slides.entries() ) {
      let el = document.createElement('div');
      el.classList.add('slide');
      el.setAttribute('id', 'slide-' + i);
      el.style.backgroundImage = 'url("' + s + '")';
      this.wrap.appendChild(el);
    }

    this.addEvent();
    this.update();
  }

  addEvent () {
    const self = this;
    const handler = (e) => {
      self.handleMove.call(self, e);
    }

    this.wrap.onmousedown = (e) => {
      this.eStart = e.clientX;
      this.wrap.addEventListener('mousemove', handler, true);
    }

    this.wrap.onmouseup = (e) => {
      this.wrap.removeEventListener('mousemove', handler, true);
    }

    this.wrap.onmouseenter = (e) => {
      this.wrap.removeEventListener('mousemove', handler, true); 
    }
  }

  handleMove (e) {
    let move = e.clientX - this.eStart;
    let threshold = this.size/4;

    if (move > threshold || move < -threshold) {
      let direction = move > threshold ? -1 : 1;
      this.active += direction;
      this.eStart = e.clientX;
    }

    if ( this.active > this.slides.length ) this.active = 0;
    else if ( this.active < 0 ) this.active = (this.slides.length-1);
    this.update();
  }

  handlePress (e) {

  }

  update () {
    let start = this.active - this.range;
    let end = this.active + this.range;

    for ( let [i, s] of this.slides.entries() ) {

      let el = this.wrap.querySelector('#slide-' + i);

      if (i >= start && i <= end ) {
        el.classList.add('view');

        if ( i == this.active ) el.classList.add('active');
        else el.classList.remove('active');

        let offset = this.active-i;
        let size = this.applySize(el, Math.abs(offset));
        this.applyPos(el, offset, size);
        this.applyIdx(el, offset);
        this.applyAlpha(el, offset);
      }

      else {
        el.classList.remove('view');
      }
    }
  }

  applySize (slide, offset) {
    let size = (this.size * (1 - offset/10));
    slide.style.width = size + 'px';
    slide.style.height = size + 'px';
    return size;
  }

  applyPos (slide, offset, size) {
    let left = ((this.width/2) - (size/2)) - (offset * size);
    slide.style.left = left + 'px';
  }

  applyIdx (slide, offset) {
    slide.style['z-index'] = -(Math.abs(offset));
  }

  applyAlpha (el, offset) {
    el.style.opacity = 1 - ( 2 * Math.abs(offset) / 10 );
  }

}

const slides = [
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

const carousel = new Carousel(slides);
carousel.init();

