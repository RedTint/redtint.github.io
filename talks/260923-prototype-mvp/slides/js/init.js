/* Reveal.js initialization for From Idea to MVP.
   Conventions carried over from the 260902 deck:
   linear horizontal deck, fade transitions, no auto-advance, no loop,
   no slide numbers, no built-in progress bar, speaker notes plugin on,
   top-aligned (center: false); statement slides use .centered.
   New in this deck: the sprint progress bar (MAP SKETCH DECIDE PROTOTYPE TEST)
   rendered from each section's data-bar attribute. */

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

/* Persistent section kicker (bottom left). Indices are 0-based horizontal. */
var SECTIONS = [
  { from: 0,  to: 3,  label: 'Opening' },
  { from: 4,  to: 10, label: '01 · The Problem' },
  { from: 11, to: 19, label: '02 · Foundations' },
  { from: 20, to: 23, label: '03 · The Design Sprint' },
  { from: 24, to: 29, label: 'Sprint 1 · Understand & Map' },
  { from: 30, to: 35, label: 'Sprint 2 · Sketch & Ideate' },
  { from: 36, to: 44, label: 'Sprint 3 · Decide & Storyboard' },
  { from: 45, to: 45, label: 'Break' },
  { from: 46, to: 46, label: 'Live Teardown' },
  { from: 47, to: 50, label: 'Sprint 4 · PROTOTYPE' },
  { from: 51, to: 55, label: 'Sprint 5 · TEST' },
  { from: 56, to: 58, label: 'Iterate' },
  { from: 59, to: 64, label: '04 · The Payoff' },
  { from: 65, to: 67, label: 'Close' }
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

/* Next-topic hints, bottom right. One entry per slide (0-based). */
var NEXT_HINTS = [
  'About me', 'How today works', 'Hands up check', 'The hackathon trap',
  'Your feature list', 'The iceberg', 'How demos die', 'The real enemy',
  'The three levers', 'One proven flow', 'Two words', 'Prototype: three jobs', 'The movie set',
  'MVP letter by letter', 'Key differences', 'The rule', 'The skateboard', 'Not half a product',
  'Winning this week', 'The design sprint', 'Five days, five steps', 'Why it works',
  'Meet CanteenGo', 'Step 1: Understand and Map', 'CanteenGo: understand', 'CanteenGo personas', 'One sentence', 'The journey', 'Exercise: map yours',
  'Step 2: Sketch and Ideate', 'CanteenGo: How Might We', 'Sketches, grown up', 'Wireframe basics', 'Ugly is correct', 'Exercise: sketch yours',
  'Step 3: Decide and Storyboard', 'The disappearing test', 'The sticky wall', 'Cut these first',
  'The fidelity ladder', 'Which rung, when', 'The second rule', 'The tools',
  'Exercise: decide yours', 'Break', 'Live teardown', 'Step 4: PROTOTYPE',
  'Three build rules', 'Team roles', 'Exercise: build plan',
  'Step 5: TEST', 'The 5-minute test', 'Watch what they do', 'Live user test',
  'Your first user test', 'All five lit', 'Feedback is a to-do list', 'Build, measure, learn',
  'What you now hold', 'Tomorrow: pitch prep', 'The judges scorecard', 'Your pitch: 5+1+5', 'Never apologize',
  'Prove the most', 'The commitment', 'Q and A', 'Thank you', null
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

/* Sprint progress bar. Each section may carry data-bar="xxxxx" where each
   char is u (unlit), c (current), or l (lit) for
   MAP, SKETCH, DECIDE, PROTOTYPE, TEST. No attribute hides the bar. */
var BAR_LABELS = ['UNDERSTAND & MAP', 'SKETCH & IDEATE', 'DECIDE & STORYBOARD', 'PROTOTYPE', 'TEST'];

function updateSprintBar() {
  var bar = document.getElementById('sprint-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'sprint-bar';
    BAR_LABELS.forEach(function (label) {
      var seg = document.createElement('div');
      seg.className = 'seg';
      seg.textContent = label;
      bar.appendChild(seg);
    });
    document.body.appendChild(bar);
  }
  var slide = Reveal.getCurrentSlide();
  var states = slide ? slide.getAttribute('data-bar') : null;
  if (!states || states.length !== 5) {
    bar.style.display = 'none';
    return;
  }
  bar.style.display = 'flex';
  var segs = bar.querySelectorAll('.seg');
  for (var i = 0; i < 5; i++) {
    segs[i].classList.remove('current', 'lit');
    if (states[i] === 'c') { segs[i].classList.add('current'); }
    if (states[i] === 'l') { segs[i].classList.add('lit'); }
  }
}

Reveal.on('ready', function () {
  if (window.lucide) { lucide.createIcons(); }
  if (window.initExerciseTimers) { window.initExerciseTimers(); }
  updateKicker();
  updateNextHint();
  updateSprintBar();
});
Reveal.on('slidechanged', function () { updateKicker(); updateNextHint(); updateSprintBar(); });
