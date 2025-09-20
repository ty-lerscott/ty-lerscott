import { createGlobalStyle } from 'styled-components'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Navigation from '../components/navigation'

const GlobalStyle = createGlobalStyle`
	:root {
		--color-white: rgb(255, 255, 255);
		--color-light-blue: rgb(145, 145, 255);
		--color-gray: rgb(235, 235, 235);
		--color-black: rgb(0, 0, 0);
	}
	body {
		margin: 0;
		font-family: "Inter", sans-serif;
	}
	h1,h2,h3,h4,h5,h6 {
		font-family: "Merriweather", serif;
		margin: 0;
	}
	main {
		margin-top: 3.9rem;
	}
`

const RootLayout = () => (
  <>
	<GlobalStyle />
    <Navigation />
	<main>
    	<Outlet />
	</main>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })