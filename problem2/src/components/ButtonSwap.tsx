import { useState } from 'react';
import { useFormAmount, useFormToken } from '../contexts/ContextForm';
import { getPrice } from '../utils/getPrice';

type PriceProps = {
  currency: string;
  price: number;
};

export default function ButtonSwap(): JSX.Element {
  const [token] = useFormToken();
  const [amount, setAmount] = useFormAmount();
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [notAvailableToken, setNotAvailableToken] = useState<Array<string>>([]);

  async function handleClick() {
    setError(false);
    setProcessing(true);

    const resp: Array<PriceProps> = await new Promise((resolve) =>
      setTimeout(() => resolve(getPrice()), 1000 * 3)
    );

    const prices: { [key: string]: PriceProps } = resp
      .filter(({ currency }) => [token['from'], token['to']].includes(currency))
      .reduce((a, e) => ({ ...a, [e.currency]: e }), {});

    setError(Object.keys(prices).length < 2);

    if (Object.keys(prices).length === 2) {
      setAmount((prev) => ({
        ...prev,
        to:
          (amount['from'] / (prices?.[token['from']]?.price || 1)) *
          prices?.[token['to']]?.price,
      }));
    } else {
      setNotAvailableToken(
        Object.values(token).filter((tk) => Object.keys(prices).indexOf(tk) < 0)
      );
    }
    setProcessing(false);
  }

  return (
    <div className="">
      <button
        type="submit"
        id="button-submit-swap"
        className={`w-full text-center py-[8px] px-[16px] rounded-full shadow-lg active:shadow-none mb-[8px]
          ${
            processing ||
            Object.values(token).includes('') ||
            amount['from'] === 0
              ? 'opacity-50 bg-gray-500'
              : 'opacity-80 bg-gradient-ember-cyan'
          }`}
        onClick={handleClick}
      >
        {processing ? (
          <span className="lowercase text-white justify-center font-medium flex items-center gap-[16px]">
            <span className="">Processing</span>
            <span className="animate-spin h-[16px] w-[2px] bg-white rounded-full" />
          </span>
        ) : (
          <span className="lowercase text-white font-bold">Swap</span>
        )}
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 text-red-500 text-[13px] font-medium
          ${error ? 'max-h-[100px]' : 'max-h-0'}`}
      >
        {`Error: ${
          notAvailableToken.length > 1
            ? `${notAvailableToken.join(' and ')} are`
            : `${notAvailableToken[0]} is`
        } not available for swapping. Try again later.`}
      </div>
    </div>
  );
}
