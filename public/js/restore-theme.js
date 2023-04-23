////////////////////////////////////////////////////////
//                   HELPER FUNCTIONS
////////////////////////////////////////////////////////
const isLocalStorageAccessible = () => {
  try {
    window.localStorage.getItem('test');
    return true;
  } catch {
    return false;
  }
};
const setTheme = theme => document.documentElement.setAttribute('theme', theme);

const userPrefersTheme = isLocalStorageAccessible() ? localStorage.getItem('theme') : null;
const browserPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

////////////////////////////////////////////////////////
//                   INIT FUNCTION
////////////////////////////////////////////////////////
(() => {
  // applying theme preferences in case they exist
  if (userPrefersTheme) setTheme(userPrefersTheme);
  else if (browserPrefersDarkTheme) setTheme('dark');
})();
