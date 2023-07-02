import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../../components/category/Categories";
import ProductCard from "../../components/product/ProductCard";
import PageLoading from "../../components/ui/PageLoading";
import useAddToCartFromLocal from "../../hooks/useAddToCartFromLocal";
import { useAuth } from "../../hooks/useAuth";
import { loggedInUser } from "../../redux/features/auth/authSlice";
import { useGetProductQuery } from "../../redux/features/product/productAPI";
import {
  convertToken,
  exchangeCodeAndStore,
  getQuery,
  oAuthUrlToData,
} from "../../utils/loginUtils";
import styles from "./home.module.scss";

/* ------------------------------- components ------------------------------- */

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const { isError, isLoading: loading, data } = useGetProductQuery();
  const { isLoading: updateCartLoading, updateCart } = useAddToCartFromLocal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { data: cartData , refetch , isLoading: cartDataLoading } = useGetCartQuery();
  // initial product fetching and selecting
  useEffect(() => {
    if (!isError && data && data?.categories) {
      setCategories(data?.categories);
      setSelectedCategory(data?.categories[0]);
      setSelectedSubCategory(data?.categories[0]?.sub_category[0]);
    }
  }, [data, isError]);

  useEffect(() => {
    !isAuth && oAuthUrlToData();
  }, [isAuth]);

  useEffect(() => {
      const oAuth2Code = localStorage.getItem("oAuth2Code");
      if (oAuth2Code) {
        const code = JSON.parse(oAuth2Code)?.code;
        setIsLoading(true);
        exchangeCodeAndStore(code, "");
      }
    
  }, []);

  /* -------------------- get oAuth2 data from localStorage ------------------- */
  useEffect(() => {
    let getOauthData = () => {
        let getData = localStorage.getItem("oAuth2Data");
        getData = getData ? JSON.parse(getData) : null;
        setIsLoading(false);
        if (getData) {
          const data = convertToken(getData);
          data.then((value) => {
            if (value && value?.data?.access_token) {
              const query = getQuery();
              localStorage.removeItem("oAuth2Data");
              // set login cookies
              dispatch(
                loggedInUser({
                  token: value?.data?.access_token,
                  user: value?.user,
                })
              );
              setIsLoading(false);
              navigate(query ? `/${query}` : "/");
            }
          });
        }
      };

      setTimeout(getOauthData,1000);
      setIsLoggedIn(true);
    
    return () => {
      clearTimeout(getOauthData);
    };
  }, []);

  /* ------------------------------- update cart ------------------------------ */
  useEffect(() => {
    if (isLoggedIn) {
      updateCart();
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  /* -------------------------------- items tab ------------------------------- */

  let items = null;
  let itemParent = null;

  if (selectedCategory && selectedSubCategory) {
    const ctgry = selectedCategory?.sub_category.find(
      (value) => value?.id === selectedSubCategory?.id
    );

    items = ctgry?.items;
    itemParent = ctgry?.name;
  }

  const selectedCategoryHandler = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(category?.sub_category[0]);
  };

  const selectedSubCategoryHandler = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  if ((isLoading && !isAuth) || loading) return <PageLoading />;

  return (
    <>
      <section className={`${styles.categories_section}`}>
        <div className={`custom__container `}>
          {/* category  */}
          <div className={`${styles.categories_wrapper}`}>
            <h2 className={`${styles.heading} `}>Categories</h2>
            <div
              className={`d-flex  align-items-sm-center flex-grow-1  flex-wrap  gap-lg-4 gap-2 `}
            >
              {categories.map((value) => (
                <Categories
                  key={value?.id}
                  content={value}
                  isActive={
                    selectedCategory && selectedCategory?.id === value?.id
                      ? true
                      : false
                  }
                  clickHandler={selectedCategoryHandler}
                />
              ))}
            </div>
          </div>
          {/* sub categories  */}
          <div className={`${styles.categories_wrapper}`}>
            <h2 className={`${styles.heading}`}>Sub-Categories</h2>
            <div
              className={`d-flex flex-wrap align-items-sm-center  flex-grow-1 gap-4 `}
            >
              {selectedCategory &&
                selectedCategory?.sub_category.map((sub_c_value) => (
                  <Categories
                    key={sub_c_value?.id}
                    content={sub_c_value}
                    isActive={
                      selectedSubCategory &&
                      selectedSubCategory?.id === sub_c_value?.id
                        ? true
                        : false
                    }
                    clickHandler={selectedSubCategoryHandler}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* product items  */}
      <section className={` ${styles.product_section}`}>
        <div className="custom__container">
          <h2 className={`${styles.heading}`}>Items</h2>

          {items?.length > 0 ? (
            <div
              className={`d-flex flex-wrap align-items-sm-center  flex-grow-1 gap-lg-4 gap-2`}
            >
              {items.map((item) => (
                <ProductCard key={item?.id} productData={item} />
              ))}
            </div>
          ) : (
            <div>
              Not found any item in {itemParent ? `=>${itemParent}` : ""}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
