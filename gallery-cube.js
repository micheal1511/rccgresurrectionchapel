const mediaItems = [
    { type: "image", src: "church-img1.jpg", label: "🕊️ Peaceful Sanctuary" },
    { type: "video", src: "church-vid1.mp4", label: "🎵 Ads. Tap to unmute", poster: "" },
    { type: "image", src: "church-img3.jpg", label: "👨‍👩‍👧 Saxophone ministration" },
    { type: "video", src: "church-vid2.mp4", label: "🌿 Prayer from G.O. Tap to unmute", poster: "" },
    { type: "image", src: "church-img4.jpg", label: "🌅 Thanks giving service" },
    { type: "video", src: "church-vid3.mp4", label: "🎶 RCCG Logo animation", poster: "" },
    { type: "image", src: "church-img10.jpg", label: "Testimonies" }
  ];

  // Cube global variables
  let currentFaceIndex = 0;         // which face is facing forward (0-based)
  const totalFaces = mediaItems.length;
  let autoRotateInterval = null;
  let autoEnabled = true;
  let isDragging = false;
  let dragStartX = 0;
  let dragThreshold = 35;            // min swipe distance in px
  let cubeElement = document.getElementById("dynamicCube");
  let containerWrapper = document.querySelector(".cube-wrapper");
  
  // Store video instances and observers
  let activeVideoElement = null;

  // Helper: dynamic depth based on cube width
  function updateDepth() {
    if (!cubeElement) return;
    const width = cubeElement.clientWidth;
    if (!width) return;
    const depth = width / 2;
    // apply dynamic transformZ on all existing faces
    const faces = cubeElement.querySelectorAll('.face');
    if (faces.length === 0) return;
    faces.forEach(face => {
      if (face.classList.contains('front')) face.style.transform = `translateZ(${depth}px)`;
      else if (face.classList.contains('back')) face.style.transform = `rotateY(180deg) translateZ(${depth}px)`;
      else if (face.classList.contains('right')) face.style.transform = `rotateY(90deg) translateZ(${depth}px)`;
      else if (face.classList.contains('left')) face.style.transform = `rotateY(-90deg) translateZ(${depth}px)`;
    });
  }

  // Build the cube with all faces (front, right, back, left order based on currentFaceIndex)
  // We will position dynamically: but we always keep 4 faces? Actually to support many media >4, we rotate cube to make a different set?
  // Standard cube has 4 lateral faces. But we want more than 4 images/videos like a carousel. Real cube can only show 4 at a time, but we can "rotate" cube to change which media appears on front/right/back/left.
  // Better approach: use a "virtual carousel" where cube faces cycle through media array.
  // Implementation: We render 4 DOM faces (front, right, back, left). Content updates based on currentFaceIndex offset.
  // So we map mediaItems to 4 visible positions: front = mediaItems[currentFaceIndex], right = mediaItems[(currentFaceIndex+1)%totalFaces], back = mediaItems[(currentFaceIndex+2)%totalFaces], left = mediaItems[(currentFaceIndex+3)%totalFaces].
  // Then rotating the cube cyclically changes which indices are displayed.
  
  function buildOrUpdateFaces() {
    if (!cubeElement) return;
    // Get the 4 indices for the cube faces (starting from front index)
    const frontIdx = currentFaceIndex % totalFaces;
    const rightIdx = (currentFaceIndex + 1) % totalFaces;
    const backIdx = (currentFaceIndex + 2) % totalFaces;
    const leftIdx = (currentFaceIndex + 3) % totalFaces;
    
    const mediaMap = [
      { idx: frontIdx, position: 'front', angle: 0 },
      { idx: rightIdx, position: 'right', angle: 90 },
      { idx: backIdx, position: 'back', angle: 180 },
      { idx: leftIdx, position: 'left', angle: -90 }
    ];
    
    // Clear existing faces but preserve cube container
    while (cubeElement.firstChild) {
      cubeElement.removeChild(cubeElement.firstChild);
    }
    
    // Create 4 face divs
    mediaMap.forEach((item) => {
      const media = mediaItems[item.idx];
      const faceDiv = document.createElement('div');
      faceDiv.className = `face ${item.position}`;
      faceDiv.setAttribute('data-media-index', item.idx);
      faceDiv.setAttribute('data-position', item.position);
      
      // Create media element
      let mediaEl;
      if (media.type === 'image') {
        mediaEl = document.createElement('img');
        mediaEl.src = media.src;
        mediaEl.alt = media.label;
        mediaEl.loading = "lazy";
      } else {
        mediaEl = document.createElement('video');
        mediaEl.src = media.src;
        mediaEl.poster = media.poster || (media.src + '?poster');
        mediaEl.loop = true;
        mediaEl.muted = true;   // autoplay policy requires muted
        mediaEl.playsInline = true;
        mediaEl.preload = "metadata";
        // attach event to notify when video becomes visible manually later
      }
      
      mediaEl.style.width = "100%";
      mediaEl.style.height = "100%";
      mediaEl.style.objectFit = "cover";
      
      const labelSpan = document.createElement('div');
      labelSpan.className = "media-label";
      labelSpan.innerHTML = `<i class="fas ${media.type === 'image' ? 'fa-image' : 'fa-video'}"></i> ${media.label}`;
      
      faceDiv.appendChild(mediaEl);
      faceDiv.appendChild(labelSpan);
      cubeElement.appendChild(faceDiv);
    });
    
    // After building, set correct depth
    updateDepth();
    // manage video playback for current visible face (front)
    manageVideoPlaybackForVisible();
  }
  
  // Function to rotate cube to a specific target face index (animation)
  let currentAngle = 0;  // in degrees Y rotation
  function setCubeRotation(angleDeg) {
    if (cubeElement) {
      cubeElement.style.transform = `rotateY(${angleDeg}deg)`;
      currentAngle = angleDeg;
    }
  }
  
  // Rotate to new index smoothly (by changing which face is front)
  // We need to rotate cube visually then update indices.
  // For smooth transition: we rotate cube by +90 or -90, then after transition update internal currentFaceIndex and rebuild faces to keep infinite content.
  // This is the typical "infinite cube" pattern.
  let isAnimating = false;
  
  function rotateNext(direction = 'right') {
    if (isAnimating) return;
    isAnimating = true;
    
    const step = (direction === 'right') ? -90 : 90; // right = -90deg, left = +90deg
    const targetAngle = currentAngle + step;
    
    setCubeRotation(targetAngle);
    
    // after transition ends, increment/decrement actual face index and rebuild faces, reset angle to 0
    const onTransitionEnd = () => {
      cubeElement.removeEventListener('transitionend', onTransitionEnd);
      if (direction === 'right') {
        // clockwise: show next media -> front becomes old right index: increment currentFaceIndex
        currentFaceIndex = (currentFaceIndex + 1) % totalFaces;
      } else {
        // counter-clockwise
        currentFaceIndex = (currentFaceIndex - 1 + totalFaces) % totalFaces;
      }
      // reset cube rotation to 0 deg without transition
      cubeElement.style.transition = 'none';
      setCubeRotation(0);
      // force reflow
      void cubeElement.offsetHeight;
      cubeElement.style.transition = 'transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1.1)';
      // rebuild faces with new currentFaceIndex
      buildOrUpdateFaces();
      updateDotsActive();
      // reset animation flag
      isAnimating = false;
      // after rebuild, ensure video playback
      manageVideoPlaybackForVisible();
    };
    
    cubeElement.addEventListener('transitionend', onTransitionEnd, { once: true });
    // fallback timeout
    setTimeout(() => {
      if (isAnimating) {
        cubeElement.removeEventListener('transitionend', onTransitionEnd);
        onTransitionEnd();
      }
    }, 800);
  }
  
  // manual controls
  function nextSlide() { if (!autoEnabled) stopAutoRotate(); rotateNext('right'); resetAutoTimer(); }
  function prevSlide() { if (!autoEnabled) stopAutoRotate(); rotateNext('left'); resetAutoTimer(); }
  
  // VIDEO MANAGEMENT: pause all videos except the one currently visible on front face
  function manageVideoPlaybackForVisible() {
    // after rebuild, we find which face is .front (visible)
    const frontFace = cubeElement.querySelector('.face.front');
    if (!frontFace) return;
    const allVideos = cubeElement.querySelectorAll('video');
    allVideos.forEach(vid => {
      vid.pause();
    });
    const frontVideo = frontFace.querySelector('video');
    if (frontVideo) {
      frontVideo.play().catch(e => console.log("video autoplay blocked, user swipe will enable later."));
      activeVideoElement = frontVideo;
    } else {
      activeVideoElement = null;
    }
    // also ensure other videos paused, no resource waste
  }
  
  // Swipe detection (touch + mouse drag)
  function initSwipe() {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    
    const handleTouchStart = (e) => {
      if (isAnimating) return;
      isSwiping = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      if (autoEnabled) stopAutoRotate();
    };
    const handleTouchMove = (e) => {
      if (!isSwiping || isAnimating) return;
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 20) {
        e.preventDefault();
      }
    };
    const handleTouchEnd = (e) => {
      if (!isSwiping || isAnimating) {
        isSwiping = false;
        return;
      }
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      isSwiping = false;
      resetAutoTimer();
    };
    
    // mouse drag simulation
    let mouseDown = false;
    let mouseStartX = 0;
    const onMouseDown = (e) => {
      if (isAnimating) return;
      mouseDown = true;
      mouseStartX = e.clientX;
      if (autoEnabled) stopAutoRotate();
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (!mouseDown || isAnimating) return;
      const diff = e.clientX - mouseStartX;
      if (Math.abs(diff) > 15) e.preventDefault();
    };
    const onMouseUp = (e) => {
      if (!mouseDown || isAnimating) {
        mouseDown = false;
        return;
      }
      const delta = e.clientX - mouseStartX;
      if (Math.abs(delta) > dragThreshold) {
        if (delta > 0) prevSlide();
        else nextSlide();
      }
      mouseDown = false;
      resetAutoTimer();
    };
    
    cubeElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    cubeElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    cubeElement.addEventListener('touchend', handleTouchEnd);
    cubeElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
  
  // Auto rotation
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!autoEnabled) return;
      if (isAnimating) return;
      nextSlide();
    }, 5000);
  }
  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }
  function resetAutoTimer() {
    if (!autoEnabled) return;
    stopAutoRotate();
    startAutoRotate();
  }
  function toggleAuto() {
    autoEnabled = !autoEnabled;
    const btn = document.getElementById('autoRotateToggle');
    if (autoEnabled) {
      startAutoRotate();
      btn.innerHTML = '<i class="fas fa-pause-circle"></i> Auto ON';
      btn.style.background = "#c69c5c";
    } else {
      stopAutoRotate();
      btn.innerHTML = '<i class="fas fa-play-circle"></i> Auto OFF';
      btn.style.background = "#3c3228";
    }
  }
  
  // Dots reflecting many images/videos (total faces)
  function updateDotsActive() {
    const dots = document.querySelectorAll('.face-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentFaceIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }
  
  function renderDots() {
    const container = document.getElementById('dotsContainer');
    container.innerHTML = '';
    for (let i = 0; i < totalFaces; i++) {
      const item = mediaItems[i];
      const icon = item.type === 'image' ? '<i class="fas fa-image"></i>' : '<i class="fas fa-video"></i>';
      const dot = document.createElement('div');
      dot.className = 'face-dot';
      if (i === currentFaceIndex) dot.classList.add('active');
      dot.innerHTML = `${icon} ${item.label.substring(0, 12)}`;
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isAnimating) return;
        if (autoEnabled) stopAutoRotate();
        // jump to specific index? We have to rotate dijkstra style
        let diff = (i - currentFaceIndex + totalFaces) % totalFaces;
        let stepsClockwise = diff;
        let stepsCounter = totalFaces - diff;
        if (stepsClockwise <= stepsCounter) {
          for (let s = 0; s < stepsClockwise; s++) {
            setTimeout(() => rotateNext('right'), s * 250);
          }
        } else {
          for (let s = 0; s < stepsCounter; s++) {
            setTimeout(() => rotateNext('left'), s * 250);
          }
        }
        setTimeout(() => { if(autoEnabled) resetAutoTimer(); }, stepsClockwise * 260);
      });
      container.appendChild(dot);
    }
  }
  
  // call rebuild and initialize
  function initCube() {
    buildOrUpdateFaces();
    setCubeRotation(0);
    renderDots();
    initSwipe();
    if (autoEnabled) startAutoRotate();
    // add resize observer to update depth
    const resizeObserver = new ResizeObserver(() => {
      updateDepth();
    });
    resizeObserver.observe(cubeElement);
    window.addEventListener('resize', () => updateDepth());
    updateDepth();
    manageVideoPlaybackForVisible();
  }
  
  // add event listeners for buttons
  document.getElementById('nextBtn').addEventListener('click', () => { nextSlide(); });
  document.getElementById('prevBtn').addEventListener('click', () => { prevSlide(); });
  document.getElementById('autoRotateToggle').addEventListener('click', toggleAuto);
  
  // also watch when video becomes visible after each rotation (additionally, after transition, we already manage in rotateNext's callback)
  const originalManage = manageVideoPlaybackForVisible;
  window.manageVideo = () => manageVideoPlaybackForVisible();
  
  // additional safety: ensure that after rebuild video plays
  initCube();
  
  // support if user interacts with video to unmute & resume playing: keep last playing video consistent
  cubeElement.addEventListener('click', (e) => {
    const video = e.target.closest('video');
    if (video && video.closest('.face.front')) {
      if (video.muted) {
        video.muted = false;
        const labelDiv = video.closest('.face')?.querySelector('.media-label');
        if(labelDiv) labelDiv.innerHTML += ' 🔈';
        setTimeout(() => {
          if(labelDiv) labelDiv.innerHTML = labelDiv.innerHTML.replace(' 🔈', '');
        }, 1200);
      } else {
        video.muted = true;
      }
      e.stopPropagation();
    }
  });
  
  // after any rotation, ensure video
  const originalBuild = buildOrUpdateFaces;
  window.buildOrUpdateFaces = buildOrUpdateFaces;
  
  // re-trigger video after visibility
  function enhancePlayback() { manageVideoPlaybackForVisible(); }
  setInterval(() => {
    if (!isAnimating && cubeElement) enhancePlayback();
  }, 800);