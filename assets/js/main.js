// Wedding Invitation Configuration
const CONFIG = {
  groom: "Thinh Nguyễn",
  bride: "Nhung Suzy",
  weddingDate: "2026-03-08T10:30:00+07:00",
  weddingDateText: "Chủ Nhật 08 Tháng 03 2026",

  groomInfo: {
    description:
      "Chú rể là người cởi mở, thân thiện, giao tiếp tốt và thuộc tuýp người hướng ngoại."
  },

  brideInfo: {
    description:
      "Cô dâu thuộc tuýp người hướng nội. Sở thích nấu nướng và đi du lịch cùng gia đình."
  },

  loveStory: [
    {
      date: "07.2025",
      title: "Lần đầu gặp",
      text:
        "Ngày ấy vu vơ đăng một dòng status trên facebook than thở, vu vơ đùa giỡn nói chuyện với một người xa lạ chưa từng quen.",
      image: "assets/story-1.jpg"
    },
    {
      date: "12.2025",
      title: "Ngõ lời yêu",
      text:
        "Mỗi chiều cuối tuần thường chạy xe vòng quanh qua những con phố, len lỏi trong từng dòng người tấp nập.",
      image: "assets/story-2.jpg"
    },
    {
      date: "20.10.2025",
      title: "Cầu hôn",
      text:
        "Chúng ta từ 2 con người xa lạ mà bước vào cuộc đời nhau. Và giờ đây chúng ta tiếp tục cùng nhau sang trang mới.",
      image: "assets/story-3.jpg"
    },
    {
      date: "22.12.2025",
      title: "Ngày trọng đại",
      text:
        "Em và anh không chỉ là người yêu mà chúng ta còn là tri kỷ. Ngày hôm nay, em sẽ là cô dâu của anh.",
      image: "assets/story-4.jpg"
    }
  ],

  events: [
    {
      title: "Nhà Trai",
      place: "Bùi Hạ Yết Kiêu Hải Phòng",
      time: "Vào lúc 10:30 Sáng",
      weekday: "Chủ Nhật",
      date: "08/03",
      year: "2026",
      lunar: "Nhằm ngày 20 Tháng 1 Năm Qúy Mão Âm lịch",
      mapUrl:
        "https://www.google.com/maps?q=171%20Nguy%E1%BB%85n%20Th%C3%A1i%20S%C6%A1n%2C%20G%C3%B2%20V%E1%BA%A5p",
      image: "assets/img/cover.jpg"
    },
    {
      title: "Nhà Gái",
      place: "Phường Minh Bắc Ninh",
      time: "Vào lúc 10:30 Sáng",
      weekday: "Chủ Nhật",
      date: "08/03",
      year: "2026",
      lunar: "Nhằm ngày 20 Tháng 1 Năm Qúy Mão Âm lịch",
      mapUrl:
        "https://www.google.com/maps?q=Phường%20Minh%2C%20Bắc%20Ninh",
      image: "assets/img/cover.jpg"
    }
  ],

  gallery: {
    total: 39,
    firstLoad: 12,
    loadMore: 12,
    imagePath: (index) => `assets/album/${index}.jpg`
  }
};

// Utility
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const pad2 = (n) => String(n).padStart(2, "0");

const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// Boot
document.addEventListener("DOMContentLoaded", () => {
  document.title = `${CONFIG.groom} ♡ ${CONFIG.bride} • Mẫu Thiệp Lãng Mạn`;

  initTimeline();
  initEvents();
  initGallery();
  initCountdown();
  initWishes();
  initMusic();
  initLightbox();
  initShare();
  initSmoothScroll();
});

