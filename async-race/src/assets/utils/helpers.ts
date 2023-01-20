const $ = (selector: string, parent?: Element) => {
  return parent ? parent.querySelector(selector) : document.querySelector(selector);
};

const $All = (selector: string, parent?: Element) => {
  return parent ? parent.querySelectorAll(selector) : document.querySelectorAll(selector);
};

// const rgb2hex = () => {
//   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

export { $, $All };
