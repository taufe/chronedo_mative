import React from 'react';
import Image from 'next/image';
import { BsArrowRight } from "react-icons/bs";
import styles from './CategoryCarousel.module.css';

const CategoryCarousel = () => {
    const categories = [
        { title: "Men's Watches", image: "/assets/images/gold-watches.jpg" },
        { title: "Women's Watches", image: "/assets/images/diamond-watches.jpg" },
        { title: "Gold Watches", image: "/assets/images/gold-watches.jpg" },
        { title: "Diamond Watches", image: "/assets/images/diamond-watches.jpg" },
        { title: "Luxury Watches", image: "/assets/images/gold-watches.jpg" },
        { title: "Sport Watches", image: "/assets/images/diamond-watches.jpg" },
        { title: "Classic Watches", image: "/assets/images/gold-watches.jpg" },
        { title: "Smart Watches", image: "/assets/images/diamond-watches.jpg" },
    ];

    const handleScroll = (direction) => {
        const container = document.querySelector(`.${styles.categoryGrid}`);
        if (container) {
            const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.categories}>
            <div className={styles.categoriesContainer}>
                <h2>Categories</h2>
                <div className={styles.categoriesHeader}>
                    <p>Lorem Ipsum is simply dummy text of the<br /> printing and typesetting industry</p>
                    <div className={styles.navigationArrows}>
                        <button 
                            type="button"
                            className={styles.arrowLeft}
                            onClick={() => handleScroll('left')}
                        >
                            <Image src="/assets/icons/leftArrow.png" alt="Left Arrow" width={17} height={10} />
                        </button>
                        <button 
                            type="button"
                            className={styles.arrowRight}
                            onClick={() => handleScroll('right')}
                        >
                            <Image src="/assets/icons/rightArrow.png" alt="Right Arrow" width={17} height={10} />
                        </button>
                    </div>
                </div>
                <div className={styles.categoryGrid}>
                    {categories.map((category, index) => (
                        <div key={index} className={styles.categoryCard}>
                            <div className={styles.categoryImageWrapper}>
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.textButtonWrapper}>
                                    <h3 className={styles.title}>{category.title}</h3>
                                    <button type="button" className={styles.seeAllBtn}>
                                        See All
                                        <BsArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCarousel; 