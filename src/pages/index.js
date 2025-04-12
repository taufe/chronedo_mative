import Head from "next/head";
import Image from "next/image";
import WatchCard from "../components/WatchCard";
import BrandWatch from "../components/BrandWatch";
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useRouter } from "next/router";
import FilterPopup from "../components/FilterPopup";
import styles from "./index.module.css";
import  NewArrivalWatch  from "../components/NewArrivalWatch";

// Define PopularBrands component outside of Home
const PopularBrands = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(scrollPosition - containerRef.current.clientWidth, 0);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const newPosition = Math.min(scrollPosition + containerRef.current.clientWidth, maxScroll);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  return (
   <>
    <section className="categories popular-brands">
      <div className="categories-container">
        <h2>Popular Brands</h2>
        <div className="categories-header">
          <p>
            Lorem Ipsum is simply dummy text of the
            <br /> printing and typesetting industry
          </p>
          <div className="navigation-arrows">
            <button 
              className="arrow-left" 
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
            >
              <Image
                src="/assets/icons/leftArrow.png"
                alt="Left Arrow"
                width={17}
                height={10}
              />
            </button>
            <button 
              className="arrow-right" 
              onClick={scrollRight}
              disabled={scrollPosition >= maxScroll}
            >
              <Image
                src="/assets/icons/rightArrow.png"
                alt="Right Arrow"
                width={17}
                height={10}
              />
            </button>
          </div>
        </div>
        <div 
          className="brand-watches-container" 
          ref={containerRef}
          style={{
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            width: '100%'
          }}
        >
          {[
            {
              img: "/assets/watches/rolexDatejust.png",
              name: "Rolex Datejust",
            },
            {
              img: "/assets/watches/omegaSpeedmaster.png",
              name: "Omega Speedmaster",
            },
            {
              img: "/assets/watches/rolexDaydate.png",
              name: "Rolex Day-date",
            },
            {
              img: "/assets/watches/patekPhilippe.png",
              name: "PatekPhilippe Nautilus",
            },
            {
              img: "/assets/watches/patekPhilippe.png",
              name: "PatekPhilippe Nautilus",
            },
            {
              img: "/assets/watches/patekPhilippe.png",
              name: "PatekPhilippe Nautilus",
            },
            {
              img: "/assets/watches/patekPhilippe.png",
              name: "PatekPhilippe Nautilus",
            },
          ].map((watch, index) => (
            <BrandWatch key={index} {...watch} />
          ))}
        </div>
      </div>
    </section>
   </>
  );
};

const CategoryCard = ({ image, title }) => {
  return (
    <div className="category-card">
      <Image
        src={image}
        alt={title}
        width={300}
        height={400}
        style={{ alignSelf: 'center', objectFit: 'cover' }}
      />

      {/* Split title by space and add line breaks dynamically */}
      <h3 className="titleofBreakLine">
        {title.split(' ').map((word, index) => (
          <React.Fragment key={index}>
            {word}
            <br />  {/* Add a line break after each word */}
          </React.Fragment>
        ))}
      </h3>

      <button className="see-all-btn">
        See All
        <Image
          src="/assets/icons/rightArrowGolden.png"
          alt="Right Arrow"
          width={15}
          height={8}
          color="#A98754"
        />
      </button>
    </div>
  );
};



// Create a new Categories component
const Categories = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(scrollPosition - containerRef.current.clientWidth, 0);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const newPosition = Math.min(scrollPosition + containerRef.current.clientWidth, maxScroll);
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  // Add more category items for testing
  const categories = [
    { title: "Men's Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Women's Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Gold Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Diamond Watches", image: "/assets/images/diamond-watches.jpg" },
    { title: "Luxury Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Sport Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Classic Watches", image: "/assets/images/gold-watches.jpg" },
    { title: "Smart Watches", image: "/assets/images/diamond-watches.jpg" },
  ];

  return (
    <section className="categories">
      <div className="categories-container">
        <h2>Categories</h2>
        <div className="categories-header">
          <p>
            Lorem Ipsum is simply dummy text of the
            <br /> printing and typesetting industry
          </p>
          <div className="navigation-arrows">
            <button 
              className="arrow-left" 
              onClick={scrollLeft}
              disabled={scrollPosition === 0}
            >
              <Image
                src="/assets/icons/leftArrow.png"
                alt="Left Arrow"
                width={17}
                height={10}
              />
            </button>
            <button 
              className="arrow-right" 
              onClick={scrollRight}
              disabled={scrollPosition >= maxScroll}
            >
              <Image
                src="/assets/icons/rightArrow.png"
                alt="Right Arrow"
                width={17}
                height={10}
              />
            </button>
          </div>
        </div>
        <div 
  className="category-grid" 
  ref={containerRef}
  style={{
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    gap: '20px',
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
  }}
>
{categories.map((category, index) => (
  <div 
    key={index} 
    style={{ 
      flex: '0 0 25%', 
      minWidth: '25%', 
      display: 'flex', 
      justifyContent: 'center' 
    }}
  >
    <CategoryCard {...category} />
  </div>
))}

</div>

      </div>
    </section>
  );
};

