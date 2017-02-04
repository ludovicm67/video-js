class VideoJS {

  constructor({
    autoplay = false,
    selector = null,
  }) {
    this.autoplay = autoplay;
    this.selector = selector;

    this.wrapped = false;

    this.playerInit();
  }

  wrapPlayer() {
    if (!this.wrapped) {
      let player = document.querySelector(this.selector);
      let wrapper = document.createElement('div');
      wrapper.innerHTML = player.outerHTML;
      wrapper.classList.add('video-js');
      wrapper.style.height = player.offsetHeight + 'px';
      wrapper.style.width = player.offsetWidth + 'px';
      player.parentNode.insertBefore(wrapper, player);
      this.player = wrapper.firstChild;
      this.wrapper = wrapper;
      player.remove();
      this.wrapped = true;
    }
  }

  playerInit() {
    this.wrapPlayer();
    this.player.controls = false;
    this.player.autoplay = this.autoplay;
    if (this.autoplay) this.player.play();
    console.info('video-js player initialized');
  }

}
