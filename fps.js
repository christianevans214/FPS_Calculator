class FPS {
	constructor(callback) {
		this.stop();
		this.callback = callback;
	}

	start() {
		this.currentSec = Date.now();
		this.isPlaying = true;
		this.render();
	}

	stop() {
		this.isPlaying = false;
		this.frameCount = 0;
	}

	render() {
		//request animation frame should fire 60 times per second.
		let loop = (timestamp) => {
			let time = Date.now()
			if (time - this.currentSec <= 1000) { //if under a second
				this.frameCount++;
				let timeElapsed = (time - this.currentSec) / 1000; //time elapsed in seconds.
				//set timeout so that it doesn't block the next animation frame call.
				setTimeout(() => this.callback(Math.round(this.frameCount / timeElapsed)));

			} else {
				this.currentSec = Date.now();
				this.frameCount = 0;
			}
			if(this.isPlaying) requestAnimationFrame(loop);
		}
		window.requestAnimationFrame(loop);
	}
}