import { createContext, useState, useEffect } from "react";
import DataService from '../services/Data-service';
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export function DataProvider({children}) {
    const navigate = useNavigate();

    const [producstList, setProducstList] = useState([]);
    const [odersList, setOdersList] = useState([]);
    const [topProductList, setTopProductList] =useState([]);
    const [topCategoryList, setTopCategoryList] =useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [summeryCategoryList, setSummeryCategoryList] = useState([]);
    const [brandsList, setBrandsList] = useState([]);
    const [heartProduct, setHeartProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOders = () => {
      setLoading(true);
      DataService.getAllOderList().then((res) => {
        if (res) {
          setOdersList(res);
          setLoading(false);
        } else {
          setOdersList([]);
          setLoading(false);
        }
      })
    }

    const fetchProducts = () => {
        setLoading(true);
        DataService.getAllProductList().then((res) => {
          if (res) {
            setProducstList(res);
            setLoading(false);
          } else {
            setProducstList([]);
            setLoading(false);
          }
        })
      }

      const fetchCategory = () => {
        setLoading(true);
        DataService.getAllCatogaryList().then((res) => {
          if (res) {
            setCategoryList(res);
            setLoading(false);
          } else {
            setCategoryList([]);
            setLoading(false);
          }
        })
      }

      const fetchSummeryCategory = () => {
        setLoading(true);
        DataService.getSummeryCatogaryList().then((res) => {
          if (res) {
            setSummeryCategoryList(res);
            setLoading(false);
          } else {
            setSummeryCategoryList([]);
            setLoading(false);
          }
        })
      }

      const fetchBrands = () => {
        setLoading(true);
        DataService.getAllBrandsList().then((res) => {
          if (res) {
            setBrandsList(res);
            setLoading(false);
          } else {
            setBrandsList([]);
            setLoading(false);
          }
        })
      }

    const fetchTopProduct= async() =>{
        setLoading(true);
        DataService.getAllProductList().then((res) => {
          if (res) {
            if(res.length > 20){
              const shuffled = [...res].sort(() => 0.5 - Math.random());
            setTopProductList(shuffled.slice(0, 20));
            }else{
              setTopProductList(res);
            }
            setLoading(false);
          } else {
            setTopProductList([]);
            setLoading(false);
          }
        })
      }

      const fetchTopCategory= async() =>{
        setLoading(true);
        DataService.getSummeryCatogaryList().then((res) => {
          if (res) {
            if(res.length > 6){
              const shuffled = [...res].sort(() => 0.5 - Math.random());
              setTopCategoryList(shuffled.slice(0, 20));
            }else{
              setTopCategoryList(res);
            }
            setLoading(false);
          } else {
            setTopCategoryList([]);
            setLoading(false);
          }
        })
      }

     // console.log(producstList.length);
      useEffect(() => {
        fetchProducts();
        fetchCategory();
        fetchSummeryCategory();
        fetchBrands();
        fetchTopProduct();
        fetchTopCategory();
        fetchOders();
      }, []);

      const [cartItems, setCartItems] = useState([]);
      const [watchList, setwatchList] = useState([]);
    
      const addToCart = (filteredProduct) => {
        //console.log(filteredProduct);
        
        const exist = cartItems.find((x) => x.PRDUCT_CODE === filteredProduct.PRDUCT_CODE);
        if (exist) {
          setCartItems(
            cartItems.map((x) =>
              x.PRDUCT_CODE === filteredProduct.PRDUCT_CODE ? { ...exist, qty: exist.qty + 1 } : x
            )
          )
        } else {
          setCartItems([...cartItems, { ...filteredProduct, qty: 1 }]);
        }
      }

      const removeFromCart = (item) => {
        let hardCopy = [...cartItems];
        hardCopy = hardCopy.filter((cItem) => cItem.PRDUCT_CODE !== item.PRDUCT_CODE);
        setCartItems(hardCopy);
      };

      const qtyPlusItem = (productCode) =>{
        //console.log("puls")
        const exist = cartItems.find((x) => x.PRDUCT_CODE === productCode);
        setCartItems(
          cartItems.map((x) =>
            x.PRDUCT_CODE === productCode ? { ...exist, qty: exist.qty + 1 } : x
          )
        )
      }

      const qtyMinusItem = (productCode) =>{
        //console.log("puls")
        const exist = cartItems.find((x) => x.PRDUCT_CODE === productCode);
        if(exist.qty > 1){
          setCartItems(
            cartItems.map((x) =>
              x.PRDUCT_CODE === productCode ? { ...exist, qty: exist.qty - 1 } : x
            )
          )
        }
        
      }

      const addToWatch = (ProductCode) => {
        //console.log(ProductCode);
        const exist = watchList.find((x) => x.PRDUCT_CODE === ProductCode);
        if (exist) {
          //console.log('Remove');
          return;
        }else{
          //console.log('Add');
          producstList.filter((item) => item.PRDUCT_CODE === ProductCode).map(filteredProduct=>{
            setwatchList([...watchList, { ...filteredProduct, WATCH: true }]);
          });
          
        }
        //console.log(watchList);
      }

      const removeFromWatch = (ProductCode) => {
        let hardCopy = [...watchList];
        hardCopy = hardCopy.filter((cItem) => cItem.PRDUCT_CODE !== ProductCode);
        setwatchList(hardCopy);
      };

    const [payItemList, setPayItemList] = useState([]);
    const addPayItem =(itemList) =>{
      setPayItemList(itemList);
      navigate("/pay", {replace: true});
    }

    const [updateProductData, setUpdateProductData] =useState([]);

    return (
        <DataContext.Provider 
                    value={{
                        producstList, setProducstList,
                        categoryList, setCategoryList, summeryCategoryList,
                        loading, setLoading,
                        heartProduct, setHeartProduct,
                        brandsList, setBrandsList,
                        addToCart, cartItems, removeFromCart, qtyPlusItem, qtyMinusItem,
                        addToWatch, removeFromWatch, watchList,
                        topProductList, topCategoryList,
                        addPayItem, payItemList,
                        updateProductData, setUpdateProductData,
                        odersList,
                    }}>
                        {children}
        </DataContext.Provider>
    );
}

export default DataContext;