/**
 * react-native-astryx — a React Native port of the Astryx design
 * system (github.com/facebook/astryx), spec-synced to
 * @astryxdesign/core.
 *
 * Components are also available via per-component subpath imports,
 * e.g. `react-native-astryx/Button`, matching upstream's export map.
 */

// Theme
export {
  Theme,
  defineTheme,
  neutralTheme,
  resolveThemeTokens,
  useTheme,
  useOptionalTheme,
  useTokens,
  type AstryxTheme,
  type ThemeConfig,
  type ThemeProps,
  type ColorMode,
  type ModeSetting,
  type ColorSchemeValue,
  type TokenMap,
} from './theme';

// Shared prop types
export type { BaseProps } from './BaseProps';

// Layout
export { VStack, type VStackProps } from './VStack';
export { HStack, type HStackProps } from './HStack';
export { Stack, type StackProps } from './Stack';
export { Center, type CenterProps } from './Center';
export { Divider, type DividerProps } from './Divider';
export { Section, type SectionProps } from './Section';
export { AspectRatio, type AspectRatioProps } from './AspectRatio';

// Content
export { Text, type TextProps, type TextColor } from './Text';
export { Heading, type HeadingProps, type HeadingLevel } from './Heading';
export {
  Icon,
  GLYPHS,
  type IconName,
  type IconProps,
  type IconSize,
} from './Icon';
export { Avatar, type AvatarProps } from './Avatar';
export { AvatarGroup, type AvatarGroupProps } from './AvatarGroup';
export { Kbd, type KbdProps } from './Kbd';
export { Timestamp, type TimestampProps } from './Timestamp';

// Containers
export { Card, type CardProps } from './Card';
export { ClickableCard, type ClickableCardProps } from './ClickableCard';
export { SelectableCard, type SelectableCardProps } from './SelectableCard';

// Action
export {
  Button,
  type ButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './Button';
export { IconButton, type IconButtonProps } from './IconButton';
export { ToggleButton, type ToggleButtonProps } from './ToggleButton';
export { ButtonGroup, type ButtonGroupProps } from './ButtonGroup';
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedControlItem,
} from './SegmentedControl';

// Data input
export { TextInput, type TextInputProps } from './TextInput';
export { TextArea, type TextAreaProps } from './TextArea';
export { NumberInput, type NumberInputProps } from './NumberInput';
export { Switch, type SwitchProps } from './Switch';
export { CheckboxInput, type CheckboxInputProps } from './CheckboxInput';
export {
  RadioList,
  type RadioListProps,
  type RadioListItem,
} from './RadioList';
export { Slider, type SliderProps } from './Slider';
export {
  Field,
  FieldLabel,
  FieldStatus,
  type FieldProps,
  type FieldLabelProps,
  type FieldStatusProps,
} from './Field';
export { Selector, type SelectorProps, type SelectorOption } from './Selector';
export {
  Typeahead,
  type TypeaheadItem,
  type TypeaheadProps,
} from './Typeahead';
export { Calendar, type CalendarProps } from './Calendar';
export { DateInput, type DateInputProps } from './DateInput';

// Feedback & status
export { Badge, type BadgeProps, type BadgeColor } from './Badge';
export { Banner, type BannerProps } from './Banner';
export { StatusDot, type StatusDotProps, type StatusColor } from './StatusDot';
export { Spinner, type SpinnerProps } from './Spinner';
export {
  ProgressBar,
  type ProgressBarProps,
  type ProgressColor,
} from './ProgressBar';
export { Skeleton, type SkeletonProps, type SkeletonShape } from './Skeleton';
export { EmptyState, type EmptyStateProps } from './EmptyState';
export {
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastHandle,
} from './Toast';

// Overlays
export { Dialog, type DialogProps } from './Dialog';
export { BottomSheet, type BottomSheetProps } from './BottomSheet';

// Navigation
export { TabList, type TabListProps, type TabItem } from './TabList';
export { List, ListItem, type ListProps, type ListItemProps } from './List';
export {
  Breadcrumbs,
  type BreadcrumbsProps,
  type CrumbItem,
} from './Breadcrumbs';
export { Stepper, type StepperProps, type StepItem } from './Stepper';
export { Pagination, type PaginationProps } from './Pagination';

// Data display
export { Table, type TableProps, type TableColumn } from './Table';

// Utilities
export { VisuallyHidden, type VisuallyHiddenProps } from './VisuallyHidden';
