'use client';
import { GetProjectsOutput } from '@/services/git-hub/find-projects.service';
import styles from './styled';
import { useProfileContext } from '@/context/profile.context';
import { Avatar } from '../avatar/styled';
import { AiOutlineStar } from 'react-icons/ai';

type IProps = {
  projects?: GetProjectsOutput[];
};

export function Carousel(props: IProps) {
  const profile = useProfileContext();

  return (
    <styles.StyledCarouselBox>
      {props.projects &&
        props?.projects.map(project => (
          <styles.StyledCarouselCard key={project.id}>
            <Avatar />
            <styles.StyledCarouselCardDescription>
              <a href={project.html_url}>{project.name}</a>
              <div>
                <AiOutlineStar />
                <p>{project.stargazers_count}</p>
              </div>
              <label>{project.description}</label>
            </styles.StyledCarouselCardDescription>
          </styles.StyledCarouselCard>
        ))}
    </styles.StyledCarouselBox>
  );
}
