////////////////////////////////////////////////////////
//                      CONSTANTS
////////////////////////////////////////////////////////
const rootEl = document.documentElement;
const headerEl = document.querySelector('.header');
const [metaThemeEl, tempMetaThemeEl] = document.querySelectorAll(
  'meta[name="theme-color"]'
);
const btnTheme = document.querySelector('.theme-changer');

////////////////////////////////////////////////////////
//                   HELPER FUNCTIONS
////////////////////////////////////////////////////////
// gets theme prefered by browser
const browserPrefersDarkTheme = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;
// gets theme prefered by user(stored in local storage)
const userPrefersTheme = localStorage?.getItem('theme');
// sets theme to local storage
const setTheme = theme => rootEl.setAttribute('theme', theme);
const localStorageAccessible = !!typeof Storage;

////////////////////////////////////////////////////////
//                  EVENT LISTENER
////////////////////////////////////////////////////////
btnTheme.addEventListener('click', () => {
  const curTheme = rootEl.getAttribute('theme') || 'light';
  const themeToSet = curTheme === 'light' ? 'dark' : 'light';
  const colorToAdd = window.getComputedStyle(headerEl).backgroundColor;
  setTheme(themeToSet);
  // changes the meta theme-color tag to match the header color
  metaThemeEl.setAttribute('content', colorToAdd);
  // only setting the value in localStoage if it's actually accessible
  if (localStorageAccessible) localStorage.setItem('theme', themeToSet);
});

////////////////////////////////////////////////////////
//                   INIT FUNCTION
////////////////////////////////////////////////////////
(() => {
  // setting this attr on root to not render some css styles
  rootEl.setAttribute('js-enabled', '');
  // removing duplicate meta theme color(it's initially for those who haven't enabled js)
  metaThemeEl.removeAttribute('media');
  tempMetaThemeEl.remove();
  // applying theme preferences in case they exist
  if (userPrefersTheme) setTheme(userPrefersTheme);
  else if (browserPrefersDarkTheme) setTheme('dark');
})();

////////////////////////////////////////////////////////
//                   MATHJAX CONFIG
////////////////////////////////////////////////////////
window.MathJax = { options: { enableMenu: false } };
