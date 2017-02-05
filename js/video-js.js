class VideoJS {

  constructor({
    author = null,
    authorURL = null,
    autoplay = false,
    title = null,
    selector = null,
  }) {
    this.author = author;
    this.authorURL = authorURL;
    this.autoplay = autoplay;
    this.title = title;
    this.selector = selector;

    this.wrapped = false;
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
      let controls = document.createElement('div');
      controls.classList.add('video-js--controls');

      if (this.title) {
        this.titleZone = document.createElement('div');
        this.titleZone.classList.add('video-js--title');
        this.titleZone.textContent = this.title;
        controls.appendChild(this.titleZone);
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
          controls.appendChild(this.authorZone);
        }
      }

      this.playPause = document.createElement('div');
      this.playPause.classList.add('video-js--playPause');
      this.playPause.textContent = '▶';
      this.playPause.addEventListener('click', () => {
        if (this.player.paused) this.play();
        else this.pause();
      }, false);
      controls.appendChild(this.playPause);
      wrapper.appendChild(controls);
    }
  }

  playerInit() {
    this.wrapPlayer();
    this.player.controls = false;
    this.player.autoplay = this.autoplay;
    if (this.autoplay) this.play();
    this.player.addEventListener('timeupdate', () => {
      if (this.player.paused) {
        this.playPause.textContent = '▶';
      } else {
        this.playPause.textContent = '▮▮';
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
