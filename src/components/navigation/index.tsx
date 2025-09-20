import styled from 'styled-components';
import { Link } from '@tanstack/react-router'

const S = {
    Navigation: styled.div`
        display: flex;
        justify-content: center;
        gap: 1rem;
        background-color: var(--color-white);
        position: fixed;
        top: 0;
        width: 100%;
        border-bottom: 1px solid var(--color-gray);
    `,
    Link: styled(Link)`
        font-size: 1.5rem;
        font-weight: 600;
        text-decoration: none;
        padding: 1rem 0;
        color: var(--color-black);
        transition: color 250ms ease;

        &:hover {
            color: var(--color-light-blue);
        }
    `
}
const Navigation = () => {
    return (
        <S.Navigation>
            <S.Link to="/">
                Home
            </S.Link>
            <S.Link to="/writings">
                Writings
            </S.Link>
            <S.Link to="/about">
                About Me
            </S.Link>
        </S.Navigation>
    )
}

export default Navigation;