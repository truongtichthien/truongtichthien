import { useEffect, useState, type ChangeEvent } from 'react';
import { useFormAmount } from '../contexts/ContextForm';

type InputAmountProps = {
  role: 'from' | 'to';
  disabled?: boolean;
  placeholder?: string;
};

export default function InputAmount({
  role,
  disabled = false,
  placeholder = 'input',
}: InputAmountProps): JSX.Element {
  const [amount, setAmount] = useFormAmount();
  const [value, setValue] = useState<number>(0);

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const val = +evt.target.value;
    setAmount((prev) => ({ ...prev, [role]: val }));
  }

  useEffect(() => {
    setValue(amount[role]);
  }, [amount, role]);

  return (
    <input
      id="input-amount"
      type="number"
      className={`rounded-[8px] leading-[20px] px-[16px] py-[14px] text-[14px] border-[2px] border-transparent transition-colors outline-none duration-300 font-medium
        ${!disabled ? 'focus:border-purple-500 bg-white shadow-md' : ''}`}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={handleChange}
    />
  );
}
