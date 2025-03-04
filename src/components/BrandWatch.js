import Image from 'next/image';
import styles from './BrandWatch.module.css';

const BrandWatch = ({ img, name }) => {
  return (
    <div className={styles.brandWatch}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={name} width={180} height={200} layout="fixed" />
      </div>
      <h3 className={styles.watchName}>
        <span className={styles.brandName}>{name.split(' ')[0]}</span>
        <span className={styles.modelName}>{name.split(' ').slice(1).join(' ')}</span>
      </h3>
    </div>
  );
};

export default BrandWatch;
