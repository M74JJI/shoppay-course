import styles from "../filters.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useState } from "react";
export default function PriceSort() {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.browse__store_filters1}>
      <div className={styles.browse__filters1_price}>
        <span>Price :</span>
        <input type="number" placeholder="min" min="0" />
        <input type="number" placeholder="max" min="0" />
      </div>
      <div className={styles.price__btns}>
        <Tooltip
          title={<h2>Check out products under 10$</h2>}
          placement="top"
          arrow
        >
          <button>
            <div className={styles.price__btns_info}></div>
            <span style={{ height: "10%" }}></span>
          </button>
        </Tooltip>

        <Tooltip
          title={<h2>Check out products between 10$ and 50$</h2>}
          placement="top"
          arrow
        >
          <button>
            <span></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 10$ and 100$</h2>}
          placement="top"
          arrow
        >
          <button>
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out productsbetween 100$ and 500$</h2>}
          placement="top"
          arrow
        >
          <button>
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products for more than 500$</h2>}
          placement="top"
          arrow
        >
          <button>
            <div className={styles.price__btn_info}></div>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>

      <div className={styles.browse__filters1_shipping}>
        <input type="checkbox" name="shipping" id="shipping" />
        <label htmlFor="shipping">Free Shipping</label>
      </div>
      <div className={styles.browse__filters1_rating}>
        <input type="checkbox" name="rating" id="rating" />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiOutlineStar />& up
        </label>
      </div>
      <div className={styles.browse__filters1_sort}>
        <div className={styles.browse__filters1_price}></div>
        <span>Sort by</span>
        <div className={styles.browse__filters1_sort_list}>
          <button
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            Recommend
            <div
              style={{
                transform: `${show ? "rotate(180deg)" : "rotate(-180deg)"}`,
              }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
            onMouseOver={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <li>
              <Link href="">
                <b>
                  Recommend <BsCheckLg />
                </b>
              </Link>
            </li>
            <li>
              <Link href="">Most Popular</Link>
            </li>
            <li>
              <Link href="">New Arrivals</Link>
            </li>
            <li>
              <Link href="">Top Reviewed</Link>
            </li>
            <li>
              <Link href="">Price (low to high)</Link>
            </li>
            <li>
              <Link href="">Price (high to low)</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
