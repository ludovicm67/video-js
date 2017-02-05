class VideoJS {

  constructor({
    author = null,
    authorURL = null,
    autoplay = false,
    loop = false,
    title = null,
    selector = null,
  }) {
    this.author = author;
    this.authorURL = authorURL;
    this.autoplay = autoplay;
    this.loop = loop;
    this.title = title;
    this.selector = selector;

    this.wrapped = false;
    this.controls = null;
    this.player = null;
    this.playPause = null;

    this.playerInit();

  }

  wrapPlayer() {
    if (!this.wrapped) {
      let player = document.querySelector(this.selector);
      let wrapper = document.createElement('div');
      wrapper.classList.add('video-js');
      wrapper.innerHTML = player.outerHTML;
      wrapper.style.height = player.offsetHeight + 'px';
      wrapper.style.width = player.offsetWidth + 'px';
      this.addControls(wrapper);
      player.parentNode.insertBefore(wrapper, player);
      this.player = wrapper.firstChild;
      this.wrapper = wrapper;
      player.remove();
      this.wrapped = true;
    }
  }

  addControls(wrapper) {
    if(!this.wrapped) {
      this.controls = document.createElement('div');
      this.controls.classList.add('video-js--controls');
      this.controls.classList.add('video-js--paused');

      if (this.title) {
        this.titleZone = document.createElement('div');
        this.titleZone.classList.add('video-js--title');
        this.titleZone.textContent = this.title;
        this.controls.appendChild(this.titleZone);
        if (this.author) {
          this.authorZone = document.createElement('div');
          this.authorZone.classList.add('video-js--author');
          this.authorZone.textContent = this.author;
          if (this.authorURL) {
            this.authorZone.classList.add('video-js--cursorPointer');
            this.authorZone.addEventListener('click', () => {
              let win = window.open(this.authorURL, '_blank');
              win.focus();
            }, false);
          }
          this.controls.appendChild(this.authorZone);
        }
      }

      this.playPause = document.createElement('div');
      this.playPause.classList.add('video-js--playPause');
      this.playPause.textContent = '▶';
      this.playPause.addEventListener('click', () => {
        if (this.player.paused) this.play();
        else this.pause();
      }, false);
      this.controls.appendChild(this.playPause);
      wrapper.appendChild(this.controls);
    }
  }

  playerInit() {
    this.wrapPlayer();
    this.player.controls = false;
    this.player.loop = this.loop;
    this.player.autoplay = this.autoplay;
    this.play();
    if (!this.autoplay) this.pause();
    this.player.addEventListener('timeupdate', () => {
      if (this.player.paused) {
        this.playPause.textContent = '▶';
        this.controls.classList.add('video-js--paused');
      } else {
        this.playPause.textContent = '▮▮';
        this.controls.classList.remove('video-js--paused');
      }
    });
    console.info('video-js player initialized');
  }

  // Controls
  pause() {
    this.player.pause();
  }

  play() {
    this.player.play();
  }

}
