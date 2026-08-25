import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';

import { useTokens } from '../theme';
import { Btn, Input, View } from '../internal/elements';

export interface TypeaheadItem {
  label: string;
  value: string;
}

export interface TypeaheadProps extends BaseProps {
  /** Full option pool; filtering is done by the component. */
  options: readonly TypeaheadItem[];
  /** Called with the chosen option. */
  onChange?: (item: TypeaheadItem) => void;
  placeholder?: string;
  /** Minimum characters before suggestions appear. */
  minChars?: number;
}

const styles = css.create({
  root: { display: 'flex' },
  menu: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    marginTop: '4px',
    overflow: 'hidden',
    display: 'flex',
  },
  option: {
    paddingVertical: '10px',
    paddingHorizontal: '12px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    display: 'flex',
  },
});

/**
 * A simple autocomplete over a local option pool. For server-backed
 * search, manage `options` yourself and debounce upstream.
 */
export function Typeahead({
  options,
  onChange,
  placeholder,
  minChars = 1,
  xstyle,
  testID,
}: TypeaheadProps) {
  const tokens = useTokens();
  const [query, setQuery] = useState('');

  const matches =
    query.length >= minChars
      ? options
          .filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 6)
      : [];

  return (
    <View style={[styles.root, xstyle]} testID={testID}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.nativeEvent.text ?? '')}
        placeholder={placeholder}
        style={{
          borderRadius: '8px',
          borderWidth: '1px',
          borderStyle: 'solid',
          paddingHorizontal: '12px',
          paddingVertical: '10px',
          fontSize: '15px',
          backgroundColor: tokens['--color-background-body'] as string,
          borderColor: tokens['--color-border'] as string,
          color: tokens['--color-text-primary'] as string,
        }}
      />
      {matches.length > 0 ? (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: tokens['--color-background-body'] as string,
              borderColor: tokens['--color-border'] as string,
            },
          ]}
        >
          {matches.map((option, i) => (
            <Btn
              key={option.value}
              onPress={() => {
                onChange?.(option);
                setQuery(option.label);
              }}
              style={[
                styles.option,
                {
                  borderBottomColor:
                    i === matches.length - 1
                      ? 'transparent'
                      : (tokens['--color-border'] as string),
                },
              ]}
            >
              <Text size={14}>{option.label}</Text>
            </Btn>
          ))}
        </View>
      ) : null}
    </View>
  );
}
