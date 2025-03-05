import Head from "next/head";
import Image from "next/image";
import WatchCard from "../components/WatchCard";
import BrandWatch from "../components/BrandWatch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FilterPopup from "../components/FilterPopup";
import styles from "./index.module.css";
const Home = () => {
  const watches = [
    {
      image: "/assets/watches/rolexDatejust.png",
      name: "Rolex Datejust Oyster 41mm",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/omegaSpeedmaster.png",
      name: "Omega Speedmaster",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/rolexDaydate.png",
      name: "Rolex Day-Date",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w1.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w2.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w3.jpeg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w4.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w5.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w6.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w7.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w8.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w9.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    // Add more watches as needed
  ];
  const newArrivals = [
    {
      image: "/assets/watches/rolexDatejust.png",
      name: "Rolex Datejust Oyster 41mm",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/omegaSpeedmaster.png",
      name: "Omega Speedmaster",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/rolexDaydate.png",
      name: "Rolex Day-Date",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w1.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w2.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w3.jpeg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w4.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w5.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w6.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w7.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w8.jpg",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/w9.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    {
      image: "/assets/watches/patekPhilippe.png",
      name: "Patek Philippe Nautilus",
      date: "24.10.2021, 19:35",
      buyNowPrice: 5000,
      bidPrice: 1001,
    },
    // Add more watches as needed
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
                    className={`${styles.filterButton} ${activeFilters.includes(filter) ? styles.active : ""
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

      {/* Categories Section */}
      <section className="categories">
        <div className="categories-container">
          <h2>Categories</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <p>
              Lorem Ipsum is simply dummy text of the
              <br /> printing and typesetting industry
            </p>
            <div className="navigation-arrows">
              <button className="arrow-left">
                <Image
                  src="/assets/icons/leftArrow.png"
                  alt="Left Arrow"
                  width={17}
                  height={10}
                />
              </button>
              <button className="arrow-right">
                <Image
                  src="/assets/icons/rightArrow.png"
                  alt="Right Arrow"
                  width={17}
                  height={10}
                />
              </button>
            </div>
          </div>

          <div className="category-grid">
            {[
              "Men's Watches",
              "Women's Watches",
              "Gold Watches",
              "Diamond Watches",
            ].map((category, index) => (
              <div key={index} className="category-card">
                <Image
                  src={`/assets/images/${category
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  alt={category}
                  width={300}
                  height={400}
                  objectFit="cover"
                />
                <h3>{category}</h3>
                <button className="see-all-btn">
                  See All{" "}
                  <Image
                    src="/assets/icons/rightArrowGolden.png"
                    alt="Right Arrow"
                    width={15}
                    height={8}
                    color="#A98754"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories popular-brands">
        <div className="categories-container">
          <h2>Popular Brands</h2>
          <div className="categories-header">
            <p>
              Lorem Ipsum is simply dummy text of the
              <br /> printing and typesetting industry
            </p>
            <div className="navigation-arrows">
              <button className="arrow-left">
                <Image
                  src="/assets/icons/leftArrow.png"
                  alt="Left Arrow"
                  width={17}
                  height={10}
                />
              </button>
              <button className="arrow-right">
                <Image
                  src="/assets/icons/rightArrow.png"
                  alt="Right Arrow"
                  width={17}
                  height={10}
                />
              </button>
            </div>
          </div>
          <div className="brand-watches-container">
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
            ].map((watch, index) => (
              <BrandWatch key={index} {...watch} />
            ))}
          </div>
        </div>
      </section>

      <section className="new-arrivals">
        <div className="categories-container">
          <h2>New Arrivals</h2>
          <div className="new-arrivals-header">
            <p>
              Lorem Ipsum is simply dummy text of the
              <br /> printing and typesetting industry
            </p>
            {/* <button className="see-all-btn">
              See All <Image src="/assets/icons/rightArrowGolden.png" alt="Right Arrow" width={15} height={8} />
            </button> */}
          </div>
          <div className="watch-grid">
            {newArrivals.map((watch, index) => (
              <WatchCard key={index} {...watch} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
