import Footer from "../../components/footer";
import ProductCard from "../../components/ProductCard";
import styles from "./browse.module.scss";
import CategoryFilter from "../../components/filters/category";
import SizesFilter from "../../components/filters/sizes";
import ColorsFilter from "../../components/filters/colors";
import Header from "../../components/header";
import Style from "../../components/filters/style";
import Brands from "../../components/filters/brands";
import GenderFilter from "../../components/filters/gender";
import Link from "next/link";
import PriceSort from "../../components/filters/priceSort";
import BackToTop from "../../components/backToTop";
import db from "../../utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Patterns from "../../components/filters/patterns";
import Materials from "../../components/filters/materials";
export default function Browse({
  country,
  products,
  categories,
  subCategories,
  colors,
  brands,
  sizes,
  stylesData,
  patterns,
  materials,
}) {
  const router = useRouter();

  const header = useRef(null);
  const menu = useRef(null);
  const store = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    setHeaderHeight(header.current.clientHeight);
    setMenuHeight(menu.current.clientHeight);
    setHeight(store.current.clientHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.browse}>
      <BackToTop />
      <div ref={header}>
        <Header country="" />
      </div>
      <div className={styles.browse__container}>
        <div className={styles.browse__path} ref={menu}>
          Home / Browse / <span>Men Picks</span>
        </div>
        <div className={styles.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id}>
              <a>{c.name}</a>
            </Link>
          ))}
        </div>
        <div
          className={`${styles.browse__store} ${
            scrollPosition >= headerHeight + menuHeight + 80 &&
            {
              /*scrollPosition <= headerHeight + menuHeight + 80 + height + 50000
              ? styles.fixedStore
              : "" */
            }
          }`}
        >
          <div
            className={`${styles.browse__store_filters} ${styles.scrollbar} `}
          >
            <button className={styles.clearBtn}>Clear All (3)</button>
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
            />
            <SizesFilter sizes={sizes} />
            <ColorsFilter colors={colors} />
            <Brands brands={brands} />
            <Style data={stylesData} />
            <Patterns patterns={patterns} />
            <Materials materials={materials} />
            <GenderFilter />
          </div>
          <div className={styles.browse__store_products_wrap} ref={store}>
            <PriceSort />
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*
      <Footer country="" />
*/}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const search = query.search || "";
  const category = query.ctg || "";
  const style = query.style || "";
  const brand = query.brand || "";
  const color = query.color || "";
  await db.connectDb();
  //-----------------------------------------

  //-----------------------------------------
  const productsDb = await Product.find({
    /*
    name: {
      $regex: search,
      $options: "i",
    },
    description: {
      $regex: search,
      $options: "i",
    },
    "details.value": {
      $regex: style,
      $options: "i",
    },
    "subProducts.color.color": {
      $regex: color,
      $options: "i",
    },
    brand: {
      $regex: brand,
      $options: "i",
    },
 */
  })
    .sort({ createdAt: -1 })
    .lean();
  const products = [...productsDb].sort(() => 0.5 - Math.random());
  const categories = await Category.find({}).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .lean();
  const colors = await Product.find({}).distinct("subProducts.color.color");
  const brandsDb = await Product.find({}).distinct("brand");
  const sizes = await Product.find({}).distinct("subProducts.sizes.size");
  const details = await Product.find({}).distinct("details");
  let stylesDb = details
    .filter((item) => item.name == "Style")
    .map((s) => {
      return s.value;
    });
  let patternsDb = details
    .filter((item) => item.name == "Pattern Type")
    .map((s) => {
      return s.value;
    });
  let materialsDb = details
    .filter((item) => item.name == "Material")
    .map((s) => {
      return s.value;
    });
  let brands = [...new Set(brandsDb)];
  let styles = [...new Set(stylesDb)];
  let patterns = [...new Set(patternsDb)];
  let materials = [...new Set(materialsDb)];
  //-----------------------------------
  //-----------------------------------
  //-----------------------------------
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      colors,
      brands: [...brands].sort(() => 0.5 - Math.random()),
      sizes,
      materials,
      stylesData: JSON.parse(JSON.stringify(styles)),
      patterns: JSON.parse(JSON.stringify(patterns)),
      country: { name: "", image: "" },
    },
  };
}
