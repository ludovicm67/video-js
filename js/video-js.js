class VideoJS {

  constructor({
    autoplay = false,
    selector = null,
  }) {
    this.autoplay = autoplay;
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
      console.log(this);
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
      this.playPause = document.createElement('div');
      this.playPause.classList.add('video-js--playPause');
      this.playPause.textContent = '▶';
      this.playPause.addEventListener('click', () => {
        if (this.player.paused) {
          this.play();
        } else {
          this.pause();
        }
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
