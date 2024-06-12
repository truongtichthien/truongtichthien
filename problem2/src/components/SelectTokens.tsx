import { useState, type FunctionComponent } from 'react';
import {
  TokenBlur,
  TokenBneo,
  TokenBusd,
  TokenEth,
  TokenLuna,
  TokenOneInch,
  TokenUsdc,
  type TokenImageProps,
} from '../assets/tokens';
import { useFormToken } from '../contexts/ContextForm';

type OptionTokenProps = {
  name: string;
  Image: FunctionComponent<TokenImageProps>;
};

const TOKENS: { [key: string]: OptionTokenProps } = {
  '1INCH': {
    name: '1INCH',
    Image: TokenOneInch,
  },
  BLUR: {
    name: 'BLUR',
    Image: TokenBlur,
  },
  bNEO: {
    name: 'bNEO',
    Image: TokenBneo,
  },
  BUSD: {
    name: 'BUSD',
    Image: TokenBusd,
  },
  ETH: {
    name: 'ETH',
    Image: TokenEth,
  },
  LUNA: {
    name: 'LUNA',
    Image: TokenLuna,
  },
  USDC: {
    name: 'USDC',
    Image: TokenUsdc,
  },
  FAKE: {
    name: 'FAKE',
    Image: TokenUsdc,
  },
};

type SelectTokenProps = { role: 'from' | 'to' };

export default function SelectToken({ role }: SelectTokenProps): JSX.Element {
  const [token, setToken] = useFormToken();
  const [expanded, setExpanded] = useState<boolean>(false);

  const tokenName = TOKENS?.[token[role]]?.name;
  const TokenSymbol = TOKENS?.[token[role]]?.Image;

  function handleSelect(key: string) {
    setToken((prev) => ({ ...prev, [role]: key }));
    setExpanded(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        id={`button-select-${role}-token`}
        onClick={() => setExpanded((prev) => !prev)}
        className="bg-white rounded-[8px] px-[16px] py-[16px] w-full shadow-md text-left min-h-[56px] flex items-center justify-between"
      >
        <span className="text-[14px] leading-[20px] flex items-center gap-[8px]">
          {TokenSymbol ? (
            <span className="w-[24px] aspect-square bg-gray-500 rounded-full">
              <TokenSymbol />
            </span>
          ) : (
            <></>
          )}
          <span className="font-medium">
            {tokenName || (
              <span className="text-black/30">-- select a token --</span>
            )}
          </span>
        </span>
        <span
          className={`relative aspect-square w-[20px] rounded-full outline-none before:absolute before:left-1/2 before:top-1/2 before:h-[2px] before:w-[10px] before:-translate-x-1/4 before:rounded-full before:bg-gray-600 before:transition-transform before:duration-200 after:absolute after:left-1/2 after:top-1/2 after:h-[2px] after:w-[10px] after:-translate-x-[85%] after:rounded-full after:bg-gray-600 after:transition-transform after:duration-200
            ${
              expanded
                ? 'before:-translate-y-3/4 before:rotate-45 after:-translate-y-3/4 after:-rotate-45'
                : 'before:-translate-y-1/4 before:-rotate-45 after:-translate-y-1/4 after:rotate-45'
            }`}
        />
      </button>

      <div
        className={`absolute transition-[max-height] duration-500 ease-in-out top-full inset-x-0 translate-y-[2px] z-[10] shadow-md rounded-[8px] no-scrollbar
          ${
            expanded ? 'max-h-[284px] overflow-auto' : 'max-h-0 overflow-hidden'
          }`}
      >
        <div className="flex flex-col overflow-hidden shadow-lg px-[16px] bg-white">
          {Object.entries(TOKENS).map(([key, option]) => {
            const { name, Image } = option;
            const notAvailable =
              (role === 'from' && token['to'] === key) ||
              (role === 'to' && token['from'] === key);

            return (
              <div
                key={key}
                onClick={() => handleSelect(key)}
                className={`flex items-center py-[16px] justify-between border-b-[1px] border-[#bbb]/30 last:border-0
                  ${notAvailable ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                <div
                  className={`flex items-center gap-[8px]
                    ${notAvailable ? 'grayscale opacity-50' : ''}`}
                >
                  <Image className="" />
                  <span className="font-medium">{name}</span>
                </div>
                {key === token[role] && (
                  <span className="text-[9px] rounded-[4px] bg-green-100 px-[6px] py-[2px]">
                    selected
                  </span>
                )}
                {notAvailable && (
                  <span className="text-[9px] rounded-[4px] bg-orange-200 px-[6px] py-[2px]">{`used as ${role.toUpperCase()}`}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
