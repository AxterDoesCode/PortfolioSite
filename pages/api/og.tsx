import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { mocha as cp } from '../../public/colors/mocha'

export const config = {
    runtime: 'edge',
};

export default async function handler(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : "Alex Chau's blog";

        const fontData = await fetch(
            new URL('../../public/fonts/JetBrainsMonoNerdFont-Bold.ttf', import.meta.url),
        ).then((res) => res.arrayBuffer());
        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundSize: '1200px 630px',
                        backgroundImage: `url(https://github.com/AxterDoesCode/PortfolioSite/blob/master/public/images/bg.png?raw=true)`,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                    }}
                >
                    <h1
                        style={{
                            fontSize: "5rem",
                            fontFamily: '"JetBrainsMonoNerd"',
                            fontWeight: '700',
                            letterSpacing: '-0.025em',
                            color: cp.Text,
                            padding: '0 120px',
                            lineHeight: 1,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </h1>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'JetBrainsMonoNerd',
                        data: fontData,
                        style: 'normal',
                    },
                ],
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
