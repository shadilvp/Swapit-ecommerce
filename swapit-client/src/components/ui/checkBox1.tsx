import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: () => void;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
      <StyledWrapper>
        <label className="container">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <div className="line" />
          <div className="line line-indicator" />
        </label>
        {label && <span className="checkbox-label">{label}</span>}
      </StyledWrapper>
    );
  };

const StyledWrapper = styled.div`
  /* Hide the default checkbox */
  .container input {
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }

  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 20px;
    user-select: none;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    background: rgba(216, 216, 216, 0.603);
  }

  .container:hover {
    background: rgba(197, 197, 197, 0.527);
  }

  .line {
    width: calc(100% - 8px);
    height: 3px;
    left: 4px;
    background: rgb(58, 58, 58);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: .7s transform cubic-bezier(0,1,.33,1.2), background .4s;
  }

  .line-indicator {
    transform: translateY(-50%) rotate(90deg);
  }

  .container input:checked ~ .line-indicator {
    transform: translateY(-50%);
  }`;

export default Checkbox;
