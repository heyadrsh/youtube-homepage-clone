// Lazy loading for images with IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('.lazy-load');
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.addEventListener('load', function() {
            lazyImage.classList.add('lazy-loaded');
          });
          imageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: '200px 0px'
    });
    
    lazyImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let lazyLoadThrottleTimeout;
    
    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout);
      }
      
      lazyLoadThrottleTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset;
        
        lazyImages.forEach(function(img) {
          if (img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.addEventListener('load', function() {
              img.classList.add('lazy-loaded');
            });
          }
        });
        
        if (lazyImages.length === 0) { 
          document.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
          window.removeEventListener('orientationChange', lazyLoad);
        }
      }, 20);
    }
    
    document.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationChange', lazyLoad);
    
    // Initial load
    lazyLoad();
  }
});

// Preload next page images when user has viewed most of the current content
window.addEventListener('scroll', function() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  
  // If user has scrolled 75% of the page, preload more images
  if (scrollTop + clientHeight >= scrollHeight * 0.75) {
    const remainingLazyImages = document.querySelectorAll('.lazy-load:not(.lazy-loaded)');
    if (remainingLazyImages.length > 0) {
      const nextImages = Array.from(remainingLazyImages).slice(0, 4);
      nextImages.forEach(img => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.dataset.src;
        document.head.appendChild(preloadLink);
      });
    }
  }
});

// Image conversion and optimization helper
function optimizeImage(imgElement) {
  // This function would typically optimize images on the fly
  // For now, it just ensures all images are properly loaded
  if (imgElement.complete) {
    imgElement.classList.add('lazy-loaded');
  } else {
    imgElement.addEventListener('load', function() {
      imgElement.classList.add('lazy-loaded');
    });
  }
  
  return imgElement;
}

// Add smooth animations for a better user experience
document.addEventListener('DOMContentLoaded', function() {
  // Slight animation when hovering over video thumbnails
  const thumbnailElements = document.querySelectorAll('.thumbnail-row');
  thumbnailElements.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', function() {
      thumbnail.style.transform = 'scale(1.05)';
      thumbnail.style.transition = 'transform 0.3s ease';
    });
    thumbnail.addEventListener('mouseleave', function() {
      thumbnail.style.transform = 'scale(1)';
    });
  });
}); 