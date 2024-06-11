export default function detectColorScheme() {
  const storedTheme = localStorage.getItem('theme');
  if (!storedTheme) {
    const theme =
      window.matchMedia &&
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
