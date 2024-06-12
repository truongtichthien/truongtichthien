import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

type TokenProps = { from: string; to: string };

type AmountProps = { from: number; to: number };

type ContextFormProps = {
  token: TokenProps;
  amount: AmountProps;
  setToken: Dispatch<SetStateAction<TokenProps>>;
  setAmount: Dispatch<SetStateAction<AmountProps>>;
};

const ContextForm = createContext({} as ContextFormProps);

type ContextFormProviderProps = {
  children: ReactNode;
};

export default function ContextFormProvider({
  children,
}: ContextFormProviderProps) {
  const [token, setToken] = useState<TokenProps>({ from: '', to: '' });
  const [amount, setAmount] = useState<AmountProps>({ from: 0, to: 0 });

  const value = useMemo(
    () => ({ token, amount, setToken, setAmount }),
    [amount, token]
  );

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  return <ContextForm.Provider value={value}>{children}</ContextForm.Provider>;
}

export type useFormTokenProps = [
  TokenProps,
  Dispatch<SetStateAction<TokenProps>>
];

export function useFormToken(): useFormTokenProps {
  const { token, setToken } = useContext(ContextForm);
  return [token, setToken];
}

export type useFormAmountProps = [
  AmountProps,
  Dispatch<SetStateAction<AmountProps>>
];
export function useFormAmount(): useFormAmountProps {
  const { amount, setAmount } = useContext(ContextForm);
  return [amount, setAmount];
}
