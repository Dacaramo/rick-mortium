import { useOutletContext } from 'react-router-dom';

interface Props {
  navbarHeight: number;
}

export const useNavbar = (): Props => {
  return useOutletContext<Props>();
};
