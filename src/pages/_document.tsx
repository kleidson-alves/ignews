import Document , { Html, Head, Main, NextScript }from "../../node_modules/next/document";

export default class MyDocument extends Document{
    render() {
        return(
            <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>

                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            </Head>
            <body>
                <Main /> 
                <NextScript />
            </body>
            </Html>
        )
    }
}