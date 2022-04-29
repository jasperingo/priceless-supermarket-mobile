import React from 'react';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import Product from '../models/Product';

const ProductListFooterComponent = ({
  loading,
  error,
  productsFetch,
  products,
  loaded,
}: {
  loading: boolean;
  error: ErrorCodeType;
  productsFetch: () => Promise<void>;
  products: Product[];
  loaded: boolean;
}) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (error === ErrorCode.NO_NETWORK_CONNECTION) {
    return (
      <RetryComponent text="Not_network_connection" action={productsFetch} />
    );
  }

  if (error !== null) {
    return <RetryComponent action={productsFetch} />;
  }

  if (loaded && products.length === 0) {
    return <EmptyListComponent text="_empty_products" />;
  }

  return null;
};

export default ProductListFooterComponent;
