import React from 'react';
import styled from 'styled-components';

const ResetButton = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 20 20" height={20} fill="none" className="svg-icon">
          <g strokeWidth="1.5" strokeLinecap="round" stroke="#ff342b">
            <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468" />
            <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986" />
          </g>
        </svg>
        <span className="lable">Reset</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    gap: 8px;
    height: 30px;
    width: 108px;
    border: none;
    background: #ff362b34;
    border-radius: 20px;
    cursor: pointer;
  }

  .lable {
    line-height: 20px;
    font-size: 14px;
    color: #ff342b;
    letter-spacing: 1px;
  }

  .button:hover {
    background: #ff362b52;
  }

  .button:hover .svg-icon {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }`;

export default ResetButton;
