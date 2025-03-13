import Image from "next/image";
import styles from "./PurchasedCardInprogress.module.css";
import { PurchaseCardInprogressDetails } from "./PurChaseCardInProgressDetails";

const PurchasedCardInprogress = ({
  image,
  name,
  price,
  date,
  email,
  sellerName,
  onSellNow,
  showDetails,
  onBack,
  purchaseOrderId
}) => {
  console.log('checking purchase order id inprogress screen',purchaseOrderId)
  return (
    <div
      className={
        showDetails ? styles.fullContainerDetails : styles.fullContainer
      }
    >
      {" "}
      {showDetails ? (
        <PurchaseCardInprogressDetails
          image={image}
          name={name}
          price={price}
          date={date}
          email={email}
          sellerName={sellerName}
          onBack={onBack}
          purchaseOrderId={purchaseOrderId}
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

          <button
            className={styles.sellButton}
            onClick={() =>
              onSellNow({ image, name, price, date, email, sellerName,purchaseOrderId })
            }
          >
            Sell Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchasedCardInprogress;

// import Image from 'next/image';
// import styles from './PurchasedCardInprogress.module.css';
// import { useRouter } from 'next/router';

// const PurchasedCardInprogress = ({ image, name, price, date, email, sellerName }) => {
//     const router = useRouter();
//     return (
//         <div className={styles.purchaseCard}>
//             <div className={styles.mainContent}>
//                 <div className={styles.imageContainer}>
//                     <Image
//                         src={image}
//                         alt={name}
//                         width={120}
//                         height={120}
//                         className={styles.watchImage}
//                     />
//                 </div>
//                 <div className={styles.watchDetails}>
//                     <h3 className={styles.watchName}>{name}</h3>
//                     <div className={styles.statusContainer}>
//                         <Image
//                             src="/assets/Home/inprogress.png"
//                             alt="In-Progress"
//                             width={20}
//                             height={20}
//                         />
//                         <span className={styles.statusText}>In-Progress</span>
//                         <span className={styles.date}>{date}</span>
//                     </div>
//                     <div className={styles.price}>CHF {price.toLocaleString()}</div>
//                 </div>
//             </div>

//             <div className={styles.divider}></div>

//             <div className={styles.sellerSection}>
//                 <div className={styles.sellerHeader}>
//                     Seller Details
//                     <Image
//                         src="/assets/icons/dropdown.png"
//                         alt="Dropdown"
//                         width={16}
//                         height={16}
//                     />
//                 </div>
//                 <div className={styles.sellerDetails}>
//                     <div className={styles.sellerInfo}>
//                         <span className={styles.label}>Email: </span>
//                         <span className={styles.value}>{email}</span>
//                     </div>
//                     <div className={styles.sellerInfo}>
//                         <span className={styles.label}>Name: </span>
//                         <span className={styles.value}>{sellerName}</span>
//                     </div>
//                 </div>
//             </div>

//             <button  className={styles.sellButton}>Sell Now</button>
//         </div>
//     );
// };

// export default PurchasedCardInprogress;
