import { JSX } from 'solid-js/jsx-runtime';
import { CategoriesList } from '@components/CategoriesList/CategoriesList';
import styles from './styles.module.scss';

export interface BlogPostInfoProps {
  createdAt: string;
  categories: string[];
  baseUrl: string;
}

export function BlogPostInfo(props: BlogPostInfoProps): JSX.Element {
  return (
    <aside class={styles.wrapper}>
      <time dateTime={props.createdAt}>{props.createdAt.split('T')[0]}</time>
      <CategoriesList categories={props.categories} baseUrl={props.baseUrl} />
    </aside>
  );
}
