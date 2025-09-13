/**
 * Frontend JavaScript for the Ticker Tape Parade block.
 * Handles dynamic animation timing and accessibility features.
 */

document.addEventListener('DOMContentLoaded', function() {
	const tickers = document.querySelectorAll('.wp-block-telex-ticker-tape-parade');
	
	tickers.forEach(function(ticker) {
		const tickerContent = ticker.querySelector('.ticker-content');
		const tickerText = ticker.querySelector('.ticker-text');
		const speed = parseInt(ticker.dataset.speed) || 30;
		
		if (!tickerContent || !tickerText) return;

		// Set the data-content attribute for the ::after pseudo-element
		const textContent = tickerText.textContent.trim();
		tickerContent.setAttribute('data-content', textContent);
		
		// Handle reduced motion preference first
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			tickerContent.style.animation = 'none';
			tickerContent.style.transform = 'translateX(0)';
			return;
		}

		// Calculate and apply animation duration based on speed
		// Using the same formula: Math.max(10, 60 - speed)
		const animationDuration = Math.max(10, 60 - speed) + 's';
		tickerContent.style.animationDuration = animationDuration;
		tickerContent.style.animationPlayState = 'running';
		
		// Handle pause on hover if enabled
		if (ticker.classList.contains('pause-on-hover')) {
			ticker.addEventListener('mouseenter', function() {
				tickerContent.style.animationPlayState = 'paused';
			});
			
			ticker.addEventListener('mouseleave', function() {
				if (!prefersReducedMotion) {
					tickerContent.style.animationPlayState = 'running';
				}
			});
			
			// Handle focus for accessibility
			ticker.addEventListener('focus', function() {
				tickerContent.style.animationPlayState = 'paused';
			});
			
			ticker.addEventListener('blur', function() {
				if (!prefersReducedMotion) {
					tickerContent.style.animationPlayState = 'running';
				}
			});
		}

		// Optimize performance by pausing animations when page is hidden
		document.addEventListener('visibilitychange', function() {
			if (document.hidden) {
				tickerContent.style.animationPlayState = 'paused';
			} else if (!prefersReducedMotion && !ticker.matches(':hover')) {
				tickerContent.style.animationPlayState = 'running';
			}
		});

		// Handle resize efficiently
		let resizeTimeout;
		window.addEventListener('resize', function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() {
				if (!prefersReducedMotion) {
					// Force restart animation to handle container size changes
					const currentDuration = tickerContent.style.animationDuration;
					tickerContent.style.animation = 'none';
					tickerContent.offsetHeight; // Force reflow
					tickerContent.style.animation = `scroll-left ${currentDuration} linear infinite`;
				}
			}, 150);
		});
	});

	// Listen for changes in reduced motion preference
	if (window.matchMedia) {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		mediaQuery.addEventListener('change', function() {
			tickers.forEach(function(ticker) {
				const tickerContent = ticker.querySelector('.ticker-content');
				if (tickerContent) {
					if (mediaQuery.matches) {
						tickerContent.style.animation = 'none';
						tickerContent.style.transform = 'translateX(0)';
					} else {
						const speed = parseInt(ticker.dataset.speed) || 30;
						const animationDuration = Math.max(10, 60 - speed) + 's';
						tickerContent.style.animation = `scroll-left ${animationDuration} linear infinite`;
					}
				}
			});
		});
	}
});