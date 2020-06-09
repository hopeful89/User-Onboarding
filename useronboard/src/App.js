import React from 'react';
import './App.css';
import styled from 'styled-components'
import axios from 'axios'
import Form from './Components/Form'

const MainContainer = styled.div`
display: flex;
background: grey;
height: 100vh;
width: 100vw;
`;

function App() {
  return (
    <MainContainer>
      <Form />
    </MainContainer>
  );
}

export default App;