function initTimeline() {
  const timeline = $("#timeline");
  if (!timeline) return;

  timeline.innerHTML = "";

  CONFIG.loveStory.forEach((story, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-image" style="background-image: url('${story.image}')"></div>
      <div class="timeline-content">
        <div class="timeline-date">${story.date}</div>
        <div class="timeline-title">${story.title}</div>
        <div class="timeline-text">${story.text}</div>
      </div>
    `;

    item.style.animationDelay = `${index * 0.1}s`;
    timeline.appendChild(item);
  });
}

function initEvents() {
  const eventsList = $("#eventsList");
  if (!eventsList) return;

  eventsList.innerHTML = "";

  CONFIG.events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-image" style="background-image: url('${event.image}')"></div>
      <div class="event-content">
        <div class="event-title">${event.title}</div>
        <div class="event-place">${event.place}</div>
        <div class="event-time">${event.time}</div>
        <div class="event-date-row">
          <span class="event-weekday">${event.weekday}</span>
          <span class="event-date">${event.date}</span>
          <span class="event-year">${event.year}</span>
        </div>
        ${event.lunar ? `<div class="event-lunar">${event.lunar}</div>` : ""}
        <div class="event-actions">
          <a href="${event.mapUrl}" class="event-map-link" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="16" height="16">
              <path d="M560.02 32c-1.96 0-3.98.37-5.96 1.16L384.01 96H384L212 35.28A64.252 64.252 0 0 0 191.76 32c-6.69 0-13.37 1.05-19.81 3.14L20.12 87.95A32.006 32.006 0 0 0 0 117.66v346.32C0 473.17 7.53 480 15.99 480c1.96 0 3.97-.37 5.96-1.16L192 416l172 60.71a63.98 63.98 0 0 0 40.05.15l151.83-52.81A31.996 31.996 0 0 0 576 394.34V48.02c0-9.19-7.53-16.02-15.98-16.02zM224 90.42l128 45.19v285.97l-128-45.19V90.42zM48 418.05V129.07l128-44.53v286.2l-.64.23L48 418.05zm480-35.13l-128 44.53V141.26l.64-.24L528 93.95v288.97z"/>
            </svg>
          </a>
        </div>
      </div>
    `;

    card.style.animationDelay = `${index * 0.1}s`;
    eventsList.appendChild(card);
  });
}

function initGallery() {
  const gallery = $("#photoGallery");
  const loadMoreBtn = $("#loadMoreBtn");
  if (!gallery) return;

  let showing = CONFIG.gallery.firstLoad;

  function renderGallery() {
    gallery.innerHTML = "";

    for (let i = 1; i <= Math.min(showing, CONFIG.gallery.total); i++) {
      const item = document.createElement("div");
      item.className = "gallery-item";
      const src = CONFIG.gallery.imagePath(i);
      item.innerHTML = `<img src="${src}" alt="Wedding photo ${i}" loading="lazy">`;
      item.addEventListener("click", () => openLightbox(src));
      gallery.appendChild(item);
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        showing >= CONFIG.gallery.total ? "none" : "inline-flex";
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      showing = Math.min(CONFIG.gallery.total, showing + CONFIG.gallery.loadMore);
      renderGallery();
    });
  }

  renderGallery();
}

