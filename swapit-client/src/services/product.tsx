import axiosInstance from "@/utils/axiosInstence"


  export const addProduct = async (data:FormData) => {
    // console.log("data from from",data)
      const response = await axiosInstance.post("/addNewProduct", data, {
        headers : {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    };



  export const fetchCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data.categories;
  };


  export const fetchProducts = async ({

    page = 1,
    limit = 10,
    search = "",
    category = "",
    subCategory = "",
    minPrice = "",
    maxPrice = "",
    condition = "",
    latitude= null as number | null,
    longitude= null as number | null,
    address= "",

  } = {}) => {
    console.log("datas",page, limit, search, category, subCategory, minPrice, maxPrice, condition,longitude,latitude,address)
    const response = await axiosInstance.get("/products",{
      params: {page, limit, search, category, subCategory, minPrice, maxPrice, condition,longitude,latitude,address},
    });
    return response.data
  }


  export const fetchSpecificProduct = async (productId:any) => {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data
  }