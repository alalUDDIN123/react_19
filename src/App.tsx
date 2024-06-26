import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
}

interface ContentProps {
  text: string;
}

interface GreetingProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <StyledHeader><h1>{title}</h1></StyledHeader>;
};

const Content: React.FC<ContentProps> = ({ text }) => {
  return <StyledContent>{text}</StyledContent>;
};

const Footer: React.FC = () => {
  return <StyledFooter>© 2024 My Website</StyledFooter>;
};

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <StyledGreeting>Hello, {name}!</StyledGreeting>;
};

const Image: React.FC = () => {
  return <StyledImage src="https://via.placeholder.com/150" alt="Placeholder" />;
};

const App: React.FC = () => {
  const isLoggedIn = false;
  const userName = "Alal Uddin";
  const contentText = "This is a simple example of a complex JSX element structure.";

  return (
    <StyledApp>
      <Header title="Welcome to My Website" />
      <main>
        {isLoggedIn ? <Greeting name={userName} /> : <Greeting name="Guest" />}
        <Content text={contentText} />
        <Image />
      </main>
      <Footer />
    </StyledApp>
  );
};

export default App;

// Styled Components
const StyledApp = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const StyledHeader = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
`;

const StyledContent = styled.p`
  font-size: 16px;
  color: #333;
  margin: 20px 0;
`;

const StyledFooter = styled.footer`
  background-color: #282c34;
  padding: 10px;
  color: white;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const StyledGreeting = styled.h2`
  color: #61dafb;
`;

const StyledImage = styled.img`
  margin: 20px 0;
`;
