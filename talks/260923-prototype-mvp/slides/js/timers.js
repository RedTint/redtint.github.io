/* Exercise countdown timers (team block slides 25, 29, 38, 39, 45, 50, 59).
   Same behavior as the 260902 deck: started by a fragment click (class
   timer-start), never auto-advances, flashes at zero.
   Backup control: clicking the timer toggles start and reset. */

window.initExerciseTimers = function () {
  var timers = {};

  function render(el, seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
  }

  function reset(el) {
    var state = timers[el.id];
    if (state && state.interval) { clearInterval(state.interval); }
    timers[el.id] = { interval: null, remaining: parseInt(el.dataset.seconds, 10) };
    el.classList.remove('done');
    render(el, timers[el.id].remaining);
  }

  function start(el) {
    var state = timers[el.id];
    if (!state || state.interval) { return; }
    state.interval = setInterval(function () {
      state.remaining -= 1;
      if (state.remaining <= 0) {
        state.remaining = 0;
        clearInterval(state.interval);
        state.interval = null;
        el.classList.add('done');
      }
      render(el, state.remaining);
    }, 1000);
  }

  document.querySelectorAll('.timer').forEach(function (el) {
    reset(el);
    el.addEventListener('click', function () {
      var state = timers[el.id];
      if (state.interval || state.remaining === 0) { reset(el); } else { start(el); }
    });
  });

  /* Fragment with class timer-start begins the countdown when revealed. */
  Reveal.on('fragmentshown', function (event) {
    if (event.fragment.classList.contains('timer-start')) {
      var timerEl = event.fragment.closest('section').querySelector('.timer');
      if (timerEl) { start(timerEl); }
    }
  });
  Reveal.on('fragmenthidden', function (event) {
    if (event.fragment.classList.contains('timer-start')) {
      var timerEl = event.fragment.closest('section').querySelector('.timer');
      if (timerEl) { reset(timerEl); }
    }
  });
};
