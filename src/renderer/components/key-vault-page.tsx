import React from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

export default function KeyVaultPage() {
  return (
    <Stack className="stack" horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to your Fluent UI app!!!
      </Text>
    </Stack>
  );
}
