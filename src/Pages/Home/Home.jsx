import { useEffect, useState } from "react";
import Categories from "../../components/category/Categories";
import ProductCard from "../../components/product/ProductCard";
import styles from "./home.module.scss";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://grocerywatch.herokuapp.com/market/data/"
        );

        const data = await res.json();
        setCategories(data?.categories);
        setSelectedCategory(data?.categories[0]);
        setSelectedSubCategory(data?.categories[0]?.sub_category[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  let items = null;
  let itemParent = null;

  if (selectedCategory && selectedSubCategory) {

   const ctgry = selectedCategory?.sub_category.find(
      (value) => value?.id === selectedSubCategory?.id
    );

    items = ctgry?.items;
    itemParent = ctgry?.name

  }

  const selectedCategoryHandler = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(category?.sub_category[0]);
  };

  const selectedSubCategoryHandler = (subcategory) => {
    setSelectedSubCategory(subcategory);
  };

  return (
    <>
      <section className={`${styles.categories_section}`}>
        <div className={`custom__container `}>
          <div>
            hi , here is my WhatsApp number and linkdin, 
            please contact me with WhatsApp or Linkedin it will better conversations platform:

            <p>
              whatsApp: +8801609084876
            </p>
<p>
  Linkedin: <a href="https://www.linkedin.com/in/mazharul-islam-5194a5204/" target="__blank"> Linkedin</a>
</p>

          </div>
          {/* category  */}
          <div className={`${styles.categories_wrapper}`}>
            <h2 className={`${styles.heading} `}>Categories</h2>
            <div className={`d-flex align-items-center gap-4`}>
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
            <div className={`d-flex align-items-center gap-4`}>
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
            <div className={`d-flex  align-items-center gap-5`}>
              {items.map((item) => (
                <ProductCard key={item?.id} productData={item} />
              ))}
            </div>
          ) : (
            <div>Not found any item in -&gt; {itemParent}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
