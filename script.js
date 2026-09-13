/**
 * KARIGAR SETU • TEAM ZENITH • SMART INDIA HACKATHON 2026
 * Interactive Video Player & Navigation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('demoVideo') || document.getElementById('appDemoVideo');
  const playOverlayBtn = document.getElementById('playOverlayBtn') || document.getElementById('mainPlayBtn');
  const miniPlayBtn = document.getElementById('miniPlayBtn') || document.getElementById('togglePlayBtn');
  const muteBtn = document.getElementById('muteBtn') || document.getElementById('toggleMuteBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn') || document.getElementById('toggleFullscreenBtn');
  const progressBar = document.getElementById('progressBar') || document.getElementById('videoTrack');
  const progressFill = document.getElementById('progressFill') || document.getElementById('trackProgress');
  const heroPlayTrigger = document.getElementById('heroPlayTrigger');
  const videoContainer = document.getElementById('videoContainer') || document.getElementById('screenContainer');

  if (!video) return;

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play().then(() => {
        if (playOverlayBtn) playOverlayBtn.classList.add('hidden');
        if (miniPlayBtn) miniPlayBtn.innerHTML = pauseIconSvg();
      }).catch((err) => {
        console.warn("Video playback note:", err);
      });
    } else {
      video.pause();
      if (playOverlayBtn) playOverlayBtn.classList.remove('hidden');
      if (miniPlayBtn) miniPlayBtn.innerHTML = playIconSvg();
    }
  }

  // Central red play button overlay
  if (playOverlayBtn) {
    playOverlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Mini play button in bar
  if (miniPlayBtn) {
    miniPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // Hero section "Watch App Demo" CTA button
  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const phoneWrapper = document.getElementById('phoneWrapper');
      if (phoneWrapper) {
        phoneWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      togglePlay();
    });
  }

  // Clicking the video screen directly toggles play/pause
  if (videoContainer) {
    videoContainer.addEventListener('click', (e) => {
      if (e.target.closest('.video-interactive-bar') || e.target.closest('.screen-control-bar')) return;
      togglePlay();
    });
  }

  video.addEventListener('play', () => {
    if (playOverlayBtn) playOverlayBtn.classList.add('hidden');
    if (miniPlayBtn) miniPlayBtn.innerHTML = pauseIconSvg();
  });

  video.addEventListener('pause', () => {
    if (playOverlayBtn) playOverlayBtn.classList.remove('hidden');
    if (miniPlayBtn) miniPlayBtn.innerHTML = playIconSvg();
  });

  // Video progress updating
  video.addEventListener('timeupdate', () => {
    if (video.duration && progressFill) {
      const percentage = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  });

  // Scrubbing on progress bar click
  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      e.stopPropagation();
      const rect = progressBar.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      video.currentTime = clickPos * video.duration;
    });
  }

  // Audio mute/unmute
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted ? mutedIconSvg() : unmutedIconSvg();
    });
  }

  // Fullscreen
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Active navigation highlight on scroll
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('href') === `#${current}`) {
        btn.classList.add('active');
      }
    });
  });
});

function playIconSvg() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
}

function pauseIconSvg() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
}

function mutedIconSvg() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>`;
}

function unmutedIconSvg() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
}
