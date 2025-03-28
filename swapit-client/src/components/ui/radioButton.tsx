import React from 'react';
import styled from 'styled-components';

interface RadioProps {
    label: string;
    checked: boolean;
    onChange: () => void;
  }
  
  const Radio: React.FC<RadioProps> = ({ label, checked, onChange }) => {
    return (
      <StyledWrapper>
        <label>
          <input type="radio" checked={checked} onChange={onChange} />
          {label}
        </label>
      </StyledWrapper>
    );
  };

const StyledWrapper = styled.div`
  .container {
    --s: 1em; /* control the size */
    --g: 10px; /* the gap */
    --c: #009688; /* the active color */

    display: grid;
    grid-auto-rows: 1fr;
    gap: var(--g);
    position: relative;
  }
  .container:before {
    content: "";
    position: absolute;
    height: calc(var(--s) / 2);
    left: calc(var(--s) / 4 + var(--_x, 0px));
    top: calc(var(--s) / 4);
    background: var(--c);
    border-radius: 50%;
    aspect-ratio: 1;
    transition: 0.4s, left cubic-bezier(0.1, -2000, 0.7, -2000) 0.4s;
  }
  .container label {
    display: inline-flex;
    line-height: var(--s);
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .container input {
    height: var(--s);
    aspect-ratio: 1;
    border: calc(var(--s) / 8) solid var(--_c, #939393);
    border-radius: 50%;
    outline-offset: calc(var(--s) / 10);
    padding: calc(var(--s) / 8);
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    font-size: inherit;
    margin: 0;
    transition: 0.3s;
  }
  .container input:checked {
    --_c: var(--c);
  }
  .container:not(:has(input:checked)):before {
    --_i: -1;
    opacity: 0;
  }
  .container:has(input:checked):before {
    opacity: 1;
    transform: translateY(calc(var(--_i) * (var(--s) + var(--g))));
  }
  .container:has(label:nth-child(1) input:checked):before {
    --_i: 0;
    --_x: 0.02px;
  }
  .container:has(label:nth-child(2) input:checked):before {
    --_i: 1;
    --_x: 0.04px;
  }
  .container:has(label:nth-child(3) input:checked):before {
    --_i: 2;
    --_x: 0.06px;
  }
  .container:has(label:nth-child(4) input:checked):before {
    --_i: 3;
    --_x: 0.08px;
  }
  .container:has(label:nth-child(5) input:checked):before {
    --_i: 4;
    --_x: 0.1px;
  }
  /* and so on ..*/

  .container input:disabled {
    background: linear-gradient(#939393 0 0) 50%/100% 20% no-repeat content-box;
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media print {
    input[type="radio"] {
      -webkit-appearance: auto;
      -moz-appearance: auto;
      appearance: auto;
      background: none;
    }
  }
  @supports not selector(:has(*)) {
    .container:before {
      display: none;
    }
    .container input:checked {
      --_c: var(--c);
      background: var(--c) content-box;
    }
  }`;

export default Radio;
