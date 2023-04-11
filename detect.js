// Request access to the user's microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    // Create an audio context and a source node from the microphone stream
    var audioContext = new AudioContext();
    var sourceNode = audioContext.createMediaStreamSource(stream);
    
    // Create a frequency analyzer node to process the audio data
    var analyzerNode = audioContext.createAnalyser();
    const noteDisplay = document.getElementById("detected_note");
    console.log(noteDisplay);
    analyzerNode.fftSize = 2048;
    analyzerNode.smoothingTimeConstant = 0.8;
    
    // Connect the source node to the analyzer node
    sourceNode.connect(analyzerNode);
    
    // Define a function to process the audio data
    function processAudio() {
      // Get the frequency data from the analyzer node
      var frequencyData = new Float32Array(analyzerNode.frequencyBinCount);
      analyzerNode.getFloatFrequencyData(frequencyData);
      
      // Find the frequency with the highest amplitude
      var maxAmplitude = -Infinity;
      var maxIndex = -1;
      for (var i = 0; i < frequencyData.length; i++) {
        if (frequencyData[i] > maxAmplitude) {
          maxAmplitude = frequencyData[i];
          maxIndex = i;
        }
      }
      
      // Convert the index of the highest-amplitude frequency to a frequency value
      var frequency = maxIndex * audioContext.sampleRate / analyzerNode.fftSize;

      // Map frequency to the closest note in standard bass guitar tuning
      var notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
      var noteIndex = Math.round(12 * Math.log2(frequency / 41.2)) % 12;
      var noteName = notes[noteIndex];
      
      // Only display the note name if the volume level is above a threshold
      var volumeThreshold = -40; // adjust as needed
      if (maxAmplitude > volumeThreshold) {
        noteDisplay.innerHTML = noteName;
      } else {
        noteDisplay.innerHTML = '';
      }
    }
    
    // Call the processAudio function repeatedly to process the audio data in real time
    setInterval(processAudio, 10);
  })
  .catch(function(error) {
    console.error('Error accessing microphone:', error);
  });
