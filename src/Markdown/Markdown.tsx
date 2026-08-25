import type { BaseProps } from '../BaseProps';
import { Heading } from '../Heading';
import { View } from '../internal/elements';
import { Text } from '../Text';
import { VStack } from '../VStack';

export interface MarkdownProps extends BaseProps {
  /** Markdown source. Supports #/##/### headings, - lists, blank-line paragraphs, and **bold** spans. */
  children: string;
}

/**
 * A pragmatic native markdown renderer covering the common subset:
 * ATX headings (1–3), `-` bullet lists, paragraphs, `**bold**` and
 * `` `code` `` inline spans. For full CommonMark use a dedicated
 * renderer.
 */
export function Markdown({ children, xstyle, testID }: MarkdownProps) {
  const blocks = children
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <VStack gap={2} xstyle={xstyle} testID={testID}>
      {blocks.map((block, i) => {
        if (block.startsWith('### ')) {
          return (
            <Heading key={i} level={4}>
              {inline(block.slice(4))}
            </Heading>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <Heading key={i} level={3}>
              {inline(block.slice(3))}
            </Heading>
          );
        }
        if (block.startsWith('# ')) {
          return (
            <Heading key={i} level={2}>
              {inline(block.slice(2))}
            </Heading>
          );
        }
        if (block.split('\n').every((l) => l.trimStart().startsWith('- '))) {
          return (
            <VStack key={i} gap={1}>
              {block.split('\n').map((line, j) => (
                <HStackRow key={j} line={line} />
              ))}
            </VStack>
          );
        }
        return (
          <Text key={i} color="secondary">
            {inline(block)}
          </Text>
        );
      })}
    </VStack>
  );
}

function HStackRow({ line }: { line: string }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
      <Text color="tertiary">•</Text>
      <Text color="secondary">{inline(line.trimStart().slice(2))}</Text>
    </View>
  );
}

/** Render **bold** and `code` spans as a mixed text tree. */
function inline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <Text key={i} weight="semibold">
          {inner}
        </Text>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <Text key={i} mono={true} size={13}>
          {inner}
        </Text>
      );
    }
    return <Text key={i}>{part}</Text>;
  });
}
