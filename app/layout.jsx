import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-blog/style.css';

export const metadata = {
  metadataBase: new URL('https://alexchau.co.uk'),
  title: {
    default: 'alexchau.co.uk',
    template: '%s — alexchau.co.uk',
  },
  description: "Alex Chau's blog",
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'alexchau.co.uk',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Layout>
          <Navbar pageMap={await getPageMap()}>
            <ThemeSwitch />
          </Navbar>

          {children}

          <Footer>
            © {new Date().getFullYear()} Alex Chau
            <span style={{ float: 'right', display: 'inline-flex', gap: '.75rem' }}>
              <a href="https://twitter.com/AxterDoesCode" target="_blank" rel="noopener">
                Twitter
              </a>
              <a href="https://www.linkedin.com/in/alex-chau-dev/" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a href="https://github.com/AxterDoesCode" target="_blank" rel="noopener">
                GitHub
              </a>
              <a href="/feed.xml">RSS</a>
            </span>
          </Footer>
        </Layout>
      </body>
    </html>
  );
}
