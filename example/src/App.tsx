import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  BottomSheet,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Center,
  CheckboxInput,
  ClickableCard,
  DateInput,
  Dialog,
  Divider,
  EmptyState,
  Field,
  Heading,
  HStack,
  Icon,
  IconButton,
  Kbd,
  List,
  ListItem,
  NumberInput,
  Pagination,
  ProgressBar,
  RadioList,
  Section,
  SelectableCard,
  Selector,
  SegmentedControl,
  Skeleton,
  Slider,
  Spinner,
  StatusDot,
  Stepper,
  Switch,
  TabList,
  Table,
  TextArea,
  TextInput,
  Theme,
  Text,
  Timestamp,
  ToastProvider,
  ToggleButton,
  Typeahead,
  VStack,
  VisuallyHidden,
  defineTheme,
  neutralTheme,
  useTheme,
  useToast,
  type AstryxTheme,
} from 'react-native-astryx';

const brandTheme: AstryxTheme = defineTheme({
  name: 'brand',
  extends: neutralTheme,
  tokens: {
    '--color-accent': ['#7B61FF', '#9B85FF'],
    '--color-text-accent': ['#7B61FF', '#9B85FF'],
  },
});

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [activeTheme, setActiveTheme] = useState<'neutral' | 'brand'>('brand');

  return (
    <Theme
      theme={activeTheme === 'brand' ? brandTheme : neutralTheme}
      mode={mode}
    >
      <ToastProvider>
        <Shell
          mode={mode}
          onToggleMode={() =>
            setMode((m) => (m === 'light' ? 'dark' : 'light'))
          }
          themeName={activeTheme}
          onToggleTheme={() =>
            setActiveTheme((t) => (t === 'brand' ? 'neutral' : 'brand'))
          }
        />
      </ToastProvider>
    </Theme>
  );
}

function Shell({
  mode,
  onToggleMode,
  themeName,
  onToggleTheme,
}: {
  mode: 'light' | 'dark';
  onToggleMode: () => void;
  themeName: string;
  onToggleTheme: () => void;
}) {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.flex,
        { backgroundColor: tokens['--color-background-body'] as string },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <HStack justify="space-between" align="center">
          <Heading level={2}>Astryx Native</Heading>
          <HStack gap={1}>
            <Button
              size="sm"
              variant="secondary"
              label={themeName}
              onPress={onToggleTheme}
            />
            <Button
              size="sm"
              variant="secondary"
              label={mode === 'light' ? '☀︎ Light' : '☾ Dark'}
              onPress={onToggleMode}
            />
          </HStack>
        </HStack>
        <Divider />
        <Showcase />
      </ScrollView>
    </View>
  );
}

