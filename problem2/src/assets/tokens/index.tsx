import OneInch from './1INCH.svg';
import Blur from './BLUR.svg';
import Bneo from './bNEO.svg';
import Busd from './BUSD.svg';
import Eth from './ETH.svg';
import Luna from './LUNA.svg';
import Usdc from './USDC.svg';

export type TokenImageProps = { className?: string };

export function TokenOneInch({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={OneInch} className={className} alt="token-one-inch" />;
}

export function TokenBlur({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Blur} className={className} alt="token-blur" />;
}

export function TokenBneo({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Bneo} className={className} alt="token-bneo" />;
}

export function TokenBusd({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Busd} className={className} alt="token-busd" />;
}

export function TokenEth({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Eth} className={className} alt="token-eth" />;
}

export function TokenLuna({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Luna} className={className} alt="token-luna" />;
}

export function TokenUsdc({ className = '' }: TokenImageProps): JSX.Element {
  return <img src={Usdc} className={className} alt="token-usdc" />;
}
