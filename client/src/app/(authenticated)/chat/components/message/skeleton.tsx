'use client';
import * as styles from './styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MessageSkeleton() {
  return (
    <>
      <styles.MessageBox reverse={true}>
        <styles.MessageIcon>
          <Skeleton width={50} height={50} circle={true} />
        </styles.MessageIcon>
        <Skeleton width={200} height={50} />
      </styles.MessageBox>
      <styles.MessageBox reverse={false}>
        <styles.MessageIcon>
          <Skeleton width={50} height={50} circle={true} />
        </styles.MessageIcon>
        <Skeleton width={200} height={50} />
      </styles.MessageBox>
    </>
  );
}