function Showcase() {
  return (
    <VStack gap={8} padding={4}>
      <Section title="Action">
        <VStack gap={3}>
          <HStack gap={2}>
            <Button label="Primary" onPress={() => {}} />
            <Button label="Secondary" variant="secondary" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Destructive" variant="destructive" />
          </HStack>
          <HStack gap={2}>
            <Button label="Small" size="sm" />
            <Button label="Medium" size="md" />
            <Button label="Large" size="lg" />
            <Button label="Loading" loading={true} />
            <Button label="Disabled" disabled={true} />
          </HStack>
          <HStack gap={2} align="center">
            <IconButton
              icon="＋"
              accessibilityLabel="Add"
              variant="secondary"
            />
            <IconButton icon="⌕" accessibilityLabel="Search" />
            <ToggleButton label="Pin" selected={false} />
            <ButtonGroup>
              <Button label="Day" variant="secondary" />
              <Button label="Week" variant="secondary" />
              <Button label="Month" variant="secondary" />
            </ButtonGroup>
          </HStack>
        </VStack>
      </Section>

      <Section title="Layout & containers">
        <VStack gap={3}>
          <Card padding={4}>
            <VStack gap={2}>
              <Heading level={4}>Card</Heading>
              <Text color="secondary">
                Cards are for widgets and settings groups — not dense data.
              </Text>
            </VStack>
          </Card>
          <HStack gap={2}>
            <ClickableCard onPress={() => {}}>
              <Text>ClickableCard</Text>
            </ClickableCard>
            <SelectableCard selected={true} onPress={() => {}}>
              <Text>Selected</Text>
            </SelectableCard>
          </HStack>
          <AspectRatio ratio={16 / 9}>
            <Center grow={true}>
              <Card padding={3}>
                <Text color="secondary">AspectRatio + Center</Text>
              </Card>
            </Center>
          </AspectRatio>
        </VStack>
      </Section>

      <Section title="Feedback & status">
        <VStack gap={3}>
          <Banner
            status="success"
            title="Sync complete"
            description="All changes saved to the cloud."
            badge="New"
            actionLabel="Undo"
            onActionPress={() => {}}
          />
          <Banner
            status="critical"
            title="Payment failed"
            description="Update your billing details."
          />
          <HStack gap={3} align="center">
            <Spinner />
            <ProgressBar value={0.7} />
            <StatusDot color="success" />
            <Badge label="12" color="accent" filled={true} />
            <Badge label="beta" />
          </HStack>
          <HStack gap={2} align="center">
            <Skeleton shape="circle" size={40} />
            <Skeleton shape="text" width={180} />
            <Skeleton shape="rect" width={80} height={48} />
          </HStack>
          <EmptyState
            glyph="◌"
            title="Nothing here yet"
            description="Items you create will show up in this list."
            actionLabel="Create item"
            onActionPress={() => {}}
          />
        </VStack>
      </Section>

      <Section title="Data input">
        <FormDemo />
      </Section>

      <Section title="Navigation">
        <NavDemo />
      </Section>

      <Section title="Overlays">
        <OverlayDemo />
      </Section>

      <Section title="Theming primitives">
        <VStack gap={2}>
          <HStack gap={2} align="center">
            <Icon name="star" color="accent" />
            <Icon name="heart" color="critical" />
            <Icon name="settings" size="lg" />
            <Kbd>⌘K</Kbd>
            <Timestamp date={Date.now()} />
            <VisuallyHidden>
              <Text>Hidden from sight, visible to screen readers.</Text>
            </VisuallyHidden>
          </HStack>
          <AvatarGroup
            avatars={[
              { initials: 'SA' },
              { initials: 'MX' },
              { initials: 'RN' },
              { initials: 'FB' },
              { initials: '+7' },
            ]}
          />
        </VStack>
      </Section>
    </VStack>
  );
}

function FormDemo() {
  const [text, setText] = useState('');
  const [bio, setBio] = useState('');
  const [num, setNum] = useState<number | null>(42);
  const [sw, setSw] = useState(true);
  const [cb, setCb] = useState(false);
  const [radio, setRadio] = useState<string | null>('a');
  const [slider, setSlider] = useState(0.6);
  const [seg, setSeg] = useState('daily');
  const [sel, setSel] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [picked, setPicked] = useState<{ label: string; value: string } | null>(
    null
  );
  const toast = useToast();

  return (
    <VStack gap={4}>
      <Field label="Email" status="We'll never share it.">
        <TextInput
          value={text}
          onChange={setText}
          placeholder="you@example.com"
        />
      </Field>
      <Field label="Bio">
        <TextArea
          value={bio}
          onChange={setBio}
          minRows={3}
          placeholder="Tell us about yourself…"
        />
      </Field>
      <HStack gap={3}>
        <NumberInput value={num} onChange={setNum} min={0} max={100} />
        <Selector
          label="Frequency"
          options={[
            { label: 'Hourly', value: 'hourly' },
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
          ]}
          value={sel}
          onChange={setSel}
        />
      </HStack>
      <Typeahead
        options={[
          { label: 'React Native', value: 'rn' },
          { label: 'React', value: 'r' },
          { label: 'StyleX', value: 'sx' },
        ]}
        onChange={setPicked}
        placeholder="Search frameworks…"
      />
      {picked != null ? (
        <Text color="secondary">Picked: {picked.label}</Text>
      ) : null}
      <DateInput value={date} onChange={setDate} label="Start date" />
      <Calendar value={date} onChange={setDate} />
      <HStack gap={4}>
        <Switch checked={sw} onCheckedChange={setSw} />
        <CheckboxInput label="Subscribe" checked={cb} onCheckedChange={setCb} />
      </HStack>
      <RadioList
        items={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
          { label: 'Option C (disabled)', value: 'c', disabled: true },
        ]}
        value={radio}
        onChange={setRadio}
      />
      <Slider value={slider} onChange={setSlider} />
      <SegmentedControl
        items={[
          { label: 'Daily', value: 'daily' },
          { label: 'Weekly', value: 'weekly' },
          { label: 'Monthly', value: 'monthly' },
        ]}
        value={seg}
        onChange={setSeg}
      />
      <Button
        label="Submit"
        block={true}
        onPress={() => toast.showToast({ message: 'Form submitted ✓' })}
      />
    </VStack>
  );
}

