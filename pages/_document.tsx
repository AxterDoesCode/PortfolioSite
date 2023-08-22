import { Html, Head, Main, NextScript } from 'next/document'
//Head from next/document persists across all pages, if you want dynamic head then use theme.config.js
export default function Document() {
    const meta = {
        title: 'alexchau.co.uk',
        description: "Alex Chau's blog",
    }

    return (
        <Html lang="en">
            <Head>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={meta.description} />
                <meta property="og:site_name" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
