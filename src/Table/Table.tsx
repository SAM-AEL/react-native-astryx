import { ScrollView } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface TableColumn<Row> {
  key: string;
  label: string;
  /** Column width in dp; defaults to flexible. */
  width?: number;
  align?: 'start' | 'end';
  /** Custom cell renderer; defaults to string rendering. */
  render?: (row: Row) => React.ReactNode;
}

export interface TableProps<Row> extends BaseProps {
  columns: ReadonlyArray<TableColumn<Row>>;
  rows: readonly Row[];
  /** Stable identity per row. */
  getRowKey: (row: Row) => string;
  onRowPress?: (row: Row) => void;
}

const styles = css.create({
  wrap: { display: 'flex' },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    paddingVertical: '8px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    paddingVertical: '10px',
  },
});

/**
 * A dense, scrollable data table. Rows render edge-to-edge with
 * dividers per upstream layout rules.
 */
export function Table<Row>({
  columns,
  rows,
  getRowKey,
  onRowPress,
  xstyle,
  testID,
}: TableProps<Row>) {
  const tokens = useTokens();
  const borderColor = tokens['--color-border'] as string;

  return (
    <View style={[styles.wrap, xstyle]} testID={testID}>
      <ScrollView horizontal={true}>
        <View>
          <View style={[styles.headerRow, { borderBottomColor: borderColor }]}>
            {columns.map((col) => (
              <View key={col.key} style={cellStyle(col)}>
                <Text size={12} weight="semibold" color="secondary">
                  {col.label}
                </Text>
              </View>
            ))}
          </View>
          {rows.map((row) => {
            const key = getRowKey(row);
            const body = (
              <>
                {columns.map((col) => (
                  <View key={col.key} style={cellStyle(col)}>
                    {col.render != null ? (
                      col.render(row)
                    ) : (
                      <Text size={13}>
                        {String(
                          (row as Record<string, unknown>)[col.key] ?? ''
                        )}
                      </Text>
                    )}
                  </View>
                ))}
              </>
            );
            return onRowPress != null ? (
              <Btn
                key={key}
                onPress={() => onRowPress(row)}
                style={[styles.row, { borderBottomColor: borderColor }]}
              >
                {body}
              </Btn>
            ) : (
              <View
                key={key}
                style={[styles.row, { borderBottomColor: borderColor }]}
              >
                {body}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function cellStyle<Row>(
  col: TableColumn<Row>
): Record<string, string | number | undefined> {
  return {
    width: col.width == null ? undefined : `${col.width}px`,
    flexGrow: col.width == null ? 1 : 0,
    paddingHorizontal: '12px',
    display: 'flex',
    justifyContent: col.align === 'end' ? 'flex-end' : 'flex-start',
    alignItems: col.align === 'end' ? 'flex-end' : 'flex-start',
  };
}
