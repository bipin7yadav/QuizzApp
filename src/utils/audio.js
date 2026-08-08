// Web Audio API Sound Synthesizer for Quiz Effects (Zero external audio file dependency)

class SoundFX {
  constructor() {
    this.audioCtx = null;
    this.bgMusicTimer = null;
    this.isPlayingMusic = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a soft romantic pop sound when picking an option
  playPop() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.1); // A5

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio autoplay restrictions safeguard
    }
  }

  // Play a celebratory sparkle chime sound on completion
  playSparkle() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.08);
        osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.25);
      });
    } catch (e) {
      // Audio safeguard
    }
  }

  // Start continuous soft romantic ambient background music
  startRomanticMusic() {
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.bgMusicTimer) return;

      this.isPlayingMusic = true;
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63, 261.63]; // Soft Cmaj7 melody
      let step = 0;

      this.bgMusicTimer = setInterval(() => {
        if (!this.audioCtx || !this.isPlayingMusic) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[step % notes.length], this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.035, this.audioCtx.currentTime); // Soft background volume
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.55);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.55);
        step++;
      }, 600);
    } catch (e) {
      // Audio safeguard
    }
  }

  // Stop background music
  stopRomanticMusic() {
    this.isPlayingMusic = false;
    if (this.bgMusicTimer) {
      clearInterval(this.bgMusicTimer);
      this.bgMusicTimer = null;
    }
  }

  toggleRomanticMusic() {
    if (this.isPlayingMusic) {
      this.stopRomanticMusic();
      return false;
    } else {
      this.startRomanticMusic();
      return true;
    }
  }
}

export const soundFX = new SoundFX();
