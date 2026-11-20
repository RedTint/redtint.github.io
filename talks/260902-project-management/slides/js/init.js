/* Reveal.js initialization.
   Rules from docs/030-presentation-plan-v1.0.0.md, Reveal.js Sequencing Notes:
   linear horizontal deck, fade transitions, no auto-advance, no loop,
   no slide numbers, no progress bar, speaker notes plugin on.
   Deck is top-aligned (center: false) for consistent title placement;
   statement slides use the .centered class. */

Reveal.initialize({
  hash: true,
  transition: 'fade',
  transitionSpeed: 'fast',
  autoSlide: 0,
  loop: false,
  slideNumber: false,
  progress: false,
  controls: true,
  center: false,
  width: 1280,
  height: 720,
  margin: 0.06,
  plugins: []
});

/* Persistent section kicker: shows where we are in the arc on every slide. */
var SECTIONS = [
  { from: 0,  to: 0,  label: null },
  { from: 1,  to: 4,  label: 'Opening' },
  { from: 5,  to: 11, label: '01 · Same Page First' },
  { from: 12, to: 18, label: '02 · The Fall' },
  { from: 19, to: 31, label: '03 · The Triad' },
  { from: 32, to: 32, label: 'Break' },
  { from: 33, to: 45, label: '04 · The Pipeline' },
  { from: 46, to: 49, label: '05 · The Turnaround' },
  { from: 50, to: 51, label: '06 · Your Toolkit' },
  { from: 52, to: 52, label: '07 · Grown Up' },
  { from: 53, to: 54, label: 'Close' }
];

function updateKicker() {
  var el = document.querySelector('.kicker');
  if (!el) {
    el = document.createElement('div');
    el.className = 'kicker';
    document.body.appendChild(el);
  }
  var h = Reveal.getIndices().h;
  var match = SECTIONS.find(function (s) { return h >= s.from && h <= s.to; });
  if (match && match.label) {
    el.innerHTML = match.label.replace('·', '<span class="k-accent">·</span>');
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

/* Next-topic hints, shown bottom right on every slide. Audience-safe wording,
   presenter-meaningful: always tells you where the talk goes next. */
var NEXT_HINTS = [
  'About me', 'An honest confession', 'Who is in the room', 'Can a great team fail?',
  'Same page first', 'What is a project', 'What is management', 'Project management, defined',
  'Twelve words, 1 of 3', 'Words 2 of 3', 'Words 3 of 3', 'A true story',
  'The commitment', 'Month 1: the scoreboard', 'The red flags', 'The heroic month',
  'Exercise: plan CanteenGo', 'Debrief: what was missing?', 'Why talent is not enough', 'Engine and steering',
  'The iron triangle', 'The only math today', 'If nobody moves a lever', "Brooks's Law",
  'Which lever would you move?', 'Five hats', 'Responsibility vs accountability', 'The 2AM friend',
  'Delegation, not dumping', "A leader's first duty", 'State the obvious', 'Break',
  'The pipeline', 'Station 1: requirements', 'The real requirement', 'The PRD',
  'Same sentence, different pictures', 'User stories', "The tech lead's HOW", 'The sizing game',
  'How sizes become time', 'Priority means order', 'The roadmap', 'The sprint loop',
  'AI: typing vs deciding', 'The turnaround', 'What we actually did', 'Same team, different outcome',
  'Exercise: with structure', 'Frameworks survey', 'The mini-scrum', 'The pipeline, grown up',
  'Q and A', 'Closing challenge', null
];

function updateNextHint() {
  var el = document.querySelector('.next-hint');
  if (!el) {
    el = document.createElement('div');
    el.className = 'next-hint';
    document.body.appendChild(el);
  }
  var h = Reveal.getIndices().h;
  var hint = NEXT_HINTS[h];
  if (hint) {
    el.innerHTML = '<span class="nh-tag">NEXT</span>' + hint;
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

Reveal.on('ready', function () {
  if (window.lucide) { lucide.createIcons(); }
  if (window.initExerciseTimers) { window.initExerciseTimers(); }
  updateKicker();
  updateNextHint();
});
Reveal.on('slidechanged', function () { updateKicker(); updateNextHint(); });
