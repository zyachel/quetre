////////////////////////////////////////////////////////
//                      CONSTANTS
////////////////////////////////////////////////////////
const rootEl = document.documentElement;
const btnTheme = document.querySelector('.theme-changer');

////////////////////////////////////////////////////////
//                   HELPER FUNCTIONS
////////////////////////////////////////////////////////
// gets theme prefered by browser
const browserPrefersDarkTheme = window.matchMedia(
  'prefers-color-scheme: dark'
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
  setTheme(themeToSet);

  // only setting the value in localStoage if it's actually accessible
  if (localStorageAccessible) localStorage.setItem('theme', themeToSet);
});

////////////////////////////////////////////////////////
//                   INIT FUNCTION
////////////////////////////////////////////////////////
(() => {
  // setting this attr on root to not render some css styles
  rootEl.setAttribute('js-enabled', '');
  // applying theme preferences in case they exist
  if (browserPrefersDarkTheme) setTheme('dark');
  else if (userPrefersTheme) setTheme(userPrefersTheme);
})();
