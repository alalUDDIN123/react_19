import React from 'react';
import styled from 'styled-components';

// Define the props type
type GreetingProps = {
  name: string;
};

// Styled components
const GreetingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GreetingText = styled.h1`
  color: #4a90e2;
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
`;

// Greeting component
const Greeting: React.FC<GreetingProps> = (props) => {
  return (
    <GreetingWrapper>
      <GreetingText>Hello, {props.name}!</GreetingText>
    </GreetingWrapper>
  );
};

// App component
const AppWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const App = () => {
  return (
    <AppWrapper>
      <Greeting name="Alal Uddin" />
    </AppWrapper>
  );
};

export default App;
