import Head from 'next/head';

const Contact = () => {
    return (
        <>
            <Head>
                <title>Contact Us - Your Watch Selling Platform</title>
                <meta name="description" content="Get in touch with us for inquiries about watches." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='hero-container'>
                <h1>Contact Us</h1>
                <p>Contact information and form.</p>
                {/* Other content */}
            </div>

        </>
    );
};

export default Contact;