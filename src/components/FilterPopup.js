import { useState } from 'react';
import styles from './FilterPopup.module.css';
import Image from 'next/image';
import axios from 'axios';

const FilterPopup = ({ isOpen, onClose, onApplyFilters }) => {
    console.log('apply filters in props',onApplyFilters)
    const [saveSearch, setSaveSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchData, setSearchData] = useState([]);
    console.log('search data---------',searchData)

    // Separate state variables for each filter category
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [priceRange, setPriceRange] = useState({ from: 0, to: 1000000 });
    const [gender, setGender] = useState('Men');
    const [searchValue, setSearchValue] = useState('');
    const [claspMaterial, setClaspMaterial] = useState('');
    const [braceletColor, setBraceletColor] = useState('');
    const [braceletMaterial, setBraceletMaterial] = useState('');
    const [crystal, setCrystal] = useState('');
    const [bezelMaterial, setBezelMaterial] = useState('');
    const [caseMaterial, setCaseMaterial] = useState('');
    const [diameter, setDiameter] = useState('');
    const [dialColor, setDialColor] = useState('');
    const [powerReserve, setPowerReserve] = useState('');
    const [movement, setMovement] = useState('');
    const [warrantyUntil, setWarrantyUntil] = useState('');
    const [manufacturerWarrantyUntil, setManufacturerWarrantyUntil] = useState('');
    const [condition, setCondition] = useState('');
    const [watchType, setWatchType] = useState('');
    const [currency, setCurrency] = useState('');
    const [listingType, setListingType] = useState('');

    const filterCategories = [
        'Brand',
        'Model',
        'Price',
        'Case Size',
        'Year',
        'Condition & Delivery Contents',
        'Seller and listing type',
        'Watch Type',
        'Dial',
        'Case',
        'Strap/Bracelet',
        'Clasp',
        'Other'
    ];

    const handleApplyFilters = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const filterParams = {
                brand,
                model,
                price: priceRange,
                gender,
                searchValue,
                clasp_material: claspMaterial,
                bracelet_color: braceletColor,
                bracelet_material: braceletMaterial,
                crystal,
                bezel_material: bezelMaterial,
                caseMaterial,
                diameter,
                dial_color: dialColor,
                power_reserve: powerReserve,
                movement,
                warranty_of_me_until: warrantyUntil,
                manufacturer_warranty_until: manufacturerWarrantyUntil,
                condition_name: condition,
                watch_type: watchType,
                currency,
                listing_type: listingType
            };

            console.log('Filter parameters:', filterParams);

            const response = await axios.post('/api/searchApi', filterParams);
            console.log('API response:', response.data);

            const filteredWatches = response.data.data.watches;
            setSearchData(filteredWatches);

            if (typeof onApplyFilters === 'function') {
                onApplyFilters(filteredWatches);
            }

            onClose();
        } catch (err) {
            setError(err.message || 'An error occurred while applying filters');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
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
                            {/* Render options based on selectedCategory */}
                            {selectedCategory === 'Brand' && (
                                <select
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">Select brand</option>
                                    <option value="ABP Paris">ABP Paris</option>
                                    <option value="Rolex">Rolex</option>
                                    <option value="Patek Philippe">Patek Philippe</option>
                                    <option value="Audemars Piguet">Audemars Piguet</option>
                                    <option value="A. Lange & Söhne">A. Lange & Söhne</option>
                                    <option value="Omega">Omega</option>
                                    <option value="Cartier">Cartier</option>
                                    <option value="IWC">IWC</option>
                                    <option value="Jaeger-LeCoultre">Jaeger-LeCoultre</option>
                                </select>
                            )}
                            {selectedCategory === 'Model' && (
                                <select
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                >
                                    <option value="">Select model</option>
                                    <option value="Daytona">Daytona</option>
                                    <option value="Submariner">Submariner</option>
                                    <option value="Nautilus">Nautilus</option>
                                    <option value="Royal Oak">Royal Oak</option>
                                    <option value="Speedmaster">Speedmaster</option>
                                    <option value="Tank">Tank</option>
                                    <option value="Portugieser">Portugieser</option>
                                </select>
                            )}
                            {selectedCategory === 'Price' && (
                                <div>
                                    <input
                                        type="number"
                                        value={priceRange.from}
                                        onChange={(e) => setPriceRange({ ...priceRange, from: e.target.value })}
                                        placeholder="From"
                                    />
                                    <input
                                        type="number"
                                        value={priceRange.to}
                                        onChange={(e) => setPriceRange({ ...priceRange, to: e.target.value })}
                                        placeholder="To"
                                    />
                                </div>
                            )}
                            {selectedCategory === 'Case Size' && (
                                <input
                                    type="text"
                                    value={diameter}
                                    onChange={(e) => setDiameter(e.target.value)}
                                    placeholder="Diameter"
                                />
                            )}
                            {selectedCategory === 'Year' && (
                                <input
                                    type="text"
                                    value={warrantyUntil}
                                    onChange={(e) => setWarrantyUntil(e.target.value)}
                                    placeholder="Warranty Until"
                                />
                            )}
                            {selectedCategory === 'Condition & Delivery Contents' && (
                                <select
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                >
                                    <option value="">Select condition</option>
                                    <option value="New">New</option>
                                    <option value="Pre-owned">Pre-owned</option>
                                    <option value="With Box">With Box</option>
                                    <option value="With Papers">With Papers</option>
                                </select>
                            )}
                            {selectedCategory === 'Seller and listing type' && (
                                <select
                                    value={listingType}
                                    onChange={(e) => setListingType(e.target.value)}
                                >
                                    <option value="">Select listing type</option>
                                    <option value="Private Seller">Private Seller</option>
                                    <option value="Dealer">Dealer</option>
                                    <option value="Auction">Auction</option>
                                </select>
                            )}
                            {selectedCategory === 'Watch Type' && (
                                <select
                                    value={watchType}
                                    onChange={(e) => setWatchType(e.target.value)}
                                >
                                    <option value="">Select watch type</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Quartz">Quartz</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            )}
                            {selectedCategory === 'Clasp' && (
                                <select
                                    value={claspMaterial}
                                    onChange={(e) => setClaspMaterial(e.target.value)}
                                >
                                    <option value="">Select clasp material</option>
                                    <option value="Buckle">Buckle</option>
                                    <option value="Folding">Folding</option>
                                    <option value="Deployant">Deployant</option>
                                </select>
                            )}
                            {selectedCategory === 'Strap/Bracelet' && (
                                <select
                                    value={braceletMaterial}
                                    onChange={(e) => setBraceletMaterial(e.target.value)}
                                >
                                    <option value="">Select bracelet material</option>
                                    <option value="Leather">Leather</option>
                                    <option value="Steel">Steel</option>
                                    <option value="Rubber">Rubber</option>
                                    <option value="NATO">NATO</option>
                                </select>
                            )}
                            {selectedCategory === 'Dial' && (
                                <select
                                    value={dialColor}
                                    onChange={(e) => setDialColor(e.target.value)}
                                >
                                    <option value="">Select dial color</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Green">Green</option>
                                    <option value="Silver">Silver</option>
                                </select>
                            )}
                            {selectedCategory === 'Case' && (
                                <select
                                    value={caseMaterial}
                                    onChange={(e) => setCaseMaterial(e.target.value)}
                                >
                                    <option value="">Select case material</option>
                                    <option value="Steel">Steel</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Titanium">Titanium</option>
                                    <option value="Ceramic">Ceramic</option>
                                </select>
                            )}
                            {selectedCategory === 'Other' && (
                                <input
                                    type="text"
                                    value={powerReserve}
                                    onChange={(e) => setPowerReserve(e.target.value)}
                                    placeholder="Power Reserve"
                                />
                            )}
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
                    <button className={styles.applyButton} onClick={handleApplyFilters}>
                        Apply filter(s)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup; 