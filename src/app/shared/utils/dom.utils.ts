export const scrollToElement = (elementId: string, options: ScrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'start'
}): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView(options);
  }
};

export const createDownloadLink = (url: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

export const setElementClass = (
  element: HTMLElement,
  classNames: string[],
  condition: boolean
): void => {
  classNames.forEach(className => {
    element.classList.toggle(className, condition);
  });
};
