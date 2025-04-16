import Head from 'next/head';
import '../styles/globals.css'; // Import global styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { DataProvider } from '../context/contextApi';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    const isAuthRoute = [
        '/',
        '/login',
        '/forgotPassword',
        '/confirmationCodeSent',
        '/changePassword',
        '/signup',
        '/verifyEmail',
        '/registerPhone',
        '/verifyPhone',
        '/accountSettings',
        '/accountSettings2',
    ].includes(router.pathname);

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <DataProvider> 
                <Head>
                    <title>Your Watch Selling Platform</title>
                    <meta name="description" content="Find the best watches at amazing prices." />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {isAuthRoute && <Header />}
                <Component {...pageProps} />
                {isAuthRoute && <Footer />}
            </DataProvider>
        </GoogleOAuthProvider>
    );
}

export default MyApp;
