const bassSynth = {
  init: () => {
    // create audio context
    this.audioContext = new AudioContext();

    // create oscillator node
    this.oscillator = this.audioContext.createOscillator();

    // set oscillator properties
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(55, this.audioContext.currentTime); // set frequency to A1 (55 Hz)

    // create gain node
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);

    // connect nodes
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);


  },

  // play bass guitar note
  playBassNote: (note) => {
    // lookup table of note frequencies
    const notes = {
      'C': 32.7032,
      'C#': 34.6478,
      'Db': 34.6478,
      'D': 36.7081,
      'D#': 38.8909,
      'Eb': 38.8909,
      'E': 41.2034,
      'F': 43.6535,
      'F#': 46.2493,
      'Gb': 46.2493,
      'G': 48.9994,
      'G#': 51.9131,
      'Ab': 51.9131,
      'A': 55,
      'A#': 58.2705,
      'Bb': 58.2705,
      'B': 61.7354
    };
  
    // extract root note and accidental from input string
    const rootNote = note.charAt(0);
    const accidental = note.length > 1 ? note.charAt(1) : '';
  
    // calculate frequency based on root note and accidental
    let frequency = notes[rootNote];
    if (accidental === '#') {
      frequency *= Math.pow(2, 1/12);
    } else if (accidental === 'b') {
      frequency /= Math.pow(2, 1/12);
    }
  
    // set oscillator frequency and start playing
    this.oscillator.start(this.audioContext.currentTime);
  
    // stop playing after 1 second
    this.oscillator.stop(this.audioContext.currentTime + 1);
  }
};


document.addEventListener('click', function() {
  bassSynth.init();
  bassSynth.playBassNote('C');
});

