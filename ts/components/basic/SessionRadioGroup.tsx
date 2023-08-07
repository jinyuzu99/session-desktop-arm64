import React, { useState } from 'react';
import useMount from 'react-use/lib/useMount';
import styled, { CSSProperties } from 'styled-components';

import { SessionRadio } from './SessionRadio';

interface Props {
  initialItem: string;
  items: Array<{ value: string; label: string }>;
  group: string;
  onClick: (selectedValue: string) => any;
  style?: CSSProperties;
}

const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;

  border: none;
  margin-inline-start: var(--margins-sm);
  margin-top: var(--margins-sm);

  & > div {
    padding: var(--margins-md) 7px;
  }
  & > div + div {
    border-top: 1px solid var(--border-color);
  }
`;

export const SessionRadioGroup = (props: Props) => {
  const { items, group, initialItem, style } = props;
  const [activeItem, setActiveItem] = useState('');

  useMount(() => {
    setActiveItem(initialItem);
  });

  return (
    <StyledFieldSet id={group} style={style}>
      {items.map(item => {
        const itemIsActive = item.value === activeItem;

        return (
          <SessionRadio
            key={item.value}
            label={item.label}
            active={itemIsActive}
            value={item.value}
            inputName={group}
            onClick={(value: string) => {
              setActiveItem(value);
              props.onClick(value);
            }}
            beforeMargins={'0 var(--margins-sm) 0 0 '}
          />
        );
      })}
    </StyledFieldSet>
  );
};
