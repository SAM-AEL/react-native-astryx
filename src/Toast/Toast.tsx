import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { css } from 'react-strict-dom';
import { Text, type TextColor } from '../Text';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface ToastOptions {
  message: string;
  /** Auto-dismiss duration in ms. */
  duration?: number;
  color?: TextColor;
}

export interface ToastHandle {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastHandle | null>(null);

const styles = css.create({
  wrap: { display: 'flex' },
});

/**
 * Wrap your app once; call `useToast().showToast(...)` from anywhere
 * below it. Mirrors the upstream `useToast` ergonomics.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const tokens = useTokens();
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    if (timer.current != null) {
      clearTimeout(timer.current);
    }
    setToast(options);
    timer.current = setTimeout(() => setToast(null), options.duration ?? 3000);
  }, []);

  const handle = useMemo<ToastHandle>(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={handle}>
      {children}
      {toast != null ? (
        <View
          style={[
            styles.wrap,
            {
              position: 'absolute',
              bottom: 32,
              alignSelf: 'center',
              maxWidth: '90%',
              backgroundColor: tokens['--color-background-inverse'] as string,
              borderRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 16,
              shadowColor: '#000000',
              shadowOpacity: 0.2,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 6,
            },
          ]}
          testID="astryx-toast"
        >
          <Text color="inverse" size={14}>
            {toast.message}
          </Text>
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

/** Show transient messages anchored to the bottom of the screen. */
export function useToast(): ToastHandle {
  const ctx = useContext(ToastContext);
  if (ctx == null) {
    throw new Error('[react-native-astryx] useToast requires <ToastProvider>.');
  }
  return ctx;
}
