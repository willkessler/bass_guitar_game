const bassSynth = {
  muted: false,

  setMuted: (muteVal) => {
    this.muted = muteVal;
  },

  toggleMuted: () => {
    this.muted = !this.muted;
  },

  makeDistortionCurve:(amount) => {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    let x;

    for (let i = 0; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 100 * deg / (Math.PI + k * Math.abs(x));
    }

    return curve;
  },

  // play bass guitar note
  playBassNote: (note, octave) => {
    if (this.muted === true) {
      return false;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination)

    // create a WaveShaperNode to simulate the bass guitar's distortion
    const distortionNode = audioContext.createWaveShaper();
    distortionNode.curve = bassSynth.makeDistortionCurve(400);
    distortionNode.oversample = '4x';
    // connect the distortion node to the gain node
    distortionNode.connect(gainNode);

    // create a BiquadFilterNode to shape the sound
    const filterNode = audioContext.createBiquadFilter();
    // set filter node properties
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(500, audioContext.currentTime);
    filterNode.Q.value = 2;
    filterNode.connect(distortionNode);

    //gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    // create oscillator node
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.connect(filterNode);

    // lookup table of note frequencies
    const noteFrequencies = {
      "E1": 41.20, "F1": 43.65, "F#1": 46.25, "G1": 49.00, "G#1": 51.91, "A1": 55.00, "A#1": 58.27, "B1": 61.74,
      "C2": 65.41, "C#2": 69.30, "D2": 73.42, "D#2": 77.78, "E2": 82.41, "A2": 87.31, "A#2": 92.50, "B2": 98.00,
      "C3": 103.83, "C#3": 110.00, "D3": 116.54, "D#3": 123.47, "E3": 130.81, "F3": 138.59, "F#3": 146.83, "G3": 155.56, "G#3": 164.81, "A3": 174.61,
      "D4": 185.00, "D#4": 196.00, "E4": 207.65, "F4": 220.00, "F#4": 233.08, "G4": 246.94, "G#4": 261.63, "A4": 277.18, "A#4": 293.66, "B4": 311.13, "C5": 329.63, "C#5": 349.23, "D5": 369.99,
      "G5": 392.00, "G#5": 415.30, "A5": 440.00, "A#5": 466.16, "B5": 493.88, "C6": 523.25, "C#6": 554.37, "D6": 587.33, "D#6": 622.25, "E6": 659.25, "F6": 698.46, "F#6": 739.99, "G6": 783.99
    };

    const notes = {
      'C': 32.7032,
      'C#': 34.6478,
      'Db': 34.6478,
      'D': 37.7081,
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
    let foundNote, foundNoteLetter;
    let frequency = 440;
    let noteKeys = Object.keys(notes);
    for (let i = 0; i < noteKeys.length; ++i) {
      if ((noteKeys[i][0] == rootNote) && noteKeys[i].length == note.length) {
        foundNote = i;
        foundNoteLetter = noteKeys[foundNote];
        frequency = notes[foundNoteLetter];
      }
    }
    if (accidental === '#') {
      frequency *= Math.pow(2, 1/12);
    } else if (accidental === 'b') {
      frequency /= Math.pow(2, 1/12);
    }
  

    // set envelope parameters
    const attackTime = 0.01;
    const decayTime = 0.8;
    const sustainLevel = 0.5;
    const releaseTime = 0.8;

    // calculate envelope values
    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.setTargetAtTime(0, now + attackTime + decayTime, releaseTime / 5);
    gainNode.gain.value = (noteKeys.length-foundNote)/noteKeys.length + 1;
    const adjustedFrequency = frequency + (octave * notes['C']);
    console.log('foundNote, freq, gain:', foundNoteLetter, adjustedFrequency, gainNode.gain.value);
    
    oscillator.frequency.setValueAtTime(adjustedFrequency, audioContext.currentTime);
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

