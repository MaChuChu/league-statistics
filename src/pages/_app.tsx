// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='main-container'>

            <Component {...pageProps} />


            <footer>
                <p>© 2024 Ranjeth Ravichandran</p>
            </footer>
        </div>
    );
}
