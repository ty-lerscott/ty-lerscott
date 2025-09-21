import styled from 'styled-components';
import { createFileRoute } from '@tanstack/react-router'

const S = {
	Container: styled.div`
		max-width: 65vw;
		margin: 0 auto;
		padding-top: 4rem;
		text-align: center;
	`,
}

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<S.Container>
			<h1>
				Exploring life through metaphor, meaning and creation — one thought at a time.
			</h1>
		</S.Container>
	)
}