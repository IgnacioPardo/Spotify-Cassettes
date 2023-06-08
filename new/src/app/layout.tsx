import './globals.css';
import './old_globals.css';

export const metadata = {
    title: 'Spotify Cassettes',
    description: '...',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
