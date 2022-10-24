import axios from "axios";
import axiosInstance from "./Axios";
import AuthService from "./Auth-service";

const getAllCatogaryList = async () =>{
    const response = await axiosInstance.get("category/get_category.php");
    return response.data;
}

const getSummeryCatogaryList = async () =>{
  const response = await axiosInstance.get("category/summery.php");
  return response.data;
}

const getAllProductList = async () =>{
  const response = await axiosInstance.get("product/get_product.php");
  return response.data;
}

const getAllBrandsList = async () =>{
  const response = await axiosInstance.get("brands/get_brands.php");
  return response.data;
}

const getAllOderList = async () =>{
  const response = await axiosInstance.get("oders/get_oders.php");
  return response.data;
}

const postCategory = async (catName, imgUrl) =>{
    return axiosInstance.post("category/add_category.php", {
        catName,
        imgUrl,
      })
        .then((response) => {
          return response.data;
        });
};

const postOders = async (itemData) =>{
  //alert(JSON.stringify(itemData));
  return axiosInstance.post("oders/add_oders.php", itemData)
      .then((response) => {
        return response.data;
      });
}

const postBrand = async (brandName, imgUrl) =>{
  return axiosInstance.post("brands/add_brands.php", {
    brandName,
    imgUrl,
    })
      .then((response) => {
        return response.data;
      });
}

const deleteBrand = async (branCode) =>{
  return axiosInstance.post("brands/delete_brand.php", {
    branCode,
    })
      .then((response) => {
        return response.data;
      });
}

const deleteProduct = async (productCode) =>{
  return axiosInstance.post("product/delete_product.php", {
    productCode,
    })
      .then((response) => {
        return response.data;
      });
}

const deleteCategory = async (catCode) =>{
  return axiosInstance.post("category/delete_category.php", {
    catCode,
    })
      .then((response) => {
        return response.data;
      });
}

const updateCategory = async (catCode, catName) =>{
  return axiosInstance.post("category/update_category.php", {
    catCode, catName,
    })
      .then((response) => {
        return response.data;
      });
}

const postProduct = async (productName, category, shortDesc, discription, brand, price, imgUrl) =>{
    return axiosInstance.post("product/add_product.php", {
      productName,
      category,
      shortDesc,
      discription,
      brand,
      price,
      imgUrl,
      })
        .then((response) => {
          return response.data;
        });
}

const updateProduct = async (productName, category, shortDesc, discription, brand, price, productCode) =>{
  
  return axiosInstance.post("product/update_product.php", {
    productName,
    category,
    shortDesc,
    discription,
    brand,
    price,
    productCode
    })
      .then((response) => {
        return response.data;
      });
}


const uploadCategoryImg = async (catSelectImgData)=> {
    const data = new FormData();
    data.append('file', catSelectImgData);
    return axiosInstance.post("/category/file_upload.php", data, {
    }).then((response)=>{
        return response.data;
    })
}

const uploadProductImg = async (catSelectImgData)=> {
    const data = new FormData();
    data.append('file', catSelectImgData);
    return axiosInstance.post("/product/file_upload.php", data, { // receive two parameter endpoint url ,form data 
    }).then((response)=>{
        return response.data;
    })
}

const uploadBrandImg = async (catSelectImgData)=> {
  const data = new FormData();
  data.append('file', catSelectImgData);
  return axiosInstance.post("/brands/file_upload.php", data, { // receive two parameter endpoint url ,form data 
  }).then((response)=>{
      return response.data;
  })
}

const DataService = {
    postCategory,
    uploadCategoryImg,
    getAllCatogaryList,
    getSummeryCatogaryList,
    uploadProductImg,
    postProduct,
    getAllProductList,
    uploadBrandImg,
    postBrand,
    getAllBrandsList,
    deleteBrand,
    deleteProduct,
    deleteCategory,
    updateCategory,
    updateProduct,
    postOders,
    getAllOderList,

  }
  export default DataService;