const Home = () => {
  const watches = [
    // Your watches data here
  ];

  const newArrivals = [
    // Your newArrivals data here
  ];

  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [filteredWatches, setFilteredWatches] = useState(watches);
  const [sortBy, setSortBy] = useState("lowPrice");
  const [activeFilters, setActiveFilters] = useState(["New"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (searchInput.length > 1) {
      setFilteredWatches(
        watches.filter((watch) =>
          watch.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilteredWatches(watches);
    }
  }, [searchInput, watches]);

  const handleFilterClick = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const sortWatches = (watches) => {
    switch (sortBy) {
      case "lowPrice":
        return [...watches].sort((a, b) => a.buyNowPrice - b.buyNowPrice);
      case "highPrice":
        return [...watches].sort((a, b) => b.buyNowPrice - a.buyNowPrice);
      default:
        return watches;
    }
  };

  return (
    <>
      <Head>
        <title>Home - Chronedo</title>
        <meta
          name="description"
          content="Get in touch with us for inquiries about watches."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="hero">
        <div
          className="hero-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="hero-content">
            <h1
              style={{
                fontFamily: "Poppins",
                fontWeight: 700,
              }}
            >
              Discover. Sell. Elevate. <br />
              Luxury Watches at Chronedo
            </h1>
            <p>
              At Chronedo, we make buying and selling luxury watches effortless.
              Discover iconic timepieces, sell with ease, and elevate your
              experience in a trusted marketplace.
            </p>
            <div className="hero-image hero-image-2">
              <Image
                src={"/assets/images/heroImg2.png"}
                alt="Luxury Watches"
                width={250}
                height={150}
              />
            </div>
            {/* Search Bar */}
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                
              />
              <div className={styles.searchIcon}>
                <Image
                  src="/assets/icons/searchIcon.png"
                  alt="Search"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            {/* Filter Tags */}
            <div className={styles.filterSection}>
              <div className={styles.filterButtons}>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className={styles.filterIcon}
                >
                  <Image
                    src="/assets/icons/filter.png"
                    alt="Filter"
                    width={20}
                    height={20}
                  />
                  Filter
                </button>
                {["Used", "New", "Datejust", "Europe"].map((filter) => (
                  <button
                    key={filter}
                    className={`${styles.filterButton} ${
                      activeFilters.includes(filter) ? styles.active : ""
                    }`}
                    onClick={() => handleFilterClick(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className={styles.sortDropdown}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="lowPrice">Low Price</option>
                  <option value="highPrice">High Price</option>
                </select>
              </div>
            </div>

            <FilterPopup
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
          <div className="hero-image hero-image-1">
            <Image
              src={"/assets/images/heroImg1.png"}
              alt="Luxury Watches"
              width={400}
              height={400}
              layout="responsive"
            />
          </div>
        </div>
      </section>

      {/* Add the filtered watches grid */}
      {searchInput.length > 1 && (
        <section className={styles.searchResults}>
          <div className={styles.watchesGrid}>
            {sortWatches(filteredWatches).map((watch, index) => (
              <WatchCard
                key={index}
                image={watch.image}
                name={watch.name}
                date={watch.date}
                buyNowPrice={watch.buyNowPrice}
                bidPrice={watch.bidPrice}
              />
            ))}
          </div>
        </section>
      )}

      <Categories />
      <PopularBrands />

      <section className="new-arrivals">
        <div className="categories-container">
          <h2>New Arrivals</h2>
          <div className="new-arrivals-header">
            <p>
              Lorem Ipsum is simply dummy text of the
              <br /> printing and typesetting industry
            </p>
          </div>
          <div className="watch-grid">
            {/* {newArrivals.map((watch, index) => (
              <WatchCard key={index} {...watch} />
            ))} */}
           
          </div>
        </div>
      </section>
      <NewArrivalWatch />
    </>
  );
};

export default Home;