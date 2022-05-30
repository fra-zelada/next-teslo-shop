import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr';
import { AuthProvider, CartProvider, UiProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
    <SWRConfig 
      value={{
        // refreshInterval: 500,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <AuthProvider>

      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={ lightTheme }>
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
      </AuthProvider>
      </SWRConfig>

    </SessionProvider>



  )

}

export default MyApp
