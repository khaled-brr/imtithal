import gsap from 'gsap';

export const animateNumber = (
  tweened: { number: number },
  value: number,
  duration: number = 2,
  delay: number = 0.5
) => {
  gsap.to(tweened, {
    duration,
    delay,
    number: Number(value) || 0
  });
};

export const parseValueToActialNumber = (value: number, toFixed: number = 2) =>
  parseFloat(value.toFixed(toFixed));

export const animateStatistics = (
  statisticsItems: any[],
  targetVariable: (string | number)[],
  duration: number = 500
) => {
  statisticsItems.forEach((item: any) => {
    setTimeout(() => {
      targetVariable.push(item);
    }, duration);
  });
};

export const revealAnimation = (elementClass: string = '.reveal', isInstant: boolean) => {
  const reveals: NodeListOf<Element> = document.querySelectorAll(elementClass) as HTML;

  if (isInstant) {
    for (let i = 0; i < reveals.length; i++) {
      reveals[i].classList.add('slide-up');
    }

    return;
  }

  for (let i = 0; i < reveals.length; i++) {
    const elementTop = reveals[i]?.getBoundingClientRect()?.top;
    const elementVisible = 0;

    if (elementTop < window.innerHeight - elementVisible) {
      reveals[i].classList.add('slide-up');
    }
  }
};
