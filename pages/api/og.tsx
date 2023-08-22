import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { mocha as cp} from '../../public/colors/mocha'

export const config = {
    runtime: 'edge',
};

export default function handler(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : "Alex Chau's blog";

        return new ImageResponse(
            (
                <div
                    style={{
                        backgroundColor: cp.Base,
                        backgroundSize: '150px 150px',
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            justifyItems: 'center',
                        }}
                    >
                        <img
                            alt="Axtr Profile Image"
                            height={232}
                            src="https://github.com/AxterDoesCode.png"
                            style={{ 
                                margin: '0 30px',
                                borderRadius: "50%"
                            }}
                            width={232}
                        />
                    </div>
                    <div
                        style={{
                            fontSize: 60,
                            fontStyle: 'normal',
                            letterSpacing: '-0.025em',
                            color: cp.Text,
                            marginTop: 30,
                            padding: '0 120px',
                            lineHeight: 1.4,
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {title}
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
