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

  // Truncate name if it's too long
  const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Check if we have a valid name
  const hasName = name && name.trim() !== '';

  return (
    <div className={styles.watchCard} onClick={handlePress}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name || 'Watch'} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.watchCardContent}>
        {hasName ? (
          <h3 className={styles.watchName} title={name}>{truncateText(name)}</h3>
        ) : (
          <div className={styles.emptyTitle}></div>
        )}
        {date ? (
          <p className={styles.date}>{date}</p>
        ) : (
          <div className={styles.emptyDate}></div>
        )}
        <div className={styles.priceContainer}>
          <div className={styles.buyNowPrice}>
            <span className={styles.buyNow}>Buy Now</span>
          </div>
          <div className={styles.bidPrice}>
            <span className={styles.buyPrice}>${buyNowPrice?.toLocaleString() || '0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCard;
