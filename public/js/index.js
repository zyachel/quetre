////////////////////////////////////////////////////////
//                      CONSTANTS
////////////////////////////////////////////////////////
const headerEl = document.querySelector('.header');
const [metaThemeEl, tempMetaThemeEl] = document.querySelectorAll('meta[name="theme-color"]');
const btnTheme = document.querySelector('.theme-changer');

////////////////////////////////////////////////////////
//                   HELPER FUNCTIONS
////////////////////////////////////////////////////////
const setMetaTheme = () => {
  const headerColor = window.getComputedStyle(headerEl).backgroundColor;
  metaThemeEl.setAttribute('content', headerColor);
};

////////////////////////////////////////////////////////
//                  EVENT LISTENER
////////////////////////////////////////////////////////
btnTheme.addEventListener('click', () => {
  const curTheme = document.documentElement.getAttribute('theme') ?? 'light';
  const themeToSet = curTheme === 'light' ? 'dark' : 'light';
  setTheme(themeToSet);
  if (isLocalStorageAccessible()) localStorage.setItem('theme', themeToSet);
  setMetaTheme();
});

////////////////////////////////////////////////////////
//                   INIT FUNCTION
////////////////////////////////////////////////////////
(() => {
  // setting this attr on root to not render some css styles
  document.documentElement.setAttribute('js-enabled', '');
  // removing duplicate meta theme color(it's initially for those who haven't enabled js)
  metaThemeEl.removeAttribute('media');
  tempMetaThemeEl.remove();
  setMetaTheme();
})();

////////////////////////////////////////////////////////
//                   MATHJAX CONFIG
////////////////////////////////////////////////////////
window.MathJax = { options: { enableMenu: false } };
