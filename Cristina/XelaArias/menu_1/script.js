// Go full page view for best results!

const cursor = document.querySelector('.cursor');
const menuItems = document.querySelectorAll('.menuListItem');
const menuItemTexts = document.querySelectorAll('.menuListItem__text.-initial');
const imageSliders = document.querySelectorAll('.imageSlider');
const image1 = document.querySelector('.image-1');
const image2 = document.querySelector('.image-2');
const image3 = document.querySelector('.image-3');
const image4 = document.querySelector('.image-4');
const image5 = document.querySelector('.image-5');
const loading = document.querySelector('.loading');

const moveCursor = ({ clientX, clientY }) => {
  const x = clientX + cursor.clientWidth / 2;
  const y = clientY + cursor.clientHeight / 2;

  cursor.style.transform = `translate(${x}px, ${y}px)`;
};

const initialAnimation = () => {
  gsap.to(menuItemTexts, 0.5, {
    yPercent: -100,
    delay: 0.4
  });

  gsap.to(image1, 0.9, {
    y: 0,
    x: 0,
    rotate: 0,
    ease: 'power3.out',
    delay: 0.1
  });

  gsap.to(image2, 1.2, {
    y: 0,
    x: 0,
    rotate: 0,
    ease: 'power3.out'
  });

  gsap.to(image3, 1.2, {
    y: 0,
    x: 0,
    rotate: 0,
    ease: 'power3.out'
  });

  gsap.to(image4, 1.2, {
    y: 0,
    x: 0,
    rotate: 0,
    ease: 'power3.out',
    delay: 0.2
  });

  gsap.to(image5, 1.2, {
    y: 0,
    x: 0,
    rotate: 0,
    ease: 'power3.out',
    delay: 0.2,
    onComplete: () => {
      Array.from(imageSliders).forEach(imageSliderItem => {
        imageSliderItem.style.backfaceVisibility = 'hidden';
      });
    }
  });
};

const loadImages = (() => {
  let loadedImagesCount = 0;
  const increaseCounter = () => {
    loadedImagesCount++;
    if (loadedImagesCount === document.images.length) {
      loading.style.display = 'none';
      setTimeout(initialAnimation, 500);
    }
  };
  Array.from(document.images).forEach(imageElement => {
    if (imageElement.complete) increaseCounter();
    else {
      imageElement.addEventListener('load', increaseCounter, false);
    }
  });
})();

const scaleRotate = (target, { shouldReverse, delay }) => {
  const activeSlide = target.querySelector('.imageSlider__slide:not(.-next)');
  const scale = shouldReverse ? 1 : 1.1;
  const rotate = shouldReverse ? 0 : 7;

  gsap.to(activeSlide, 0.9, {
    scale,
    rotate,
    delay,
    ease: 'power2.Out'
  });
};

const slide = (target, { shouldReverse, delay = 0, extraDuration = 0 }) => {
  const activeSlide = target.querySelector('.imageSlider__slide:not(.-next)');
  const nextSlide = target.querySelector('.imageSlider__slide.-next');
  const xPercent = shouldReverse ? 0 : 100;

  gsap.to([activeSlide, nextSlide], 0.7 + extraDuration, {
    xPercent,
    delay,
    ease: 'power2.inOut'
  });
};

const toggleAnimation = ({ currentTarget, type }, index) => {
  const initialText = currentTarget.querySelector(
    '.menuListItem__text.-initial'
  );
  const hoverText = currentTarget.querySelector('.menuListItem__text.-hover');
  const strokeLine = currentTarget.querySelector('.menuListItem__line');
  const shouldReverse = type === 'mouseout';
  const y = !shouldReverse ? 0 : -100;
  const ease = !shouldReverse ? 'power2.out' : 'power2.in';
  const strokeDashoffset = !shouldReverse ? 0 : 3400;

  gsap.to(initialText, 0.4, { yPercent: 0 + y, ease });
  gsap.to(hoverText, 0.4, { yPercent: 100 + y, ease });
  gsap.to(strokeLine, 0.5, { strokeDashoffset, ease: 'power2.in' });

  switch (index) {
    case 0:
      slide(image5, { shouldReverse, delay: 0.025, extraDuration: 0.3 });
      slide(image2, { shouldReverse, delay: 0.05 });
      scaleRotate(image3, { shouldReverse, delay: 0.1 });
      slide(image4, { shouldReverse, delay: 0.15 });
      break;

    case 1:
      slide(image1, { shouldReverse, delay: 0.025, extraDuration: 0.3 });
      slide(image3, { shouldReverse, delay: 0.05 });
      scaleRotate(image2, { shouldReverse, delay: 0.1 });
      scaleRotate(image4, { shouldReverse, delay: 0.1 });
      break;

    case 2:
      slide(image1, { shouldReverse, delay: 0.025, extraDuration: 0.3 });
      slide(image4, { shouldReverse, delay: 0.05 });
      scaleRotate(image3, { shouldReverse, delay: 0.1 });
      slide(image5, { shouldReverse, delay: 0.1 });
      break;
  }
};

window.addEventListener('mousemove', moveCursor);

Array.from(menuItems).forEach((item, index) => {
  const handleEvent = e => toggleAnimation(e, index);
  item.addEventListener('mouseover', handleEvent);
  item.addEventListener('mouseout', handleEvent);
});