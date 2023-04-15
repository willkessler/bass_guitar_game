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
    const filterNode = audioContext.createBiquadFilter();
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.connect(filterNode)
    filterNode.connect(audioContext.destination);
    
    // set filter node properties
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(500, audioContext.currentTime);

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
  

    // set envelope parameters
    const attackTime = 0.02;
    const decayTime = 0.25;
    const sustainLevel = 0.8;
    const releaseTime = 0.8;

    // calculate envelope values
    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.setTargetAtTime(0, now + attackTime + decayTime, releaseTime / 5);

    oscillator.frequency.setValueAtTime(frequency * 3, audioContext.currentTime);
    oscillator.start();
  
    // stop playing after 1 second
    oscillator.stop(audioContext.currentTime + 1.5);
  }
};


bassSynth.setMuted(true);

document.addEventListener('click', function() {
  console.log('Toggling mute.');
  bassSynth.toggleMuted();
});

