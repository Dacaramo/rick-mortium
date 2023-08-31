import { FC, useState } from 'react';
import { TEXT_INPUT_CLASSES } from '../../constants/tailwindClasses';
import ToggleButtonGroup from '../ToggleButtonGroup/ToggleButtonGroup';

interface Props {}

const FiltersSection: FC<Props> = () => {
  const [selectedStatus, setSelectedStatus] = useState<number>(-1);
  const [selectedGender, setSelectedGender] = useState<number>(-1);

  const statusButtons = [
    {
      text: 'alive',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
    {
      text: 'dead',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
    {
      text: 'unknown',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
  ];

  const genderButtons = [
    {
      text: 'female',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
    {
      text: 'male',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
    {
      text: 'genderless',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
    {
      text: 'unknown',
      handleClick: () => {
        /**
         * TODO
         */
      },
    },
  ];

  const labelClasses = 'mb-2 font-dhand text-amber-500 text-2xl text-center';

  return (
    <section className='pt-5 flex flex-row flex-wrap justify-around items-center'>
      <div className='flex flex-col align-center'>
        <label className={`${labelClasses}`}>Status</label>
        <ToggleButtonGroup
          buttons={statusButtons}
          selectedBtn={selectedStatus}
          setSelectedBtn={setSelectedStatus}
        />
      </div>
      <div className='flex flex-col align-center'>
        <label className={`${labelClasses}`}>Gender</label>
        <ToggleButtonGroup
          buttons={genderButtons}
          selectedBtn={selectedGender}
          setSelectedBtn={setSelectedGender}
        />
      </div>
      <div className='flex flex-col align-center'>
        <label
          htmlFor='speciesInput'
          className={`${labelClasses}`}
        >
          Species
        </label>
        <input
          type='text'
          id='speciesInput'
          className={`${TEXT_INPUT_CLASSES}`}
          placeholder='Filter by species'
        />
      </div>
      <div className='flex flex-col align-center'>
        <label
          htmlFor='subspeciesInput'
          className={`${labelClasses}`}
        >
          Subspecies
        </label>
        <input
          type='text'
          id='subspeciesInput'
          className={`${TEXT_INPUT_CLASSES}`}
          placeholder='Filter by subspecies'
        />
      </div>
    </section>
  );
};

export default FiltersSection;
