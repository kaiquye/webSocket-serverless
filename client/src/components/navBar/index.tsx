import { useRouter } from 'next/navigation';
import * as styles from './styled';
import { MdArrowBack } from 'react-icons/md';
import BackButtonStyled from '@/components/buttons/back-button/styled';

export function NavBar() {
  return (
    <styles.StyledWrapper>
      <styles.StyledProfile>
        <BackButtonStyled />
        <div>
          <label>Kaique.Mendes</label>
        </div>
        <div>
          <h1>+</h1>
        </div>
      </styles.StyledProfile>
    </styles.StyledWrapper>
  );
}
