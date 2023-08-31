import { FC, Dispatch, SetStateAction } from 'react';

interface Props {
  buttons: Array<{
    text: string;
    handleClick?: () => void;
  }>;
  selectedBtn: number;
  setSelectedBtn: Dispatch<SetStateAction<number>>;
}

const ToggleButtonGroup: FC<Props> = ({
  buttons,
  selectedBtn,
  setSelectedBtn,
}) => {
  const handleClickWrapper = (clickedIndex: number) => {
    buttons[clickedIndex].handleClick?.();
    setSelectedBtn(clickedIndex);
  };

  return (
    <div className='flex flex-row flex-wrap'>
      {buttons.map((btn, i) => {
        return (
          <>
            <button
              key={btn.text}
              type='button'
              className={`p-2 font-dhand text-xl border-[3px] ${
                selectedBtn === i
                  ? 'bg-amber-500 text-stone-950 border-stone-950'
                  : 'bg-amber-200 text-amber-500 border-amber-200 hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950'
              } ${i === 0 ? 'rounded-l-full' : 'rounded-none'} ${
                i === buttons.length - 1 ? 'rounded-r-full' : 'rounded-none'
              }`}
              onClick={() => handleClickWrapper(i)}
            >
              {btn.text}
            </button>
          </>
        );
      })}
    </div>
  );
};

export default ToggleButtonGroup;
