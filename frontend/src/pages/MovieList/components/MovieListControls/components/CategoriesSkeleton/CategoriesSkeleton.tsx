import React from 'react';
import { StyledCategorySkeleton } from './styled';

type CategoriesSkeletonProps = {
  categoriesCount: number;
};

export const CategoriesSkeleton = (props: CategoriesSkeletonProps) => {
  const { categoriesCount } = props;

  return (
    <>
      {Array.from(Array(categoriesCount), (_, index) => (
        <StyledCategorySkeleton key={index} />
      ))}
    </>
  );
};
