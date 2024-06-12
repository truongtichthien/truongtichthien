import { useMemo } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  // fixed:
  // add blockchain property
  // WalletBalance doesn't define the blockchain property but uses it later
  // ~
  blockchain: string;
}

// fixed:
// the function could be pure, move out from the WalletPage
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};

// fixed:
// FormattedWalletBalance could be inherited from WalletBalance
// ~
// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {} // BoxProps probably is imported from somewhere

const WalletPage: React.FC<Props> = (props: Props) => {
  const { /*children,*/ ...rest } = props; // children not used
  const balances = useWalletBalances(); // useWalletBalances hook is imported from somewhere
  const prices = usePrices(); // usePrices hook probably is imported from somewhere

  // fixed:
  // getPriority could be a pure function, move it out
  // ~~
  // const getPriority = (blockchain: any): number => {
  //   switch (blockchain) {
  //     case 'Osmosis':
  //       return 100;
  //     case 'Ethereum':
  //       return 50;
  //     case 'Arbitrum':
  //       return 30;
  //     case 'Zilliqa':
  //       return 20;
  //     case 'Neo':
  //       return 20;
  //     default:
  //       return -99;
  //   }
  // };

  const sortedBalances = useMemo(
    () => {
      return (
        balances
          .filter((balance: WalletBalance) => {
            // fixed:
            // balancePriority could be a typo, change it to lhsPriority
            // ~
            // const balancePriority = getPriority(balance.blockchain);
            const lhsPriority = getPriority(balance.blockchain); // balance is WalletBalance typed which doesn't define the blockchain property
            if (lhsPriority > -99) {
              if (balance.amount <= 0) {
                return true;
              }
            }
            return false;
          })
          .sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
          })
          // fixed:
          // move the map in from the outside
          // ~
          .map((balance: WalletBalance) => {
            return {
              ...balance,
              formatted: balance.amount.toFixed(),
            };
          })
      );
    },
    // fixed:
    // prices doesn't involve in the function, no need to put it to the dependencies array
    // ~
    [balances /* prices */]
  );

  // fixed:
  // the map loop could be attached in the useMemo function above
  // if not, formattedBalances could be re-calculated even when sortedBalances is persist
  // ~
  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed(),
  //   };
  // });

  // fixed:
  // sortedBalances doesn't contain formatted property
  // so 2 solutions:
  // . use formattedBalances
  // . place .map inside the useMemo (as changed above)
  // ~
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow // WalletRow component probably is imported from somewhere
          className={classes.row} // classed cannot be found
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  // fixed:
  // ...rest is not a practical approach, should pass props explicitly
  // ~
  return <div {...rest}>{rows}</div>;
};
