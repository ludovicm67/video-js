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
    this.showRemainingTime = true;

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

      this.duration = document.createElement('div');
      this.duration.classList.add('video-js--duration');
      this.duration.textContent = '0:00';
      this.duration.addEventListener('click', () => {
        if (this.showRemainingTime) this.showRemainingTime = false;
        else this.showRemainingTime = true;
      }, false);
      this.controls.appendChild(this.duration);

      this.fs = document.createElement('div');
      this.fs.classList.add('video-js--fullscreen');
      this.fs.textContent = '⮔';
      this.fs.addEventListener('click', () => {
        this.fullscreen();
      }, false);
      this.controls.appendChild(this.fs);

      wrapper.appendChild(this.controls);
    }
  }

  prettyTime(time) {
    let finalTime  = '';
    let sec = parseInt(time, 10);
    let hours = Math.floor(sec / 3600);
    let min = Math.floor((sec - (hours * 3600)) / 60);
    sec = sec - (hours * 3600) - (min * 60);

    if (hours > 0) {
      if (hours < 10) hours = '0' + hours;
      finalTime = hours + ':';
      if (min < 10) min = '0' + min;
    }
    if (sec < 10) sec = '0' + sec;
    return finalTime + min + ':' + sec;
  }

  playerInit() {
    this.wrapPlayer();
    this.player.controls = false;
    this.player.loop = this.loop;
    this.player.autoplay = this.autoplay;
    this.player.load();
    if (this.autoplay) this.play();
    this.player.addEventListener('timeupdate', () => {
      if (this.player.paused) {
        this.playPause.textContent = '▶';
        this.controls.classList.add('video-js--paused');
      } else {
        this.playPause.textContent = '▮▮';
        this.controls.classList.remove('video-js--paused');
      }
      if (this.showRemainingTime) {
        let diffTime = Math.ceil(this.player.duration - this.player.currentTime);
        if (diffTime !== 0) this.duration.textContent = '-' + this.prettyTime(diffTime);
        else this.duration.textContent = this.prettyTime(diffTime);
      } else {
        this.duration.textContent = this.prettyTime(this.player.currentTime);
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

  fullscreen() {
    if (
      document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullScreenElement
      || document.msFullscreenElement
    ) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
      if (this.wrapper.requestFullscreen) {
        this.wrapper.requestFullscreen();
      } else if (this.wrapper.mozRequestFullScreen) {
        this.wrapper.mozRequestFullScreen();
      } else if (this.wrapper.webkitRequestFullscreen) {
        this.wrapper.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (this.wrapper.msRequestFullscreen) {
        this.wrapper.msRequestFullscreen();
      }
    }
  }

}
