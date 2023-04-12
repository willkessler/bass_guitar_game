const fretboard = {


  init: () => {
    this.canvas = document.getElementById('fretboard');
    this.ctx = this.canvas.getContext('2d');

    // Define an array of note labels for the 4 strings
    this.noteLabels = [
      ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
      ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
      ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
      ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
    ];

    // https://www.rapidtables.com/web/color/RGB_Color.html
    this.stringNoteColors = [
    '#007bff',
    '#FA8072',
    '#2E8B57',
    '#7B68EE'
    ];

    // Define some variables for the fretboard
    // Set the size of the canvas to 600 x 400 pixels
    this.canvas.width = 1400;
    this.canvas.height = 400;
    this.fretCount = 22;
    this.fretWidth = this.canvas.width / (this.fretCount + 1);
    this.stringCount = 4;
    this.stringHeight = this.canvas.height / (this.stringCount + 1);

  },

  drawOneFretPosition: (fret) => {
    const notes = this.noteLabels[fret.string];
    const note = notes[fret.position % 12];
    const y = (this.stringCount - fret.string) * this.stringHeight;
    const x = (fret.position + 1) * this.fretWidth - this.fretWidth / 2;
    //const circleRadius = this.ctx.measureText(note).width / 2 + 2;
    const circleRadius = 12;
    const textX = x - circleRadius;
    const textY = y + 6;
    this.ctx.beginPath();
    this.ctx.arc(textX + circleRadius, textY - 6, circleRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.stringNoteColors[fret.string];
    this.ctx.fill();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(note, textX + circleRadius, textY-1);
  },
  
  render: (pressedNote) => {

    // clear the canvas
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    
    // Draw the frets
    for (let i = 1; i <= this.fretCount; i++) {
      const x = i * this.fretWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.stringHeight / 2);
      this.ctx.lineTo(x,this.canvas.height - this.stringHeight / 2);
      this.ctx.stroke();
    }

    // Draw the strings
    for (let i = 1; i <= this.stringCount; i++) {
      const y = i * stringHeight;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    // draw rectangle around entire fretboard
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(0,stringHeight / 2);
    this.ctx.lineTo(this.canvas.width,stringHeight / 2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(0,this.canvas.height - stringHeight / 2);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - stringHeight / 2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(0,stringHeight / 2);
    this.ctx.lineTo(this.canvas.width,stringHeight / 2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(0,stringHeight / 2);
    this.ctx.lineTo(this.canvas.width,stringHeight / 2);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(0,stringHeight / 2);
    this.ctx.lineTo(0,this.canvas.height-stringHeight / 2);
    this.ctx.stroke();
    this.ctx.lineWidth = 1;


    // Draw the note labels
    if (pressedNote) {
      fretboard.drawOneFretPosition(pressedNote);
    } else {
      for (let i = 0; i < this.stringCount; i++) {
        for (let j = 0; j < this.fretCount; j++) {
          fretboard.drawOneFretPosition({ string: i, position:j });
        }
      }
    }
  }

};

fretboard.init();

fretboard.render();

setInterval( () => {
  fretboard.render( { string: Math.floor(Math.random() * 4), position: Math.floor(Math.random() * 24) });
}, 200);
