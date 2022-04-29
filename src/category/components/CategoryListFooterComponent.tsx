import React from 'react';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import ErrorCode from '../../errors/ErrorCode';
import useCategoriesFetch from '../hooks/categoriesFetchHook';
import useCategories from '../hooks/categoriesHook';

const CategoryListFooterComponent = () => {
  const { categories, loaded, loading, error } = useCategories();

  const [fetchCategory] = useCategoriesFetch();

  if (loading) {
    return <LoadingComponent />;
  }

  if (error === ErrorCode.NO_NETWORK_CONNECTION) {
    return (
      <RetryComponent text="Not_network_connection" action={fetchCategory} />
    );
  }

  if (error !== null) {
    return <RetryComponent action={fetchCategory} />;
  }

  if (loaded && categories.length === 0) {
    return <EmptyListComponent text="_empty_categories" />;
  }

  return null;
};

export default CategoryListFooterComponent;
