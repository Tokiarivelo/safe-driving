import Script from 'next/script';

export default function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Only run on client side
              if (typeof window === 'undefined') return;
              
              var theme = localStorage.getItem('safe-drive-theme');
              
              // If no stored theme, check system preference
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              
              // Apply theme to document
              if (theme) {
                document.documentElement.classList.add(theme);
                document.documentElement.style.colorScheme = theme;
              }
            } catch (e) {
              // Fail silently
            }
          })();
        `,
      }}
    />
  );
}
