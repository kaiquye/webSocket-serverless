'use client';
import ChatSkeleton from './components/chat/skeleton';
import * as styles from './styled';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonLoad() {
  return (
    <styles.StyledWrapper>
      <Skeleton />
      <ChatSkeleton />
    </styles.StyledWrapper>
  );
}
