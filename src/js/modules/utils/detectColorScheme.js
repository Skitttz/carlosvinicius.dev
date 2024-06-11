export default function detectColorScheme() {
  let theme = 'light';

  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme = storedTheme;
  } else {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      theme = 'dark';
    }
    localStorage.setItem('theme', theme);
  }

  document.documentElement.setAttribute('data-theme', theme);
}
