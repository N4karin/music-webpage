import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
    border: 8px solid #1f2937; /* Light grey */
    border-top: 8px solid #FFA07A; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spin} 1s linear infinite;
`;

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader />
        </div>
    );
};

export default Spinner;
