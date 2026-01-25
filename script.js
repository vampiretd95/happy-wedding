/* Snow + music */
(() => {
  const snowCanvas = document.getElementById('snow');
  const ctx = snowCanvas.getContext('2d');
  const img = new Image();
  img.src = 'assets/snowflake.png';

  let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  let flakes = [];
  const FLAKE_COUNT = 90; // small, subtle

  function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    snowCanvas.width = Math.floor(W * DPR);
    snowCanvas.height = Math.floor(H * DPR);
    snowCanvas.style.width = W + 'px';
    snowCanvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function initFlakes(){
    flakes = Array.from({length: FLAKE_COUNT}).map(() => ({
      x: rand(0, W),
      y: rand(-H, H),
      r: rand(4, 10),        // small size
      s: rand(0.4, 1.4),     // fall speed
      a: rand(0, Math.PI*2), // angle for drift
      w: rand(0.2, 0.9)      // drift amplitude
    }));
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for (const f of flakes){
      const drift = Math.sin(f.a) * (f.w * 18);
      const x = f.x + drift;
      const y = f.y;

      // subtle opacity
      const alpha = 0.30 + (f.r / 18);
      ctx.globalAlpha = alpha;

      if (img.complete && img.naturalWidth){
        ctx.drawImage(img, x, y, f.r, f.r);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, f.r/3, 0, Math.PI*2);
        ctx.fill();
      }

      f.y += f.s;
      f.a += 0.01 + f.s*0.002;

      if (f.y > H + 20){
        f.y = -rand(10, 60);
        f.x = rand(0, W);
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initFlakes(); });
  resize(); initFlakes(); draw();

  // Album "show more"
  const moreBtn = document.querySelector('[data-more]');
  if (moreBtn){
    moreBtn.addEventListener('click', () => {
      document.querySelectorAll('[data-hidden="1"]').forEach(el => el.removeAttribute('data-hidden'));
      moreBtn.style.display = 'none';
    });
  }

  // Music autoplay: browsers require user gesture. We'll try once, then fall back to button.
  const audio = document.getElementById('bgm');
  const musicBtn = document.getElementById('musicBtn');

  function setPlaying(p){
    musicBtn.classList.toggle('playing', p);
    musicBtn.setAttribute('aria-pressed', String(p));
  }

  async function tryPlay(){
    try{
      await audio.play();
      setPlaying(true);
      return true;
    }catch(e){
      setPlaying(false);
      return false;
    }
  }

  // first attempt on load (may fail)
  document.addEventListener('DOMContentLoaded', () => {
    tryPlay();
  });

  // user gesture unlock
  const unlock = async () => {
    await tryPlay();
    window.removeEventListener('pointerdown', unlock);
  };
  window.addEventListener('pointerdown', unlock, { once: true });

  musicBtn.addEventListener('click', async () => {
    if (audio.paused){
      await tryPlay();
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  // Countdown
  const target = document.querySelector('[data-countdown]');
  if (target){
    const dt = target.getAttribute('data-countdown'); // ISO
    const end = new Date(dt).getTime();

    const els = {
      days: document.querySelector('[data-cd="days"] .num'),
      hours: document.querySelector('[data-cd="hours"] .num'),
      mins: document.querySelector('[data-cd="mins"] .num'),
      secs: document.querySelector('[data-cd="secs"] .num'),
    };

    const tick = () => {
      const now = Date.now();
      let diff = Math.max(0, end - now);
      const d = Math.floor(diff / 86400000); diff -= d*86400000;
      const h = Math.floor(diff / 3600000); diff -= h*3600000;
      const m = Math.floor(diff / 60000); diff -= m*60000;
      const s = Math.floor(diff / 1000);

      const pad = (n) => String(n).padStart(2,'0');
      els.days.textContent = String(d);
      els.hours.textContent = pad(h);
      els.mins.textContent = pad(m);
      els.secs.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }
})();
