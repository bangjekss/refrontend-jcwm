import Axios from 'axios';
import { api_url } from '../../favordb/api_url';
import Swal from 'sweetalert2';

export const getProductAction = () => {
  return (dispatch) => {
    Axios.get(`${api_url}/products`)
      .then((response) => {
        console.log('GET_products_getProduct - SUCCESS');
        dispatch({
          type: 'GET_PRODUCT',
          payload: response.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const addProductAction = (dataProduct) => {
  return (dispatch) => {
    Axios.post(`${api_url}/products`, dataProduct)
      .then((response) => {
        console.log('POST_products_addProduct - SUCCESS');
        Swal.fire({
          icon: 'success',
          title: 'Product has been saved on database',
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch(getProductAction());
      })
      .catch((error) => console.log(error));
  };
};

export const deleteProductAction = (productID) => {
  return (dispatch) => {
    Axios.delete(`${api_url}/products/${productID}`)
      .then((response) => {
        console.log('DELETE_products_deleteProduct - SUCCESS');
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        dispatch(getProductAction());
      })
      .catch((error) => console.log(error));
  };
};

export const editProductAction = (newData, productID) => {
  return (dispatch) => {
    Axios.patch(`${api_url}/products/${productID}`, newData)
      .then((response) => {
        console.log('PATCH_products_editProduct - SUCCESS');
        dispatch(getProductAction());
      })
      .catch((error) => console.log(error));
  };
};
