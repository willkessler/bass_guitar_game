const bassSynth = {
  muted: true,

  setMuted: (muteVal) => {
    this.muted = muteVal;
  },

  toggleMuted: () => {
    this.muted = !this.muted;
  },

  // play bass guitar note
  playBassNote: (note) => {
    if (this.muted === true) {
      return false;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;
    gainNode.connect(audioContext.destination)

    // create oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.connect(gainNode);

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
    const rootNote = note[0];
    const accidental = note.length > 1 ? note[1] : '';
  
    // calculate frequency based on root note and accidental
    let frequency = 440;
    let noteKeys = Object.keys(notes);
    for (let i = 0; i < noteKeys.length; ++i) {
      if ((noteKeys[i][0] == rootNote) && noteKeys[i].length == note.length) {
        frequency = notes[noteKeys[i]];
      }
    }
    if (accidental === '#') {
      frequency *= Math.pow(2, 1/12);
    } else if (accidental === 'b') {
      frequency /= Math.pow(2, 1/12);
    }
  
    // set oscillator frequency and start playing
    //this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime); // set frequency to A1 (55 Hz)
    oscillator.frequency.value = frequency * 10;
    oscillator.start();
  
    // stop playing after 1 second
    oscillator.stop(audioContext.currentTime + 0.5);
  }
};


bassSynth.setMuted(true);

document.addEventListener('click', function() {
  console.log('Toggling mute.');
  bassSynth.toggleMuted();
});

