import Image from 'next/image';
import styles from './WatchCard.module.css';
import { useRouter } from 'next/router';

const WatchCard = ({ image, name, date, buyNowPrice, bidPrice, onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/product');
    }
  };

  return (
    <div className={styles.watchCard} onClick={handlePress}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.watchCardContent}>
        <h3 className={styles.watchName}>{name}</h3>
        <p className={styles.date}>{date}</p>
        <div className={styles.priceContainer}>
          <div className={styles.buyNowPrice}>
            <span className={styles.buyNow}>Buy Now</span>
          </div>
          <div className={styles.bidPrice}>
            <span className={styles.buyPrice}>${buyNowPrice?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
