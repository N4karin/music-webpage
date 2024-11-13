// SlideUpTransition.tsx
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles/SlideUpTransition.css'; // Import the CSS for transitions

interface SlideUpTransitionProps {
  in: boolean;
  timeout: number;
  children: React.ReactNode;
}

const SlideUpTransition: React.FC<SlideUpTransitionProps> = ({ in: inProp, timeout, children }) => {
  return (
    <CSSTransition
      in={inProp}
      timeout={timeout}
      classNames="slide"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
};

export default SlideUpTransition;
