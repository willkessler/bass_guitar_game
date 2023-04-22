const {
  Renderer,
  Stave,
  StaveNote,
  BarNote,
  Voice,
  Font,
  Formatter,
  Accidental,
  Annotation,
  ModifierPosition
} = Vex.Flow;


const renderNotes = (notes) => {

  // Create an SVG renderer and attach it to the DIV element named "staff".
  const div = document.getElementById("staff");
  div.innerHTML = '';
  const renderer = new Renderer(div, Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(1500, 300);
  const context = renderer.getContext();

  // Create a stave of width 400 at position 10, 40 on the canvas.
  const stave = new Stave(10, 40, 1000);

  // Add a clef and time signature.
  stave.addClef("bass").addTimeSignature("4/4");

  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();

  // Create a voice in 4/4 and add above notes
  const voice = new Voice({ num_beats: 4, beat_value: 4 });
  voice.setStrict(false);
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  new Formatter().joinVoices([voice]).format([voice], 350);

  // Render voice
  voice.draw(context, stave);

};

const annotation = (text) => {
  const FONT_SIZE = 12;
  return new Annotation(text).setFont(Font.SERIF, FONT_SIZE, 'normal', 'italic').setVerticalJustification(Annotation.VerticalJustify.BOTTOM);
};

  // Create the notes
let notes = [
  // A quarter-note C.
  // .addModifier(new Accidental("#"),0), adds sharp
  new StaveNote({ keys: ["a/2"], clef: 'bass', duration: "q" }).addModifier(annotation('A'),0),
  new StaveNote({ keys: ["b/2"], clef: 'bass', duration: "q" }).addModifier(annotation('B'),0),
  new StaveNote({ keys: ["c/3"], clef: 'bass', duration: "q" }).addModifier(annotation('C'),0),
  new StaveNote({ keys: ["d/3"], clef: 'bass', duration: "q" }).addModifier(annotation('D'),0),
  new BarNote(),
  new StaveNote({ keys: ["e/3"], clef: 'bass', duration: "q" }).addModifier(annotation('E'),0),
  new StaveNote({ keys: ["f/3"], clef: 'bass', duration: "q" }).addModifier(annotation('F'),0),
  new StaveNote({ keys: ["g/3"], clef: 'bass', duration: "q" }).addModifier(annotation('G'),0),
  new StaveNote({ keys: ["a/3"], clef: 'bass', duration: "q" }).addModifier(annotation('A'),0),
  new BarNote(),
  new StaveNote({ keys: ["b/3"], clef: 'bass', duration: "q" }).addModifier(annotation('B'),0),
  new StaveNote({ keys: ["c/4"], clef: 'bass', duration: "q" }).addModifier(annotation('C'),0),
  new StaveNote({ keys: ["d/4"], clef: 'bass', duration: "q" }).addModifier(annotation('D'),0),
  new StaveNote({ keys: ["e/4"], clef: 'bass', duration: "q" }).addModifier(annotation('E'),0),
];

const getRandomNote = () => {
  let noteLetters = ['A','B','C','D','E','F','G'];
  const randomIndex = Math.floor(Math.random() * noteLetters.length);
  return noteLetters[randomIndex];
};

const getNoteByIndex = (index) => {
  let noteLetters = ['A','B','C','D','E','F','G'];
  return noteLetters[index];
};

const runNotes = ['E','F','G','A','B','C','D','E','F','G','A','B','C','D','E','F','G'];
const runOctaves = [0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2];
for (let i = 0; i < runNotes.length; ++i) {
  setTimeout(() => {
    const theNote = runNotes[i];
    const theOctave = runOctaves[i];
    console.log('note index:', i, ' note:', theNote, ' octave:', theOctave);
    let notes = [
      // A quarter-note C.
      // .addModifier(new Accidental("#"),0), adds sharp
      new StaveNote({ keys: [theNote + '/' + theOctave], clef: 'bass', duration: "q" }).addModifier(annotation(theNote.toUpperCase()),0),
    ];
    renderNotes(notes);
    bassSynth.playBassNote(theNote, theOctave);
  }, 200 * (i + 1));
}
   

/*

setInterval(() => {
  // Create some notes
  const newNote = getRandomNote();
  let octave = Math.max(2, Math.floor(Math.random() * 3 + 1));
  //console.log(octave);

  let notes = [
    // A quarter-note C.
    // .addModifier(new Accidental("#"),0), adds sharp
    new StaveNote({ keys: [newNote.toLowerCase() + '/' + octave], clef: 'bass', duration: "q" }).addModifier(annotation(newNote.toUpperCase()),0),
  ];
  renderNotes(notes);
  bassSynth.playBassNote(newNote, octave);

}, 2000);
*/
