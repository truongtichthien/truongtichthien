import ButtonSwap from './components/ButtonSwap';
import InputAmount from './components/InputAmount';
import SelectToken from './components/SelectTokens';
import ContextFormProvider from './contexts/ContextForm';

function App() {
  return (
    <div className="flex justify-center items-center h-screen px-[40px] bg-gradient-skyblue-orange">
      <ContextFormProvider>
        <div className="flex flex-col gap-[24px] bg-white/30 rounded-[20px] px-[32px] py-[24px] shadow-lg w-full max-w-[380px] backdrop-blur-sm">
          <h5 className="w-full text-center">
            <div className="bg-gradient-to-b from-[#c31004] to-[#e9711d] bg-clip-text text-transparent capitalize font-bold text-[20px] leading-[32px]">
              Swap the world!
            </div>
          </h5>

          <div className="flex flex-col text-[14px] leading-[16px] text-black gap-[8px]">
            <label htmlFor="input-amount" className="font-bold">
              From
            </label>
            <SelectToken role="from" />
            <InputAmount role="from" placeholder="input an amount" />
          </div>

          <div className="flex flex-col text-[14px] leading-[16px] text-black gap-[8px]">
            <label htmlFor="output-amount" className="font-bold">
              To
            </label>
            <SelectToken role="to" />
            <InputAmount role="to" disabled />
          </div>

          <ButtonSwap />
        </div>
      </ContextFormProvider>
    </div>
  );
}

export default App;
