import PhotoSwipeLightbox from '/assets/photoswipe/photoswipe-lightbox.esm.min.js';
import PhotoSwipeDynamicCaption from '/assets/photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js';
const lightbox = new PhotoSwipeLightbox({
  gallery: '#gallery',
  children: 'a',
  pswpModule: () => import('/assets/photoswipe/photoswipe.esm.min.js')
});
const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  // Plugins options, for example:
  type: 'auto',
});
lightbox.init();


lightbox.on('beforeOpen', () => {
   var stateObj = { lg: "close" };
   var url = window.location.href;
   history.pushState(stateObj, "Gallery", url);
});
lightbox.on('close', () => {
  // PhotoSwipe starts to close, unbind most events here
  if (history.state !== null) {
	if (history.state.lg === "close") history.back();
  }
});
window.onpopstate = function(event) { 
	const button = document.querySelector('.pswp__button--close');
	if (button) {
		button.click();
	}
}


const scrollToTopButton = document.getElementById('scroll-to-top-button');

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	scrollToTopButton.style.display = 'block';
  } else {
	scrollToTopButton.style.display = 'none';
  }
}

scrollToTopButton.addEventListener('click', function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});