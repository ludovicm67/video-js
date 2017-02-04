class VideoJS {

	constructor({
		selector = null,
		autoplay = false,
	}) {
		this.player = document.querySelector(selector);
		this.player.controls = false;
		this.player.autoplay = autoplay;
		if(autoplay) this.player.play();
		console.info('video-js player initialized');
	}

}
