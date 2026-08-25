import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface PaginationProps extends BaseProps {
  /** Current page (1-based). */
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
}

const styles = css.create({
  arrow: { paddingHorizontal: '4px' },
  page: {
    minWidth: '32px',
    height: '32px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6px',
    display: 'flex',
  },
});

/** Compact page navigation with an ellipsis window. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  xstyle,
  testID,
}: PaginationProps) {
  const tokens = useTokens();

  const pages = computePages(page, pageCount);

  return (
    <HStack gap={1} align="center" xstyle={xstyle} testID={testID}>
      <Btn
        onPress={page > 1 ? () => onPageChange?.(page - 1) : undefined}
        disabled={page <= 1}
        accessibilityLabel="Previous page"
        style={styles.arrow}
      >
        <Text color="accent">‹</Text>
      </Btn>
      {pages.map((p, i) =>
        p === '…' ? (
          <View key={`gap-${i}`}>
            <Text color="tertiary">…</Text>
          </View>
        ) : (
          <Btn
            key={p}
            onPress={() => onPageChange?.(p)}
            accessibilityLabel={`Page ${p}`}
            accessibilityState={{ selected: p === page }}
            style={[
              styles.page,
              p === page
                ? { backgroundColor: tokens['--color-accent'] as string }
                : null,
            ]}
          >
            <Text color={p === page ? 'inverse' : 'primary'} size={13}>
              {String(p)}
            </Text>
          </Btn>
        )
      )}
      <Btn
        onPress={page < pageCount ? () => onPageChange?.(page + 1) : undefined}
        disabled={page >= pageCount}
        accessibilityLabel="Next page"
        style={styles.arrow}
      >
        <Text color="accent">›</Text>
      </Btn>
    </HStack>
  );
}

function computePages(page: number, pageCount: number): Array<number | '…'> {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const set = new Set<number>([
    1,
    2,
    page - 1,
    page,
    page + 1,
    pageCount - 1,
    pageCount,
  ]);
  const sorted = [...set]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) {
      out.push('…');
    }
    out.push(p);
    prev = p;
  }
  return out;
}
