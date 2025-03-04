import Image from 'next/image';
import styles from './WatchCardMyPromotings.module.css';
import { FaTag, FaMapMarkerAlt, FaBullhorn, FaCopy } from 'react-icons/fa';

const WatchCardMyPromotings = ({ image, name, price, location, promoterCount, sellerCode, onPress, sold, active }) => {
  return (
    <div className={styles.watchCard} onClick={onPress}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
        {/* {sold && (
          <div className={styles.tagOverlay}>
            <Image 
              src="/assets/images/soldtag.png" 
              alt="Sold"
              width={60}
              height={60}
              className={styles.tagImage}
              priority
            />
          </div>
        )}
        {!sold && active && (
          <div className={styles.tagOverlay}>
            <Image 
              src="/assets/images/inactiveTag.png" 
              alt="Inactive"
              width={60}
              height={60}
              className={styles.tagImage}
              priority
            />
          </div>
        )} */}
         {/* <div className={styles.tagOverlay}>
            <Image 
              src="/assets/images/soldTag.png" 
              alt="Sold"
              width={60}
              height={60}
              className={styles.tagImage}
              priority
            />
          </div> */}
          <div className={styles.tagOverlay}>
            <Image 
              src="/assets/images/inactiveTag.png" 
              alt="Inactive"
              width={60}
              height={60}
              className={styles.tagImage}
              priority
            />
          </div>
      </div>
      <div className={styles.watchCardContent}>
        <h3>{name}</h3>
        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <FaTag className={styles.infoIcon} />
            <span>${price?.toLocaleString()}</span>
          </div>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.infoIcon} />
            <span>{location}</span>
          </div>
          <div className={styles.infoItem}>
            <FaBullhorn className={styles.infoIcon} />
            <span>{promoterCount} other promoters</span>
          </div>
        </div>
        <div className={styles.sellerCode}>
          <span>CODE: </span>
          <span className={styles.codeValue}>{sellerCode}</span>
          <button className={styles.copyButton} onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(sellerCode);
          }}>
            <FaCopy className={styles.infoIcon}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchCardMyPromotings;
