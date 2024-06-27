import  { useContext} from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContext} from './ThemeContext';
import GlobalStyle from './GlobalStyle';
import { lightTheme, darkTheme } from './themes';

const App = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Container>
        <h1>Current Theme: {theme}</h1>
        <Button onClick={() => setTheme('light')}>Light Theme</Button>
        <Button onClick={() => setTheme('dark')}>Dark Theme</Button>
        <Button onClick={() => setTheme('system')}>System Theme</Button>
      </Container>
    </StyledThemeProvider>
  );
};


const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

export default App