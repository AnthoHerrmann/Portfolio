export const initIntersectionObserver = (
  elements: NodeListOf<Element>, 
  callback: (entry: IntersectionObserverEntry, index: number) => void,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-10% 0px',
    threshold: 0.1
  }
) => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry, index) => callback(entry, index)),
    options
  );

  elements.forEach(element => observer.observe(element));
  return observer;
};

export const addVisibleClass = (delay: number = 150) => 
  (entry: IntersectionObserverEntry, index: number) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        (entry.target as HTMLElement).classList.add('visible');
      }, index * delay);
    }
  };
