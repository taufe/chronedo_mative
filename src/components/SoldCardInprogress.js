import Image from "next/image";
import styles from "./SoldCardInprogress.module.css";
import { MySellingInProgressDetails } from "./MySellingInProgressDetails";

const SoldCardInprogress = ({
  image,
  name,
  price,
  date,
  email,
  sellerName,
  showDetails,
  onSellNow,
}) => {
  return (
    <div className={styles.fullContainer}>
      {showDetails ? (
        <MySellingInProgressDetails
          image={image}
          name={name}
          price={price}
          date={date}
          email={email}
          sellerName={sellerName}
          onBack={onBack}
        />
      ) : (
        <div className={styles.purchaseCard}>
          <div className={styles.mainContent}>
            <div className={styles.imageContainer}>
              <Image
                src={image}
                alt={name}
                width={120}
                height={120}
                className={styles.watchImage}
              />
            </div>
            <div className={styles.watchDetails}>
              <h3 className={styles.watchName}>{name}</h3>
              <div className={styles.statusContainer}>
                <Image
                  src="/assets/Home/inprogress.png"
                  alt="In-Progress"
                  width={20}
                  height={20}
                />
                <span className={styles.statusText}>In-Progress</span>
                <span className={styles.date}>{date}</span>
              </div>
              <div className={styles.price}>CHF {price.toLocaleString()}</div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sellerSection}>
            <div className={styles.sellerHeader}>
              Seller Details
              <Image
                src="/assets/icons/dropdown.png"
                alt="Dropdown"
                width={16}
                height={16}
              />
            </div>
            <div className={styles.sellerDetails}>
              <div className={styles.sellerInfo}>
                <span className={styles.label}>Email: </span>
                <span className={styles.value}>{email}</span>
              </div>
              <div className={styles.sellerInfo}>
                <span className={styles.label}>Name: </span>
                <span className={styles.value}>{sellerName}</span>
              </div>
            </div>
          </div>
          {/* <div className={styles.fullContainer}> */}
          {/* Existing card content */}
          <button
            className={styles.sellButton}
            onClick={onSellNow} // Remove the inline function here
          >
            Sell Now
          </button>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default SoldCardInprogress;
