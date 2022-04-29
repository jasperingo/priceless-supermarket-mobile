import React, { useCallback, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useMoneyFormat } from '../../hooks/formatters';
import { useTranslation } from 'react-i18next';
import ProductSpecificationComponent from '../components/ProductSpecificationComponent';
import QuantityPickerComponent from '../components/QuantityPickerComponent';
import useProduct from '../hooks/productHook';
import useProductFetch from '../hooks/productFetchHook';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import ErrorCode from '../../errors/ErrorCode';
import { useCustomer } from '../../customer';
import ErrorComponent from '../../components/fetch/ErrorComponent';
import { usePhotoUrl } from '../../photo';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    image: {
      height: 300,
      width: '100%',
      resizeMode: 'stretch',
    },

    dataContainer: {
      margin: dimens.xSmall,
      padding: dimens.xSmall,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    heading: {
      fontWeight: 'bold',
      fontSize: dimens.medium,
      color: colors.colorSecondary,
      marginBottom: dimens.xSmall,
    },

    name: {
      fontWeight: 'bold',
      fontSize: dimens.large,
      color: colors.colorOnSurface,
      marginBottom: dimens.xSmall,
    },

    price: {
      fontSize: dimens.xLarge,
      color: colors.colorSecondary,
      marginBottom: dimens.xSmall,
    },

    addToCartButton: {
      alignItems: 'center',
      padding: dimens.medium,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    addToCartButtonText: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: colors.colorOnPrimary,
    },

    description: {
      color: colors.colorOnSurface,
    },
  });

const ProductScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const moneyFormat = useMoneyFormat();

  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'Product'>>();

  const { token } = useCustomer();

  const { product, productId, error, loading } = useProduct();

  const [fetchProduct, unfetchProduct] = useProductFetch();

  const uri = usePhotoUrl(product?.photo?.url ?? '');

  const productFetch = useCallback(() => {
    fetchProduct(id, token);
  }, [fetchProduct, id, token]);

  useEffect(() => {
    if ((product !== null || error !== null) && productId !== id) {
      unfetchProduct();
    } else if (product === null && error === null) {
      productFetch();
    }
  }, [id, product, error, productId, productFetch, unfetchProduct]);

  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView>
      {product !== null && (
        <>
          <Image style={styles.image} source={{ uri }} />
          <View style={styles.dataContainer}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>
              {moneyFormat(product.price as number)}
            </Text>
            <QuantityPickerComponent
              quantityToOrder={quantity}
              setQuantityToOrder={setQuantity}
              quantity={product.quantity as number}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>{t('Add_to_cart')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataContainer}>
            <Text style={styles.heading}>{t('Product_description')}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.dataContainer}>
            <Text style={styles.heading}>{t('Product_specifications')}</Text>
            <ProductSpecificationComponent
              title="Category"
              body={product.category?.name as string}
            />
            {product.barcode && (
              <ProductSpecificationComponent
                title="Barcode"
                body={product.barcode}
              />
            )}
            {product.weight && (
              <ProductSpecificationComponent
                title="Weight"
                body={`${product.weight} (kg)`}
              />
            )}
            {product.width && (
              <ProductSpecificationComponent
                title="Width"
                body={`${product.width} (cm)`}
              />
            )}
            {product.height && (
              <ProductSpecificationComponent
                title="Height"
                body={`${product.height} (cm)`}
              />
            )}
          </View>
        </>
      )}

      {product === null && (
        <View style={styles.dataContainer}>
          {(loading && <LoadingComponent />) ||
            (error === ErrorCode.NOT_FOUND && (
              <ErrorComponent text="_not_found" />
            )) ||
            (error === ErrorCode.UNAUTHORIZED && (
              <ErrorComponent text="Authorization_failed" />
            )) ||
            (error === ErrorCode.PERMISSION_DENIED && (
              <ErrorComponent text="Permission_denied" />
            )) ||
            (error === ErrorCode.NO_NETWORK_CONNECTION && (
              <RetryComponent
                action={productFetch}
                text="Not_network_connection"
              />
            )) ||
            (error !== null && <RetryComponent action={productFetch} />) ||
            null}
        </View>
      )}
    </ScrollView>
  );
};

export default ProductScreen;
