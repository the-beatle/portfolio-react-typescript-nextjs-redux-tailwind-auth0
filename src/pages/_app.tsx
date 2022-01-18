import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';

import store from '../app/store'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </Provider>
    )
}