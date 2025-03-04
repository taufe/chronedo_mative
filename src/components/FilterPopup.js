import { useState } from 'react';
import styles from './FilterPopup.module.css';
import Image from 'next/image';

const FilterPopup = ({ isOpen, onClose }) => {
    const [saveSearch, setSaveSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filterCategories = [
        'Brand',
        'Model',
        'Price',
        'Case Size',
        'Year',
        'Location',
        'Condition & Delivery Contents',
        'Seller and listing type',
        'Watch Type',
        'Reference Number',
        'Movement & Functions',
        'Dial',
        'Case',
        'Strap/Bracelet',
        'Clasp',
        'Other'
    ];

    // Mock data for category options
    const categoryOptions = {
        Brand: ['Rolex', 'Patek Philippe', 'Audemars Piguet', 'A. Lange & Söhne', 'Omega', 'Cartier', 'IWC', 'Jaeger-LeCoultre'],
        Model: ['Daytona', 'Submariner', 'Nautilus', 'Royal Oak', 'Speedmaster', 'Tank', 'Portugieser'],
        Price: ['0-5,000', '5,000-10,000', '10,000-25,000', '25,000-50,000', '50,000+'],
        'Case Size': ['< 30mm', '30-35mm', '36-39mm', '40-42mm', '> 42mm'],
        Year: ['2023', '2022', '2021', '2020', '2019', '2018', '2017'],
        Location: ['USA', 'Germany', 'Switzerland', 'Japan', 'UK', 'France'],
        'Condition & Delivery Contents': ['New', 'Pre-owned', 'With Box', 'With Papers'],
        'Seller and listing type': ['Private Seller', 'Dealer', 'Auction'],
        'Watch Type': ['Automatic', 'Quartz', 'Manual'],
        'Reference Number': ['Ref. 12345', 'Ref. 67890', 'Ref. 11223'],
        'Movement & Functions': ['Chronograph', 'Date', 'GMT', 'Moonphase'],
        Dial: ['Black', 'White', 'Blue', 'Green', 'Silver'],
        Case: ['Steel', 'Gold', 'Titanium', 'Ceramic'],
        'Strap/Bracelet': ['Leather', 'Steel', 'Rubber', 'NATO'],
        Clasp: ['Buckle', 'Folding', 'Deployant'],
        Other: ['Limited Edition', 'Vintage', 'Diver', 'Pilot']
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    <Image
                        src="/assets/icons/cross.png"
                        alt="Close"
                        width={24}
                        height={24}
                    />
                </button>

                <div className={styles.filterContainer}>
                    {/* Left side - Categories */}
                    <div className={styles.categoriesList}>
                        {filterCategories.map((category, index) => (
                            <div
                                key={index}
                                className={`${styles.filterItem} ${selectedCategory === category ? styles.selected : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>

                    {/* Right side - Options */}
                    {selectedCategory && (
                        <div className={styles.optionsList}>
                            {categoryOptions[selectedCategory]?.map((option, index) => (
                                <label key={index} className={styles.optionItem}>
                                    <input type="checkbox" />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.saveSearch}>
                        <input
                            type="checkbox"
                            id="saveSearch"
                            checked={saveSearch}
                            onChange={(e) => setSaveSearch(e.target.checked)}
                        />
                        <label htmlFor="saveSearch">Save search</label>
                    </div>
                    <button className={styles.applyButton}>
                        Apply filter(s)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup; 