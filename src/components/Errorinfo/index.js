import React, { Component } from 'react';
import {ErrorContainer,ErrorTitle,Container} from './style';

const ErrorInfo = (props) => {
  const { message,sucess } = props;
  
  return (
    <Container sucess={sucess}>
      <ErrorContainer>
        <ErrorTitle
          allowFontScaling={true}
        >
          {message}
        </ErrorTitle>
      </ErrorContainer>
  </Container>
);
};

export default ErrorInfo;
