     const canvas = document.getElementById('fretboard');
     const ctx = canvas.getContext('2d');

     // Set the size of the canvas to 600 x 400 pixels
     canvas.width = 1400;
     canvas.height = 400;

     // Define some variables for the fretboard
     const fretCount = 22;
     const fretWidth = canvas.width / (fretCount + 1);
     const stringCount = 4;
     const stringHeight = canvas.height / (stringCount + 1);

     // Draw the frets
     for (let i = 1; i <= fretCount; i++) {
       const x = i * fretWidth;
       ctx.beginPath();
       ctx.moveTo(x, stringHeight / 2);
       ctx.lineTo(x,canvas.height - stringHeight / 2);
       ctx.stroke();
     }

     // Draw the strings
     for (let i = 1; i <= stringCount; i++) {
       const y = i * stringHeight;
       ctx.beginPath();
       ctx.moveTo(0, y);
       ctx.lineTo(canvas.width, y);
       ctx.stroke();
     }

     // draw rectangle around entire fretboard
     ctx.lineWidth = 5;
     ctx.beginPath();
     ctx.moveTo(0,stringHeight / 2);
     ctx.lineTo(canvas.width,stringHeight / 2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0,canvas.height - stringHeight / 2);
     ctx.lineTo(canvas.width, canvas.height - stringHeight / 2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0,stringHeight / 2);
     ctx.lineTo(canvas.width,stringHeight / 2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0,stringHeight / 2);
     ctx.lineTo(canvas.width,stringHeight / 2);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(0,stringHeight / 2);
     ctx.lineTo(0,canvas.height-stringHeight / 2);
     ctx.stroke();
     ctx.lineWidth = 1;

     // Define an array of note labels for the 4 strings
     const noteLabels = [
       ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
       ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
       ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
       ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
     ];

     // https://www.rapidtables.com/web/color/RGB_Color.html
     const stringNoteColors = [
       '#007bff',
       '#FA8072',
       '#2E8B57',
       '#7B68EE'
     ];

     // Draw the note labels
     for (let i = 0; i < stringCount; i++) {
       const notes = noteLabels[i];
       for (let j = 0; j < fretCount; j++) {
         const note = notes[j % 12];
         const y = (stringCount - i) * stringHeight;
         const x = (j + 1) * fretWidth - fretWidth / 2;
         //const circleRadius = ctx.measureText(note).width / 2 + 2;
         const circleRadius = 12;
         const textX = x - circleRadius;
         const textY = y + 6;
         ctx.beginPath();
         ctx.arc(textX + circleRadius, textY - 6, circleRadius, 0, Math.PI * 2);
         ctx.fillStyle = stringNoteColors[i];
         ctx.fill();
         ctx.fillStyle = '#ffffff';
         ctx.font = 'bold 12px sans-serif';
         ctx.textAlign = 'center';
         ctx.fillText(note, textX + circleRadius, textY-1);
       }
     }
