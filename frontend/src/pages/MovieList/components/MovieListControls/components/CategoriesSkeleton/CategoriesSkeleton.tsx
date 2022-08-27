import React from 'react';
import { StyledCategorySkeleton, StyledMenuItem } from './styled';

type CategoriesSkeletonProps = {
  categoriesCount: number;
};

export const CategoriesSkeleton = (props: CategoriesSkeletonProps) => {
  const { categoriesCount } = props;

  return (
    <>
      {Array.from(Array(categoriesCount), (_, index) => (
        <StyledMenuItem>
          <StyledCategorySkeleton key={index} />
        </StyledMenuItem>
      ))}
    </>
  );
};