const people = [
  { name: 'Ada Lovelace', role: 'Engineer', status: 'online' },
  { name: 'Grace Hopper', role: 'Admiral', status: 'away' },
  { name: 'Katherine Johnson', role: 'Mathematician', status: 'offline' },
];

function NavDemo() {
  const [tab, setTab] = useState('feed');
  const [step, setStep] = useState(1);
  const [page, setPage] = useState(3);

  return (
    <VStack gap={4}>
      <Breadcrumbs
        items={[
          { label: 'Home', onPress: () => {} },
          { label: 'Team', onPress: () => {} },
          { label: 'People' },
        ]}
      />
      <TabList
        items={[
          { label: 'Feed', value: 'feed' },
          { label: 'Mentions', value: 'mentions' },
          { label: 'Saved', value: 'saved' },
        ]}
        value={tab}
        onChange={setTab}
      />
      <List>
        {people.map((p) => (
          <ListItem
            key={p.name}
            label={p.name}
            description={p.role}
            leading={
              <Avatar
                initials={p.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              />
            }
            trailing={
              <StatusDot
                color={
                  p.status === 'online'
                    ? 'success'
                    : p.status === 'away'
                      ? 'warning'
                      : 'neutral'
                }
              />
            }
            onPress={() => {}}
          />
        ))}
      </List>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status', width: 90 },
        ]}
        rows={people}
        getRowKey={(row) => row.name}
      />
      <Stepper
        steps={[
          { label: 'Account' },
          { label: 'Profile' },
          { label: 'Confirm' },
        ]}
        current={step}
      />
      <HStack gap={2}>
        <Button
          label="Back"
          variant="secondary"
          size="sm"
          onPress={() => setStep(Math.max(0, step - 1))}
        />
        <Button
          label="Next"
          size="sm"
          onPress={() => setStep(Math.min(2, step + 1))}
        />
      </HStack>
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
    </VStack>
  );
}

function OverlayDemo() {
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);

  return (
    <VStack gap={3}>
      <HStack gap={2}>
        <Button
          label="Open dialog"
          variant="secondary"
          onPress={() => setDialog(true)}
        />
        <Button
          label="Open sheet"
          variant="secondary"
          onPress={() => setSheet(true)}
        />
      </HStack>
      <Dialog
        visible={dialog}
        onDismiss={() => setDialog(false)}
        title="Delete project?"
        footer={
          <>
            <Button
              label="Cancel"
              variant="ghost"
              onPress={() => setDialog(false)}
            />
            <Button
              label="Delete"
              variant="destructive"
              onPress={() => setDialog(false)}
            />
          </>
        }
      >
        <Text color="secondary">
          This action cannot be undone. All tasks and files in this project will
          be permanently removed.
        </Text>
      </Dialog>
      <BottomSheet
        visible={sheet}
        onDismiss={() => setSheet(false)}
        title="Filter"
        heightFraction={0.45}
      >
        <VStack gap={3}>
          <Text color="secondary">
            Sheets are great for pickers and filters.
          </Text>
          <Button label="Done" block={true} onPress={() => setSheet(false)} />
        </VStack>
      </BottomSheet>
    </VStack>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: 96 },
});