function initCountdown() {
  const daysEl = $("#days");
  const hoursEl = $("#hours");
  const minutesEl = $("#minutes");
  const secondsEl = $("#seconds");
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const weddingTime = new Date(CONFIG.weddingDate).getTime();

  function update() {
    const now = Date.now();
    let diff = Math.max(0, weddingTime - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    daysEl.textContent = pad2(days);
    hoursEl.textContent = pad2(hours);
    minutesEl.textContent = pad2(minutes);
    secondsEl.textContent = pad2(seconds);
  }

  update();
  setInterval(update, 1000);
}

function initWishes() {
  const wishForm = $("#wishForm");
  const wishesList = $("#wishesList");
  const rememberMe = $("#rememberMe");

  const STORAGE_KEY = "wedding_wishes";
  const PROFILE_KEY = "wedding_profile";

  const loadWishes = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const saveWishes = (w) => localStorage.setItem(STORAGE_KEY, JSON.stringify(w));

  const loadProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const saveProfile = (p) => localStorage.setItem(PROFILE_KEY, JSON.stringify(p));

  const render = () => {
    if (!wishesList) return;

    const wishes = loadWishes().slice().reverse();
    wishesList.innerHTML = "";

    if (wishes.length === 0) {
      wishesList.innerHTML =
        '<div class="wish-item"><div class="wish-message">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc đến cặp đôi!</div></div>';
      return;
    }

    wishes.forEach((wish) => {
      const el = document.createElement("div");
      el.className = "wish-item";
      el.innerHTML = `
        <div class="wish-header">
          <div class="wish-name">${escapeHtml(wish.name)}</div>
          <div class="wish-time">${new Date(wish.timestamp).toLocaleString("vi-VN")}</div>
        </div>
        <div class="wish-message">${escapeHtml(wish.message)}</div>
      `;
      wishesList.appendChild(el);
    });
  };

  const profile = loadProfile();
  if (profile.name) {
    const nameInput = wishForm?.querySelector('input[name="name"]');
    if (nameInput) nameInput.value = profile.name;
  }
  if (profile.email) {
    const emailInput = wishForm?.querySelector('input[name="email"]');
    if (emailInput) emailInput.value = profile.email;
  }

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(wishForm);
      const name = (formData.get("name") || "").trim();
      const email = (formData.get("email") || "").trim();
      const message = (formData.get("message") || "").trim();

      if (!name || !message) {
        showToast("Vui lòng điền tên và lời chúc!");
        return;
      }

      const wishes = loadWishes();
      wishes.push({ name, email, message, timestamp: Date.now() });
      saveWishes(wishes);

      if (rememberMe?.checked) {
        saveProfile({ name, email });
      } else {
        localStorage.removeItem(PROFILE_KEY);
      }

      wishForm.reset();
      render();
      showToast("Gửi lời chúc thành công! Cảm ơn bạn rất nhiều.");
    });
  }

  render();
}

function initMusic() {
  const musicBtn = $("#musicBtn");
  const bgMusic = $("#bgm");
  if (!musicBtn || !bgMusic) return;

  const setPlayingUI = (playing) => {
    musicBtn.classList.toggle("playing", playing);
    musicBtn.setAttribute("aria-pressed", playing ? "true" : "false");
  };

  setPlayingUI(!bgMusic.paused);

  bgMusic.addEventListener("play", () => setPlayingUI(true));
  bgMusic.addEventListener("pause", () => setPlayingUI(false));
  bgMusic.addEventListener("ended", () => setPlayingUI(false));

  async function toggleMusic() {
    try {
      if (!bgMusic.paused) {
        bgMusic.pause();
        return;
      }

      bgMusic.volume = 0.7;
      await bgMusic.play();
    } catch (error) {
      setPlayingUI(false);
      showToast("Không thể phát nhạc. Vui lòng kiểm tra file nhạc.");
      // eslint-disable-next-line no-console
      console.error("Music play error:", error);
    }
  }

  musicBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMusic();
  });
}

function initLightbox() {
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxClose = $("#lightboxClose");
  if (!lightbox || !lightboxImg || !lightboxClose) return;

  window.openLightbox = function openLightbox(imageSrc) {
    lightboxImg.src = imageSrc;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

function initShare() {
  const shareBtn = $("#shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    const url = window.location.href;
    const title = document.title;
    const text = "Thiệp cưới online";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Đã sao chép link thiệp!");
      } catch {
        showToast("Không thể sao chép link. Vui lòng thử lại.");
      }
    }
  });
}

function initSmoothScroll() {
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function onClick(e) {
      e.preventDefault();
      const target = $(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    font-size: 14px;
    z-index: 3000;
    max-width: 90vw;
    text-align: center;
    animation: slideUp 0.3s ease;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideUp {
      from { transform: translateX(-50%) translateY(100%); opacity: 0; }
      to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
      from { transform: translateX(-50%) translateY(0); opacity: 1; }
      to { transform: translateX(-50%) translateY(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideDown 0.3s ease";
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 300);
  }, 3000);
}
