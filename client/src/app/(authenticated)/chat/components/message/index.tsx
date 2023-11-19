import { Avatar } from '../icon/styled';
import * as styles from './styled';

interface IProps {
  primary: boolean;
  message: string;
}

export default function Message(props: IProps) {
  const isMain = props.primary;

  return (
    <>
      {props.message && (
        <styles.MessageBox reverse={isMain}>
          <styles.MessageIcon>
            <Avatar />
          </styles.MessageIcon>
          <styles.Message reverse={isMain}>{props.message}</styles.Message>
        </styles.MessageBox>
      )}
    </>
  );
}
