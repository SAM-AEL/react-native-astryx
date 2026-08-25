import { useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { EmptyState } from '../EmptyState';
import { useTokens } from '../theme';
import { Btn, Input, View } from '../internal/elements';

export interface PowerSearchProps<T> extends BaseProps {
  visible: boolean;
  onDismiss: () => void;
  placeholder?: string;
  /** Full result pool; filtered client-side by label match. */
  results: readonly T[];
  /** Extract the searchable text of a result. */
  searchText: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onResultPress?: (item: T) => void;
}

const styles = css.create({
  root: { flex: 1 },
  inputWrap: {
    padding: '12px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    display: 'flex',
  },
});

/**
 * A full-screen search surface. Provide your data; filtering is
 * client-side substring matching over `searchText`.
 */
export function PowerSearch<T>({
  visible,
  onDismiss,
  placeholder = 'Search…',
  results,
  searchText,
  renderItem,
  onResultPress,
  xstyle,
  testID,
}: PowerSearchProps<T>) {
  const tokens = useTokens();
  const [query, setQuery] = useState('');

  const matches = query.trim()
    ? results.filter((r) =>
        searchText(r).toLowerCase().includes(query.trim().toLowerCase())
      )
    : results;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View
        xstyle={[
          styles.root,
          { backgroundColor: tokens['--color-background-body'] as string },
          xstyle,
        ]}
      >
        <View
          style={[
            styles.inputWrap,
            { borderBottomColor: tokens['--color-border'] as string },
          ]}
        >
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
              backgroundColor: tokens['--color-background-surface'] as string,
              borderColor: tokens['--color-border'] as string,
              color: tokens['--color-text-primary'] as string,
            }}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingVertical: 8 }}>
            {matches.map((item, i) => (
              <Btn key={i} onPress={() => onResultPress?.(item)}>
                {renderItem(item)}
              </Btn>
            ))}
            {matches.length === 0 ? (
              <EmptyState
                title="No results"
                description={`Nothing matches “${query}”.`}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
