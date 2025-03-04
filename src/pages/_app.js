import Head from "next/head";
import "../styles/globals.css"; // Import global styles
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Poppins } from "next/font/google";

// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // Create a CSS variable for Tailwind
});
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isAuthRoute = [
    "/",
    "/login",
    "/forgotPassword",
    "/confirmationCodeSent",
    "/changePassword",
    "/signup",
    "/verifyEmail",
    "/registerPhone",
    "/verifyPhone",
    "/accountSettings",
    "/accountSettings2",
  ].includes(router.pathname);
  return (
    <>
      <Head>
        <title>Your Watch Selling Platform</title>
        <meta
          name="description"
          content="Find the best watches at amazing prices."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthRoute && <Header />}
      <Component {...pageProps} />
      {isAuthRoute && <Footer />}
    </>
  );
}

export default MyApp;
