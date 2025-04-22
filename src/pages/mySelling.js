import DashboardLayout from "../components/Layout/DashboardLayout";
import Image from "next/image";
import styles from "./mySelling.module.css";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import SoldCardPending from "../components/SoldCardPending";
import SoldCardInprogress from "../components/SoldCardInprogress";
import SoldCardCompleted from "../components/SoldCardCompleted";
import { MySellingInProgressDetails } from "../components/MySellingInProgressDetails";
import MyOpenWatch from "../components/MyOpenWatch";
import MyEndedWatch from "../components/MyEndedWatch";
import axios from "axios";
import { useData } from "../context/contextApi";
import { currencyList } from "../components/currency";
import {braceletMaterialList} from "../components/bracelet"
import {claspMaterialList} from "../components/clasp"

const MySelling = () => {
  const [bottomTabIndex, setBottomTabIndex] = useState(1);
  const [newIndex, setNewIndex] = useState(0);
  const [detailsContentIndex, setDetailsContentIndex] = useState(0);
  const [selectedCertifications, setSelectedCertifications] = useState([
    "Display Back",
  ]);
  const [selectedClaspType, setSelectedClaspType] = useState("Buckle");
  const [selectedCaliberCerts, setSelectedCaliberCerts] = useState([
    "Genevian Seal",
  ]);
  const [selectedDialFormat, setSelectedDialFormat] =
    useState("Arabic Numerals");
  const [selectedFunctions, setSelectedFunctions] = useState([
    "Date",
    "Weekday",
  ]);
  const [manufacturerWarrantyType, setManufacturerWarrantyType] =
    useState("date"); // 'date' or 'years'
  const [sellerWarrantyType, setSellerWarrantyType] = useState("date"); // 'date' or 'years'
  const [noManufacturerWarranty, setNoManufacturerWarranty] = useState(false);
  const [noSellerWarranty, setNoSellerWarranty] = useState(true);
  const [selectedBox, setSelectedBox] = useState("Original Box");
  const [selectedPapers, setSelectedPapers] = useState([
    "Original Manual",
    "Original Warrranty Card",
  ]);
  const [selectedReactivation, setSelectedReactivation] = useState("none");
  const [isInstantStart, setIsInstantStart] = useState(true);
  const [isMaximumEnd, setIsMaximumEnd] = useState(true);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([
    "Bank payment",
  ]);
  const [selectedAvailability, setSelectedAvailability] = useState(
    "Ready for delivery in 3-5 workdays"
  );
  const [selectedDelivery, setSelectedDelivery] = useState(
    "Mandatory: Shipping domestic"
  );
  const [selectedBoosterLevel, setSelectedBoosterLevel] = useState("Level 1");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [sellingStatus, setSellingStatus] = useState("pending");
  const [selectedCard, setSelectedCard] = useState(null);
  const [endedWatches, setEndedWatches] = useState([]);
  const [selectedSaleDetails, setSelectedSaleDetails] = useState(null);

  const [soldData, setSoldData] = useState([]);
  const [pendingSales, setPendingSales] = useState([]);
  const [inProgressSales, setInProgressSales] = useState([]);
  const [completedSales, setCompletedSales] = useState([]);
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {token} = useData()
  console.log('token cheking page',token)

  // Form states with initial values
  const [refNumber, setRefNumber] = useState("");
  const [type, setType] = useState("Wrist watch");
  const [gender, setGender] = useState("Men/Unisex");
  const [brand, setBrand] = useState("Rolex");
  const [model, setModel] = useState("");
  const [nickname, setNickname] = useState("");
  const [listingTitle, setListingTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [movement, setMovement] = useState("Automatic");
  const [age, setAge] = useState("2016");
  const [unknown, setUnknown] = useState(false);
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [caseMaterial, setCaseMaterial] = useState("");
  const [bezelMaterial, setBezelMaterial] = useState("");
  const [crystal, setCrystal] = useState("");
  const [braceletMaterial, setBraceletMaterial] = useState("");
  const [claspMaterial, setClaspMaterial] = useState("");
  const [caliber, setCaliber] = useState("");
  const [powerReserve, setPowerReserve] = useState("");
  const [dialColor, setDialColor] = useState("");
  const [condition, setCondition] = useState("");
  const [warrantyUntil, setWarrantyUntil] = useState("");
  const [noWarranty, setNoWarranty] = useState(false);
  const [warrantyOfMeUntil, setWarrantyOfMeUntil] = useState("");
  const [noWarrantyFromSeller, setNoWarrantyFromSeller] = useState(true);
  const [description, setDescription] = useState("");
  const [descriptionScope, setDescriptionScope] = useState("");
  const [currency, setCurrency] = useState("CHF");
  const [fixedPrice, setFixedPrice] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [salesCommissionAmount, setSalesCommissionAmount] = useState(0);
  const [promotable, setPromotable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [ingestionDate, setIngestionDate] = useState('');
  const [ingestionTime, setIngestionTime] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(1);
  const [orderStatus, setOrderStatus] = useState(1);

  // Image states
  const [cover, setCover] = useState(null);
  const [back, setBack] = useState(null);
  const [side1, setSide1] = useState(null);
  const [side2, setSide2] = useState(null);
  const [wristShot, setWristShot] = useState(null);
  const [defects, setDefects] = useState(null);
  const [more1, setMore1] = useState(null);
  const [more2, setMore2] = useState(null);
  const [boxOutside, setBoxOutside] = useState(null);
  const [boxInside, setBoxInside] = useState(null);
  const [papersImg, setPapersImg] = useState(null);
  const [more3, setMore3] = useState(null);
  const [more4, setMore4] = useState(null);
  const [more5, setMore5] = useState(null);

  // Dropdown options
  const watchTypes = [
    'Wrist watch',
    'Pocket Watch',
    'Other',
    ];
  const genders = [
    'Men',
    'Women',
    'Unisex',
    ];;
  const brands = ["Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Tag Heuer"];
  const movements = [
    'Automatic',
    'Manual Binding',
    'Quartz',
    ];
    
  const years = Array.from({length: 30}, (_, i) => (2023 - i).toString());
  const caseMaterials =  [
    'Aluminium',
    'Bronze',
    'Carbon',
    'Yellow Gold',
    'Bicolor (Gold/Steel)',
    'Ceramic',
    'Plastic Kunststoff',
    'Palladium',
    'Platinum',
    'Pink Gold',
    'Red Gold',
    'Silver',
    'Steel',
    'Tantalum',
    'Titanium',
    'White Gold',
    'Tungsten',
    ];
  const bezelMaterials =  [
    'Aluminium',
    'Bronze',
    'Carbon',
    'Yellow Gold',
    'Bicolor (Gold/Steel)',
    'Ceramic',
    'Plastic',
    'Palladium',
    'Platinum',
    'Pink Gold',
    'Red Gold',
    'Silver',
    'Steel',
    'Tantalum',
    'Titanium',
    'White Gold',
    'Tungsten',
    ];
  const crystals = [
    'Glass',
    'Plastic',
    'Mineral Glass',
    'Plexi Glass',
    'Sapphire Glass',
    ];
  const braceletMaterials = ["Stainless Steel", "Leather", "Rubber", "Gold", "Nylon"];
  const claspMaterials = ["Stainless Steel", "Gold", "Titanium"];
  const dialColors = [
    'Beige',
    'Blue',
    'Bordeaux',
    'Brown',
    'Bronze',
    'Yellow',
    'Gold',
    'Bicolor (Gold/Steel)',
    'Gery',
    'Green',
    'Orange',
    'Pink',
    'Red',
    'Black',
    'Silver',
    'Solid Silver',
    'Transparent',
    'Steel',
    'Purple',
    'white',
    'Mother of Pearl'
    ];
   const conditionList = [
      'Used',
      'New/Original Packed',
      'New/Unworn',
      'New/See Description',
      'Broken',
      ];
  const currencies = ["CHF", "EUR", "USD", "GBP"];
  const reactivationOptions = ["none", "1 Mal", "2 Mal", "3 Mal", "4 Mal", "5 Mal"];
  const paymentMethods = ["Bank payment", "Cash payment upon collection", "Credit card", "PayPal"];
  const availabilityOptions = [
    "Instant ready for delivery",
    "Ready for delivery in 3-5 workdays",
    "Ready for delivery in 6-10 workdays"
  ];
  const deliveryOptions = [
    "Mandatory: Shipping domestic",
    "Pick up at my address"
  ];



  // Helper function to extract currency code
  const extractCurrencyCode = (currencyString) => {
    if (!currencyString) return "CHF";
    return currencyString.split(" ")[0];
  };

  // Handle image uploads
  const handleImageUpload = (e, setImageFunction) => {
    const file = e.target.files[0];
    if (file) {
      const previewData = {
        path: URL.createObjectURL(file),
        mime: file.type,
        file: file,
      };
  
      setImageFunction(previewData);
  
      console.log("Uploaded image data:", previewData);
    }
  };
  
  
  // Publish watch function
  const publishWatch = async () => {
    console.log("Sales Commission Amount:", salesCommissionAmount.toFixed(2));
    setLoader(true);
    console.log("Publishing watch");
  
    try {
      const formData = new FormData();
      console.log("FormData initialized");
  
      // Append all form data
      formData.append("reference_no", refNumber);
      formData.append("watch_type", type);
      formData.append("gender", gender);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("nickname", nickname);
      formData.append("listing_title", listingTitle);
      formData.append("subtitle", subtitle);
      formData.append("movement", movement);
      formData.append("age_year_of_sale", age);
      formData.append("unknown", unknown);
      formData.append("case_diameter", diameter);
      formData.append("case_height", height);
      formData.append("case_material", caseMaterial);
      formData.append("bezel_material", bezelMaterial);
      formData.append("crystal", crystal);
      formData.append("bracelet_material", braceletMaterial);
      formData.append("bracelet_color", "");
      formData.append("clasp_material", claspMaterial);
      formData.append("clasp_type", selectedClaspType);
      formData.append("movement_type", movement);
      formData.append("caliber", caliber);
      formData.append("power_reserve", powerReserve);
      formData.append("dial_color", dialColor);
      formData.append("dial_format", selectedDialFormat);
      formData.append("function_value", JSON.stringify(selectedFunctions));
      formData.append("condition_name", condition);
      formData.append("manufacturer_warranty_until", warrantyUntil);
      formData.append("manufacturer_years_after_sale", "1");
      formData.append("manufacturer_no_warranty", noWarranty);
      formData.append("warranty_of_me_until", warrantyOfMeUntil);
      formData.append("me_years_after_sale", "2");
      formData.append("me_no_warranty", noWarrantyFromSeller);
      formData.append("condition_description", description);
      formData.append("box", selectedBox);
      formData.append("scope_of_delivery_papers", selectedPapers.length > 0 ? "Yes" : "No");
      formData.append("scope_of_delivery_description", descriptionScope);
      formData.append("isAuction", "true");
      formData.append("currency", extractCurrencyCode(currency));
      formData.append("starting_price", startingPrice);
      formData.append("fixed_price", fixedPrice);
      formData.append("automatic_reactivation", selectedReactivation);
      formData.append("sales_commission", salesCommissionAmount.toFixed(2));

      // Append images
      if (cover) formData.append("cover", cover.file);
      if (back) formData.append("back", back.file);
      if (side1) formData.append("side1", side1.file);
      if (side2) formData.append("side2", side2.file);
      if (wristShot) formData.append("wrist_shot", wristShot.file);
      if (defects) formData.append("defect", defects.file);

      const response = await axios.post('/api/storeWatchApi', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Response of publish watch:", response.data);
  
      setNewIndex(0);
      setLoader(false);
      setModalVisible(true);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error while publishing watch:", error);
      setLoader(false);
    }
  };
  

  // Update the photo upload handler to use our new handleImageUpload
  const handlePhotoUpload = (e, id) => {
    console.log("Uploading photo for:", id);
  
    switch (id) {
      case "cover":
        handleImageUpload(e, setCover);
        break;
      case "back":
        handleImageUpload(e, setBack);
        break;
      case "wristshot":
        handleImageUpload(e, setWristShot);
        break;
      case "defects":
        handleImageUpload(e, setDefects);
        break;
      case "side1":
        handleImageUpload(e, setSide1);
        break;
      case "side2":
        handleImageUpload(e, setSide2);
        break;
      case "more1":
        handleImageUpload(e, setMore1);
        break;
      case "more2":
        handleImageUpload(e, setMore2);
        break;
      case "box-outside":
        handleImageUpload(e, setBoxOutside);
        break;
      case "box-inside":
        handleImageUpload(e, setBoxInside);
        break;
      case "papers":
        handleImageUpload(e, setPapersImg);
        break;
      case "more3":
        handleImageUpload(e, setMore3);
        break;
      case "more4":
        handleImageUpload(e, setMore4);
        break;
      case "more5":
        handleImageUpload(e, setMore5);
        break;
      default:
        console.warn("Unknown image ID:", id);
        break;
    }
  };

  setTimeout(() => {
    setLoading(false); 
  }, 2000); 

  const getSoldWatches = async () => {
    setLoading(true);
    const token = await localStorage.getItem('token')
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const url = `https://chronedo.webjerky.com/api/getSoldWatches`;
      const response = await axios.get(url, { headers });

      console.log("Response from getSoldWatches", response.data.data);
      setSoldData(response.data.data);

      // Filter data based on order_status
      const pending = response.data.data.filter(
        (sale) => sale.order_status === 0
      );
      console.log("Pending sales:", pending);
      const inProgress = response.data.data.filter(
        (sale) => sale.status === 1
      );
      const completed = response.data.data.filter(
        (sale) => sale.status === 2
      );

      setPendingSales(pending);
      setInProgressSales(inProgress);
      setCompletedSales(completed);
    } catch (error) {
      console.error("Error fetching sold watches:", error);
    } finally {
      setLoading(false);
    }
  };


const updateOrderStatus = async (orderId) => {
  console.log('Updating order ID:', orderId);

  const token = localStorage.getItem("token");
  const data = {
    id: orderId,
    order_status: status, 
    status: orderStatus,
    token: token
  };

  console.log("Sending data to API:", data);

  try {
    const response = await axios.post("/api/orderStatusApi", data);
    console.log("API Response:", response.data);

    if (response.data.success) {
      // Update your UI state accordingly
      setPendingSales(prev => prev.filter(sale => sale.id !== orderId));
      const updatedSale = soldData.find(sale => sale.id === orderId);
      updatedSale.order_status = 1;
      setInProgressSales(prev => [...prev, updatedSale]);

      console.log("Order status updated successfully");
    } else {
      console.error("Order update failed:", response.data.message);
    }
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
  }
};



  // Fetch ended watches data
  const fetchEndedWatches = async () => {
    const token = await localStorage.getItem('token')
    try {
      const response = await fetch(`https://chronedo.webjerky.com/api/getcloseWatches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setEndedWatches(data.data);
      } else {
        console.error("Unexpected API structure:", data);
      }
    } catch (error) {
      console.error("Error fetching watches:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch open watches data
  const fetchOpenWatches = async () => {
    const token = await localStorage.getItem('token')
    try {
      const response = await fetch(`https://chronedo.webjerky.com/api/getOpenWatches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setWatches(data.data);
      } else {
        console.error("Unexpected API structure:", data);
      }
    } catch (error) {
      console.error("Error fetching watches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSoldWatches();
    fetchEndedWatches();
    fetchOpenWatches();
  }, []);

  // const handleListingComplete = () => {
  // };

  const handleSellNow = (saleDetails) => {
    setSelectedSaleDetails(saleDetails);
    setSelectedCard(true);
  };

  const handleNewProduct = () => {
    setNewIndex(1);
    setSelectedBox("Original Box");
    setSelectedPapers([]);
    setSelectedPaymentMethods(["Bank payment"]);
    setSelectedAvailability("Ready for delivery in 3-5 workdays");
    setSelectedDelivery("Mandatory: Shipping domestic");
    setSelectedBoosterLevel("Level 1");
    setIsInstantStart(true);
    setIsMaximumEnd(true);
    setSelectedReactivation("none");
    setShowSuccessPopup(false);
    router.push("/dashboard");
  };

  const toggleCertification = (cert) => {
    setSelectedCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const toggleCaliberCert = (cert) => {
    setSelectedCaliberCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const toggleFunction = (func) => {
    setSelectedFunctions((prev) =>
      prev.includes(func) ? prev.filter((f) => f !== func) : [...prev, func]
    );
  };

  const togglePaper = (paper) => {
    setSelectedPapers((prev) =>
      prev.includes(paper) ? prev.filter((p) => p !== paper) : [...prev, paper]
    );
  };

  const togglePaymentMethod = (method) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  return (
    <DashboardLayout>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>
                <svg
                  className={styles.searchIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.iconsContainer}>
            <Image
              src="/assets/icons/notification.png"
              alt="Notifications"
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/cart.png"
              alt="Cart"
              width={24}
              height={24}
            />
            <Image
              src="/assets/icons/profile.png"
              alt="Profile"
              width={24}
              height={24}
            />
          </div>
        </div>

        <div className={styles.bottomTabBG}>
          <button
            onClick={() => setBottomTabIndex(1)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 1 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/new.png"
              alt="New"
              width={28}
              height={28}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>New</span>
          </button>
          <div
            className={`${styles.bottomTabLine} ${
              bottomTabIndex === 0 || bottomTabIndex === 4
                ? styles.activeLine
                : ""
            }`}
          />
          <button
            onClick={() => setBottomTabIndex(2)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 2 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/open.png"
              alt="Open"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Open</span>
          </button>
          <div
            className={`${styles.bottomTabLine} ${
              bottomTabIndex === 1 || bottomTabIndex === 3
                ? styles.activeLine
                : ""
            }`}
          />
          <button
            onClick={() => setBottomTabIndex(3)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 3 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/ended.png"
              alt="Ended"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Ended</span>
          </button>
          <div
            className={`${styles.bottomTabLine} ${
              bottomTabIndex === 2 || bottomTabIndex === 4
                ? styles.activeLine
                : ""
            }`}
          />
          <button
            onClick={() => setBottomTabIndex(4)}
            className={`${styles.bottomTabButton} ${
              bottomTabIndex === 4 ? styles.activeTab : ""
            }`}
          >
            <Image
              src="/assets/Home/sold.png"
              alt="Sold"
              width={32}
              height={32}
              className={styles.bottomTabImage}
            />
            <span className={styles.bottomTabText}>Sold</span>
          </button>
        </div>

        {bottomTabIndex === 1 && (
          <>
            {newIndex === 0 && (
              <div className={styles.listFreeContainer}>
                <h1 className={styles.listFreeTitle}>LIST FREE OF CHARGE</h1>
                <p className={styles.timeText}>You need 3 minutes!</p>

                <div className={styles.formContainer}>
                  <input
                    type="text"
                    placeholder="Reference number"
                    className={styles.referenceInput}
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                  />
                  <p className={styles.helperText}>
                    Start by entering the reference number.
                  </p>
                  <p className={styles.infoText}>
                    You can find the reference number in your watch documents,
                    e.g. on the warranty card of the watch.
                  </p>

                  <button
                    className={styles.nextButton}
                    onClick={() => setNewIndex(1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 1 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>1. Basic Data</h2>
                <p className={styles.mandatoryText}>3 open mandatory fields</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Type of Watch*</label>
                    <select 
                      className={styles.formSelect}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {watchTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Gender*</label>
                    <select 
                      className={styles.formSelect}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Reference number</label>
                    <input 
                      type="text" 
                      className={styles.formInput} 
                      value={refNumber}
                      onChange={(e) => setRefNumber(e.target.value)}
                      placeHolder={'Reference Number'}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Brand*</label>
                    <select 
                      className={styles.formSelect}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Modell*</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeHolder={'Daytona'}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Nickname</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeHolder={'White Panda 2017'}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Listing Title (automatically generated)</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={listingTitle}
                      onChange={(e) => setListingTitle(e.target.value)}
                      placeholder="Rolex Daytona White Panda 2017"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Subtitle</label>
                    <div className={styles.subtitleContainer}>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        style={{ width: '100%' }}
                        placeHolder={'subtitle'}
                      />
                      <span className={styles.charCount}>{subtitle.length}/30</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Movement*</label>
                    <select 
                      className={styles.formSelect}
                      value={movement}
                      onChange={(e) => setMovement(e.target.value)}
                    >
                      {movements.map((movement) => (
                        <option key={movement} value={movement}>{movement}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Age/year of sale to first owner</label>
                    <div className={styles.yearContainer}>
                      <select 
                        className={styles.yearSelect}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <label className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          checked={unknown}
                          onChange={(e) => setUnknown(e.target.checked)}
                          
                        /> unknown
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Diameter</label>
                    <div className={styles.diameterContainer}>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                        placeHolder={'41.5'}
                        style={{ width: '100%' }}
                      />
                      <span className={styles.unit}>mm</span>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(0)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(2)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 2 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>2. Details</h2>
                <p className={styles.mandatoryText}>
                  More details - More value!
                </p>

                <div className={styles.detailsContentNav}>
              
                  <button
                    className={`${styles.detailsNavButton} ${
                      detailsContentIndex === 1 ? styles.activeDetailsNav : ""
                    }`}
                    onClick={() => setDetailsContentIndex(1)}
                  >
                    <Image
                      src="/assets/WatchDetails/bracelet.png"
                      alt="Bracelet"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                    <span>Bracelet</span>
                  </button>
                  <button
                    className={`${styles.detailsNavButton} ${
                      detailsContentIndex === 2 ? styles.activeDetailsNav : ""
                    }`}
                    onClick={() => setDetailsContentIndex(2)}
                  >
                    <Image
                      src="/assets/WatchDetails/movement.png"
                      alt="Movement"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                    <span>Movement</span>
                  </button>
                  <button
                    className={`${styles.detailsNavButton} ${
                      detailsContentIndex === 3 ? styles.activeDetailsNav : ""
                    }`}
                    onClick={() => setDetailsContentIndex(3)}
                  >
                    <Image
                      src="/assets/WatchDetails/dial.png"
                      alt="Dial"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                    <span>Dial</span>
                  </button>
                  <button
                    className={`${styles.detailsNavButton} ${
                      detailsContentIndex === 4 ? styles.activeDetailsNav : ""
                    }`}
                    onClick={() => setDetailsContentIndex(4)}
                  >
                    <Image
                      src="/assets/WatchDetails/functions.png"
                      alt="Functions"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                    <span>Functions</span>
                  </button>
                </div>

                {detailsContentIndex === 0 && (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Diameter</label>
                        <div className={styles.diameterContainer}>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={diameter}
                            onChange={(e) => setDiameter(e.target.value)}
                            placeHolder={'41.5'}
                            style={{ width: '100%' }}
                          />
                          <span className={styles.unit}>mm</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Height</label>
                        <div className={styles.diameterContainer}>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeHolder='12.5'
                            style={{ width: '100%' }}
                          />
                          <span className={styles.unit}>mm</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Case Material</label>
                        <select 
                          className={styles.formSelect}
                          value={caseMaterial}
                          onChange={(e) => setCaseMaterial(e.target.value)}
                        >
                          <option value="">Please select</option>
                          {caseMaterials.map((material) => (
                            <option key={material} value={material}>{material}</option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Bezel material</label>
                        <select 
                          className={styles.formSelect}
                          value={bezelMaterial}
                          onChange={(e) => setBezelMaterial(e.target.value)}
                        >
                          <option value="">Please select</option>
                          {bezelMaterials.map((material) => (
                            <option key={material} value={material}>{material}</option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Crystal</label>
                        <select 
                          className={styles.formSelect}
                          value={crystal}
                          onChange={(e) => setCrystal(e.target.value)}
                        >
                          <option value="">Please select</option>
                          {crystals.map((crystal) => (
                            <option key={crystal} value={crystal}>{crystal}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.certificationsSection}>
                      <label>Certifications Select plant</label>
                      <div className={styles.certificationsButtons}>
                        <button
                          className={`${styles.certButton} ${
                            selectedCertifications.includes("Display Back")
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() => toggleCertification("Display Back")}
                        >
                          Display Back
                        </button>
                        <button
                          className={`${styles.certButton} ${
                            selectedCertifications.includes("PVD/DLC coating")
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() => toggleCertification("PVD/DLC coating")}
                        >
                          PVD/DLC coating
                        </button>
                        <button
                          className={`${styles.certButton} ${
                            selectedCertifications.includes(
                              "Gemstones and/or diamonds"
                            )
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() =>
                            toggleCertification("Gemstones and/or diamonds")
                          }
                        >
                          Gemstones and/or diamonds
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {detailsContentIndex == 1 && (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Clasp Material</label>
                        <select
                        className={styles.formSelect}
                        value={claspMaterial}
                        onChange={(e) => setClaspMaterial(e.target.value)}
                      >
                        <option value="">Please select</option>
                        {claspMaterialList?.map((claspMaterial, index) => (
                          <option key={index} value={claspMaterial}>
                            {claspMaterial}
                          </option>
                        ))}
                      </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Bracelet Material</label>
                        <select  
                        className={styles.formSelect}
                        value={braceletMaterial}
                        onChange={(e) => setBraceletMaterial(e.target.value)}
                      >
                        <option value="">Please select</option>
                        {braceletMaterialList?.map((material, index) => (
                          <option key={index} value={material}>
                            {material}
                          </option>
                        ))}
                      </select>
                      </div>
                    </div>

                    <div className={styles.claspTypeSection}>
                      <label>Clasp Type</label>
                      <div className={styles.claspTypeButtons}>
                        <button
                          className={`${styles.claspButton} ${
                            selectedClaspType === "Buckle"
                              ? styles.activeClaspType
                              : ""
                          }`}
                          onClick={() => setSelectedClaspType("Buckle")}
                        >
                          <Image
                            src="/assets/WatchDetails/buckle.png"
                            alt="Buckle"
                            width={60}
                            height={60}
                          />
                          <span>Buckle</span>
                        </button>
                        <button
                          className={`${styles.claspButton} ${
                            selectedClaspType === "Fold Clasp 1"
                              ? styles.activeClaspType
                              : ""
                          }`}
                          onClick={() => setSelectedClaspType("Fold Clasp 1")}
                        >
                          <Image
                            src="/assets/WatchDetails/foldClasp.png"
                            alt="Fold Clasp"
                            width={80}
                            height={60}
                            style={{ objectFit: "contain" }}
                          />
                          <span>Fold Clasp</span>
                        </button>
                        <button
                          className={`${styles.claspButton} ${
                            selectedClaspType === "Fold Clasp 2"
                              ? styles.activeClaspType
                              : ""
                          }`}
                          onClick={() => setSelectedClaspType("Fold Clasp 2")}
                        >
                          <Image
                            src="/assets/WatchDetails/foldClasp2.png"
                            alt="Fold Clasp"
                            width={80}
                            height={60}
                            style={{ objectFit: "contain" }}
                          />
                          <span>Fold Clasp</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {detailsContentIndex == 2 && (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Movement</label>
                        <select 
                      className={styles.formSelect}
                      value={movement}
                      onChange={(e) => setMovement(e.target.value)}
                    >
                      {movements.map((movement) => (
                        <option key={movement} value={movement}>{movement}</option>
                      ))}
                    </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Caliber</label>
                        <div className={styles.caliberContainer}>
                        <input
                        type="text"
                        className={styles.formInput}
                        value={caliber}
                        onChange={(e) => setCaliber(e.target.value)}
                        placeholder="caliber"
                        style={{width:"100%"}}
                      />

                          <span className={styles.caliberDate}>06/20</span>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label>Power Reserve</label>
                        <div className={styles.powerReserveContainer}>
                        <input
                      type="text"
                      className={styles.formInput}
                      value={powerReserve}
                      onChange={(e) => setPowerReserve(e.target.value)}
                      placeholder="72"
                      style={{ width: "100%" }}
                    />

                          <span className={styles.unit}>h</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.certificationCaliberSection}>
                      <label>Certification Caliber</label>
                      <div className={styles.certificationButtons}>
                        <button
                          className={`${styles.certButton} ${
                            selectedCaliberCerts.includes("Genevian Seal")
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() => toggleCaliberCert("Genevian Seal")}
                        >
                          Genevian Seal
                        </button>
                        <button
                          className={`${styles.certButton} ${
                            selectedCaliberCerts.includes("Chronometer")
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() => toggleCaliberCert("Chronometer")}
                        >
                          Chronometer
                        </button>
                        <button
                          className={`${styles.certButton} ${
                            selectedCaliberCerts.includes("Master Chronometer")
                              ? styles.activeCert
                              : ""
                          }`}
                          onClick={() =>
                            toggleCaliberCert("Master Chronometer")
                          }
                        >
                          Master Chronometer
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {detailsContentIndex == 3 && (
                  <>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Dial Color</label>
                        <select
                    className={styles.formSelect}
                    value={dialColor}
                    onChange={(e) => setDialColor(e.target.value)}
                  >
                    <option value="">Select</option>
                    {dialColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>

                      </div>
                    </div>

                    <div className={styles.dialFormatSection}>
                      <label>Dial format</label>
                      <div className={styles.dialFormatGrid}>
                        <button
                          className={`${styles.dialFormatButton} ${
                            selectedDialFormat === "Arabic Numerals"
                              ? styles.activeDialFormat
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedDialFormat("Arabic Numerals")
                          }
                        >
                          <Image
                            src="/assets/WatchDetails/arabic.png"
                            alt="Arabic Numerals"
                            width={80}
                            height={80}
                          />
                          <span>Arabic Numerals</span>
                        </button>

                        <button
                          className={`${styles.dialFormatButton} ${
                            selectedDialFormat === "Roman Numerals"
                              ? styles.activeDialFormat
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedDialFormat("Roman Numerals")
                          }
                        >
                          <Image
                            src="/assets/WatchDetails/roman.png"
                            alt="Roman Numerals"
                            width={80}
                            height={80}
                          />
                          <span>Roman Numerals</span>
                        </button>

                        <button
                          className={`${styles.dialFormatButton} ${
                            selectedDialFormat === "No Numerals"
                              ? styles.activeDialFormat
                              : ""
                          }`}
                          onClick={() => setSelectedDialFormat("No Numerals")}
                        >
                          <Image
                            src="/assets/WatchDetails/no.png"
                            alt="No Numerals"
                            width={80}
                            height={80}
                          />
                          <span>No Numerals</span>
                        </button>

                        <button
                          className={`${styles.dialFormatButton} ${
                            selectedDialFormat === "not specified"
                              ? styles.activeDialFormat
                              : ""
                          }`}
                          onClick={() => setSelectedDialFormat("not specified")}
                        >
                          <Image
                            src="/assets/WatchDetails/not.png"
                            alt="not specified"
                            width={80}
                            height={80}
                          />
                          <span>not specified</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {detailsContentIndex == 4 && (
                  <>
                    <div className={styles.functionsSection}>
                      <h3 className={styles.functionsTitle}>
                        Select functions of the watch
                      </h3>
                      <div className={styles.functionsGrid}>
                        {[
                          "Date",
                          "Tourbillon",
                          "Minute Repeater",
                          "Moon phase",
                          "Month",
                          "Weekday",
                          "Chronograph",
                          "Tachymeter",
                          "Equation of time",
                          "Chiming clock",
                          "Alarm",
                          "Annual Calendar",
                          "Repeater",
                          "4-Year Calendar",
                          "GMT",
                          "Perpetual Calendar",
                          "Flyback",
                          "Double chronograph",
                          "Panorama Date",
                          "Jumping Hour",
                        ].map((func) => (
                          <button
                            key={func}
                            className={`${styles.functionButton} ${
                              selectedFunctions.includes(func)
                                ? styles.activeFunction
                                : ""
                            }`}
                            onClick={() => toggleFunction(func)}
                          >
                            {func}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(1)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(3)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 3 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>3. Photos</h2>
                <p className={styles.mandatoryText}>
                  Upload photos to increase attractiveness
                </p>

                <div className={styles.photosSection}>
                  <h3 className={styles.photosSectionTitle}>
                    Photos of the watch
                  </h3>
                  <div className={styles.photosGrid}>
                    {[
                      {
                        id: "cover",
                        label: "Cover",
                        icon: "/assets/WatchDetails/cover.png",
                      },
                      {
                        id: "back",
                        label: "Back",
                        icon: "/assets/WatchDetails/back.png",
                      },
                      {
                        id: "wristshot",
                        label: "Wristshot",
                        icon: "/assets/WatchDetails/wristshot.png",
                      },
                      {
                        id: "defects",
                        label: "Defects",
                        icon: "/assets/WatchDetails/defects.png",
                      },
                      {
                        id: "side1",
                        label: "Side 1",
                        icon: "/assets/WatchDetails/side1.png",
                      },
                      {
                        id: "side2",
                        label: "Side 2",
                        icon: "/assets/WatchDetails/side2.png",
                      },
                      {
                        id: "more1",
                        label: "More",
                        icon: "/assets/WatchDetails/more.png",
                      },
                      {
                        id: "more2",
                        label: "More",
                        icon: "/assets/WatchDetails/more.png",
                      },
                    ].map((item) => (
                      <div key={item.id} className={styles.photoUploadBox}>
                        <input
                          type="file"
                          id={item.id}
                          accept="image/*"
                          className={styles.hiddenInput}
                          onChange={(e) => handlePhotoUpload(e, item.id)}
                        />
                       <label htmlFor={item.id} className={styles.uploadLabel}>
  {(() => {
    const imageMap = {
      cover,
      back,
      wristShot,
      defects,
      side1,
      side2,
      more1,
      more2,
      "box-outside": boxOutside,
      "box-inside": boxInside,
      papers: papersImg,
      more3,
      more4,
      more5,
    };

    const uploaded = imageMap[item.id];

    return uploaded && uploaded.path ? (
      <img
        src={uploaded.path}
        alt={item.label}
        width={80}
        height={120}
        style={{ objectFit: "cover", borderRadius: 4 }}
      />
    ) : (
      <Image
        src={item.icon}
        alt={item.label}
        width={80}
        height={120}
        style={{ objectFit: "contain" }}
      />
    );
  })()}
  <span>{item.label}</span>
</label>


                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.accessoriesSection}>
                  <h3 className={styles.photosSectionTitle}>
                    Accessories photos
                  </h3>
                  <div className={styles.photosGrid}>
                    {[
                      {
                        id: "box-outside",
                        label: "Box outside",
                        icon: "/assets/WatchDetails/boxoutside.png",
                      },
                      {
                        id: "box-inside",
                        label: "Box inside",
                        icon: "/assets/WatchDetails/boxinside.png",
                      },
                      {
                        id: "papers",
                        label: "Papers",
                        icon: "/assets/WatchDetails/papers.png",
                      },
                      {
                        id: "more3",
                        label: "More",
                        icon: "/assets/WatchDetails/more.png",
                      },
                      {
                        id: "more4",
                        label: "More",
                        icon: "/assets/WatchDetails/more.png",
                      },
                      {
                        id: "more5",
                        label: "More",
                        icon: "/assets/WatchDetails/more.png",
                      },
                    ].map((item) => (
                      <div key={item.id} className={styles.photoUploadBox}>
                        <input
                          type="file"
                          id={item.id}
                          accept="image/*"
                          className={styles.hiddenInput}
                          onChange={(e) => handlePhotoUpload(e, item.id)}
                        />
                        <label htmlFor={item.id} className={styles.uploadLabel}>
  {(() => {
    const imageMap = {
      boxOutside,
      boxInside,
      papersImg,
      more3,
      more4,
      more5,
    };
    const uploaded = imageMap[item.id];
    console.log(`Preview check for [${item.id}]:`, uploaded);

    return uploaded && uploaded.path ? (
      <img
        src={uploaded.path}
        alt={item.label}
        width={80}
        height={120}
        style={{ objectFit: "cover", borderRadius: 4 }}
      />
    ) : (
      <Image
        src={item.icon}
        alt={item.label}
        width={80}
        height={120}
        style={{ objectFit: "contain" }}
      />
    );
  })()}
  <span>{item.label}</span>
</label>

                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(2)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(4)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 4 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>4. Condition</h2>
                <p className={styles.mandatoryText}>5 open mandatory fields</p>

                <div className={styles.formGridCondition}>
                  <div className={styles.formGroup}>
                    <label>Condition*</label>
                    <select
                    className={styles.formSelect}
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="">Select condition</option>
                    {conditionList.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>

                  </div>
                </div>

                <div className={styles.warrantySection}>
                  <div className={styles.warrantyGroup}>
                    <label className={styles.warrentyUnit}>Manufacturer warranty until*</label>
                    <div className={styles.warrantyInputGroup}>
                    <input
                        type="text"
                        className={styles.formInput}
                        value={warrantyUntil}
                        onChange={(e) => setWarrantyUntil(e.target.value)}
                        placeholder="01.01.2025"
                        disabled={noManufacturerWarranty}
                        style={{width:'100%'}}
                      />

                      <span className={styles.orText}>or</span>
                      <input
                        type="number"
                        className={`${styles.formInput} ${styles.yearInput}`}
                        placeholder="Years"
                        style={{width:'100%'}}
                        // disabled={noManufacturerWarranty}
                      />
                      <span className={styles.yearText}>
                        Years after the sale here
                      </span>
                    </div>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={noManufacturerWarranty}
                        onChange={(e) =>
                          setNoManufacturerWarranty(e.target.checked)
                        }
                      />
                      <span className={styles.warrentyUnit}>No warranty of manufacturer</span>
                    </label>
                  </div>

                  <div className={styles.warrantyGroup}>
                    <label className={styles.warrentyUnit}>Warranty of me until*</label>
                    <div className={styles.warrantyInputGroup}>
                      <input
                        type="text"
                        className={styles.formInput}
                        
                     style={{width:'100%'}}
                      />
                      <span className={styles.orText}>or</span>
                      <input
                        type="number"
                        className={`${styles.formInput} ${styles.yearInput}`}
                        placeholder="Years"
                       style={{width:'100%'}}
                      />
                      <span className={styles.yearText}>
                        Years after sale here
                      </span>
                    </div>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={noSellerWarranty}
                        onChange={(e) => setNoSellerWarranty(e.target.checked)}
                      />
                      <span className={styles.warrentyUnit}>no warranty from the seller</span>
                    </label>
                  </div>
                </div>

                <div className={styles.descriptionSection}>
                  <label className={styles.descriptionLabel}>Description</label>
                  <textarea
                    className={styles.descriptionInput}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Rolex Daytona Ceramic 116500LN White Panda, 2017, as new. The watch comes with box and papers. Manufacturer warranty is still valid until 2025."
                    rows={6}
                  />
                  <div className={styles.descriptionFooter}>
                    <div className={styles.descriptionTools}>
                      <button className={styles.toolButton}>B</button>
                      <button className={styles.toolButton}>I</button>
                      <button className={styles.toolButton}>≡</button>
                    </div>
                    <span className={styles.characterCount}>143/22000</span>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(3)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(5)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 5 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>5. Scope of Delivery</h2>
                <p className={styles.mandatoryText}>1 open mandatory field</p>

                <div className={styles.scopeSection}>
                  <p className={styles.scopeInstructions}>
                    Specify here what you are supplying in addition to the
                    watch.
                  </p>

                  <div className={styles.boxSection}>
                    <label>Box*</label>
                    <div className={styles.boxOptions}>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedBox === "Original Box"
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() => setSelectedBox("Original Box")}
                      >
                        Original Box
                      </button>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedBox === "No Box" ? styles.activeScope : ""
                        }`}
                        onClick={() => setSelectedBox("No Box")}
                      >
                        No Box
                      </button>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedBox === "Not Original Box"
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() => setSelectedBox("Not Original Box")}
                      >
                        Not Original Box
                      </button>
                    </div>
                  </div>

                  <div className={styles.papersSection}>
                    <label>Papers*</label>
                    <div className={styles.papersOptions}>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedPapers.includes("Original Manual")
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() => togglePaper("Original Manual")}
                      >
                        Original Manual
                      </button>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedPapers.includes("Original Warrranty Card")
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() => togglePaper("Original Warrranty Card")}
                      >
                        Original Warrranty Card
                      </button>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedPapers.includes(
                            "Receipt from initial purchase"
                          )
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() =>
                          togglePaper("Receipt from initial purchase")
                        }
                      >
                        Receipt from initial purchase
                      </button>
                      <button
                        className={`${styles.scopeButton} ${
                          selectedPapers.includes("Receipt from my purchase")
                            ? styles.activeScope
                            : ""
                        }`}
                        onClick={() => togglePaper("Receipt from my purchase")}
                      >
                        Receipt from my purchase
                      </button>
                    </div>
                  </div>

                  <div className={styles.scopeDescriptionSection}>
                    <label style={{fontWeight:400, fontFamily:'Poppins'}}>Description of the scope of delivery</label>
                    <textarea
                        className={styles.scopeDescriptionInput}
                        value={descriptionScope}
                        onChange={(e) => setDescriptionScope(e.target.value)}
                        placeholder="Watch, box and warranty card from Rolex. In addition, a cleaning kit is supplied."
                        rows={6}
                      />

                    <div className={styles.characterCounter}>84/200</div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(4)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(6)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 6 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>6. Offer</h2>
                <p className={styles.mandatoryText}>1 open mandatory field</p>

                <div className={styles.offerSection}>
                  <p className={styles.offerInstructions}>
                    Specify here in which currency you want to receive the money
                    in case of a sale.
                  </p>

                  <div className={styles.currencyPriceGrid}>
                    <div className={styles.formGroup}>
                    <label>Currency*</label>
                  <select
                    className={styles.formSelect}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="">Select</option>
                    {currencyList.map((cur, index) => (
                      <option key={index} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>

                    </div>

                    <div className={styles.formGroup}>
                      <label>Fixed Price*</label>
                      <div className={styles.priceInputGroup}>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={fixedPrice}
                        onChange={(e) => setFixedPrice(e.target.value)}
                        placeholder="25'000.00"
                        style={{width:'100%'}}
                      />

                        <span className={styles.currencyLabel}>CHF</span>
                      </div>
                    </div>
                  </div>

                  <p className={styles.priceNote}>
                    Sales price must include a standard delivery (national).
                  </p>

                  <div className={styles.timingSection}>
                    <div className={styles.startGroup}>
                      <label style={{fontWeight:400, fontFamily:'Poppins'}}>Start*</label>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={isInstantStart}
                          onChange={(e) => setIsInstantStart(e.target.checked)}
                        />
                        <span style={{fontWeight:400, fontFamily:'Poppins'}}>instant</span>
                      </label>
                      <div className={styles.dateTimeGroup}>
                      <input
                          type="text"
                          className={styles.formInput}
                          value={ingestionDate}
                          onChange={(e) => setIngestionDate(e.target.value)}
                          placeholder="25.10.2023"
                        />
                        <input
                          type="text"
                          className={styles.formInput}
                          value={ingestionTime}
                          onChange={(e) => setIngestionTime(e.target.value)}
                          placeholder="22:25 Uhr"
                        />
                                        </div>
                    </div>

                    <div className={styles.endGroup}>
                      <label style={{fontWeight:400, fontFamily:'Poppins'}}>End*</label>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={isMaximumEnd}
                          onChange={(e) => setIsMaximumEnd(e.target.checked)}
                        />
                        <span style={{fontWeight:400, fontFamily:'Poppins'}}>maximum (15 days)</span>
                      </label>
                      <div className={styles.dateTimeGroup}>
                      <input
                      type="text"
                      className={styles.formInput}
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      placeholder="07.11.2023"
                    />

                    <input
                      type="text"
                      className={styles.formInput}
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      placeholder="22:25 Uhr"
                    />

                      </div>
                    </div>
                  </div>

                  <div className={styles.reactivationSection}>
                    <label style={{fontWeight:400, fontFamily:'Poppins'}}>Automatic Reactivation</label>
                    <div className={styles.reactivationOptions}>
                      {[
                        "none",
                        "1 Mal",
                        "2 Mal",
                        "3 Mal",
                        "4 Mal",
                        "5 Mal",
                      ].map((option) => (
                        <button
                          key={option}
                          className={`${styles.reactivationButton} ${
                            selectedReactivation === option
                              ? styles.activeReactivation
                              : ""
                          }`}
                          onClick={() => setSelectedReactivation(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(5)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(7)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 7 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>7. Payment and Delivery</h2>
                <p className={styles.mandatoryText}>3 open mandatory fields</p>
                <div className={styles.paymentDeliverySection}>
                  <div className={styles.methodsSection}>
                    <label style={{fontWeight:400, fontFamily:'Poppins'}}>Accepted payment methods*</label>
                    <div className={styles.methodsOptions}>
                      <button
                        className={`${styles.methodButton} ${
                          selectedPaymentMethods.includes(
                            "Cash payment upon collection"
                          )
                            ? styles.activeMethod
                            : ""
                        }`}
                        onClick={() =>
                          togglePaymentMethod("Cash payment upon collection")
                        }
                      >
                        Cash payment upon collection
                      </button>
                      <button
                        className={`${styles.methodButton} ${
                          selectedPaymentMethods.includes("Bank payment")
                            ? styles.activeMethod
                            : ""
                        }`}
                        onClick={() => togglePaymentMethod("Bank payment")}
                      >
                        Bank payment
                      </button>
                    </div>
                  </div>

                  <div className={styles.availabilitySection}>
                    <label>Availability*</label>
                    <div className={styles.availabilityOptions}>
                      <button
                        className={`${styles.availabilityButton} ${
                          selectedAvailability === "Instant ready for delivery"
                            ? styles.activeAvailability
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedAvailability("Instant ready for delivery")
                        }
                      >
                        Instant ready for delivery
                      </button>
                      <button
                        className={`${styles.availabilityButton} ${
                          selectedAvailability ===
                          "Ready for delivery in 3-5 workdays"
                            ? styles.activeAvailability
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedAvailability(
                            "Ready for delivery in 3-5 workdays"
                          )
                        }
                      >
                        Ready for delivery in 3-5 workdays
                      </button>
                      <button
                        className={`${styles.availabilityButton} ${
                          selectedAvailability ===
                          "Ready for delivery in 6-10 workdays"
                            ? styles.activeAvailability
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedAvailability(
                            "Ready for delivery in 6-10 workdays"
                          )
                        }
                      >
                        Ready for delivery in 6-10 workdays
                      </button>
                    </div>
                  </div>

                  <div className={styles.deliverySection}>
                    <label>Delivery / Pickup</label>
                    <div className={styles.deliveryOptions}>
                      <button
                        className={`${styles.deliveryButton} ${
                          selectedDelivery === "Mandatory: Shipping domestic"
                            ? styles.activeDelivery
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedDelivery("Mandatory: Shipping domestic")
                        }
                      >
                        Mandatory: Shipping domestic
                      </button>
                      <button
                        className={`${styles.deliveryButton} ${
                          selectedDelivery === "Pick up at my address"
                            ? styles.activeDelivery
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedDelivery("Pick up at my address")
                        }
                      >
                        Pick up at my address
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(6)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={() => setNewIndex(8)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {newIndex === 8 && (
              <div className={styles.basicDataContainer}>
                <h2 className={styles.sectionTitle}>8. Booster</h2>
                <p className={styles.mandatoryText}>
                  Increase the visibility of your offer
                </p>

                <div className={styles.boosterSection}>
                  <div
                    className={`${styles.boosterCard} ${
                      selectedBoosterLevel === "Level 1"
                        ? styles.activeBooster
                        : ""
                    }`}
                    onClick={() => setSelectedBoosterLevel("Level 1")}
                  >
                    <div className={styles.boosterHeader}>
                      <Image
                        src="/assets/WatchDetails/level1.png"
                        alt="Level 1"
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                      <h3>Level 1</h3>
                    </div>
                    <div className={styles.boosterFeatures}>
                      <div className={styles.feature}>
                        <span>✓</span> In Watch Swiper
                      </div>
                      <div className={styles.feature}>
                        <span>✓</span> In search results
                      </div>
                    </div>
                    <div className={styles.boosterPrice}>Free!</div>
                  </div>

                  <div
                    className={`${styles.boosterCard} ${
                      selectedBoosterLevel === "Level 2"
                        ? styles.activeBooster
                        : ""
                    }`}
                    onClick={() => setSelectedBoosterLevel("Level 2")}
                  >
                    <div className={styles.boosterHeader}>
                      <Image
                        src="/assets/WatchDetails/level2.png"
                        alt="Level 2"
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                      <h3>Level 2</h3>
                    </div>
                    <div className={styles.boosterFeatures}>
                      <p>Level 1 + additional:</p>
                      <div className={styles.feature}>
                        <span>✓</span> On the home page
                      </div>
                      <div className={styles.feature}>
                        <span>✓</span> As top search result
                      </div>
                    </div>
                    <div className={styles.boosterPrice}>CHF 100.-</div>
                    <p className={styles.boosterNote}>
                      Pay the booster only if your listing has more than 2000
                      views.
                    </p>
                  </div>

                  <div
                    className={`${styles.boosterCard} ${
                      selectedBoosterLevel === "Level 3"
                        ? styles.activeBooster
                        : ""
                    }`}
                    onClick={() => setSelectedBoosterLevel("Level 3")}
                  >
                    <div className={styles.boosterHeader}>
                      <Image
                        src="/assets/WatchDetails/level3.png"
                        alt="Level 3"
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                      <h3>Level 3</h3>
                    </div>
                    <div className={styles.boosterFeatures}>
                      <p>Level 2 + additional:</p>
                      <div className={styles.feature}>
                        <span>✓</span> In personalized emails
                      </div>
                    </div>
                    <div className={styles.boosterPrice}>CHF 250.-</div>
                    <p className={styles.boosterNote}>
                      Pay only if you sell the watch here or you end the
                      listing.
                    </p>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    className={styles.backButtonBasicData}
                    onClick={() => setNewIndex(7)}
                  >
                    Back
                  </button>
                  <button
                    className={styles.nextButtonBasicData}
                    onClick={publishWatch}
                  >
                     {loader ? (
    <span className={styles.loader}></span> 
  ) : (
    "Next"
  )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {bottomTabIndex === 2 && (
          <div className={styles.sellingGridEndwatch}>
            {watches.map((watch) => (
              <MyOpenWatch
                key={watch.id}
                image={watch.cover || "/default-watch.png"}
                name={watch.listing_title}
                price={
                  watch.fixed_price_value + " " + watch.fixed_price_currency
                }
                date={new Date(watch.created_at).toLocaleDateString()}
                email={watch.user.email}
                sellerName={watch.user.first_name + " " + watch.user.last_name}
              />
            ))}
          </div>
        )}
      {bottomTabIndex === 3 && (
  <div className={styles.noWatches}>
    {loading ? (
      <div className={styles.loadingContainer}><div className={styles.spinnerWrapper}><div className={styles.spinner}></div></div></div>
    ) : endedWatches?.length === 0 ? (
      <p style={{ fontFamily: 'Poppins', textAlign: 'center', fontSize:18 }}>
        No ended watches available.
      </p>
    ) : (
      <div className={styles.sellingGridEndwatch}>
        {endedWatches.map((watch) => (
          <div key={watch.id} className={styles.inEndedWatchGrid}>
            <MyEndedWatch
              image={watch.cover}
              name={watch.listing_title}
              price={watch.fixed_price_value}
              date={new Date(watch.created_at).toLocaleDateString()}
              email={watch.user.email}
              sellerName={`${watch.user.first_name} ${watch.user.last_name}`}
            />
          </div>
        ))}
      </div>
    )}
  </div>
)}

        {bottomTabIndex === 4 && (
          <>
            <div className={styles.sellingBar}>
              <button
                onClick={() => setSellingStatus("pending")}
                className={`${styles.sellingStatusButton} ${
                  sellingStatus === "pending" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/pending.png"
                  alt="Pending"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>Pending</span>
              </button>
              <div className={styles.statusLine} />
              <button
                onClick={() => setSellingStatus("inProgress")}
                className={`${styles.sellingStatusButton} ${
                  sellingStatus === "inProgress" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/inprogress.png"
                  alt="In-Progress"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>In-Progress</span>
              </button>
              <div className={styles.statusLine} />
              <button
                onClick={() => setSellingStatus("completed")}
                className={`${styles.sellingStatusButton} ${
                  sellingStatus === "completed" ? styles.activeStatus : ""
                }`}
              >
                <Image
                  src="/assets/Home/completed.png"
                  alt="Completed"
                  width={24}
                  height={24}
                  className={styles.statusIcon}
                />
                <span className={styles.statusText}>Completed</span>
              </button>
            </div>

          {sellingStatus === "pending" && (
            loading ? ( 
              <div className={styles.loadingContainer}>
                <div className={styles.spinnerWrapper}>
                  <div className={styles.spinner}></div>
                </div>
              </div>
            ) : pendingSales?.length === 0 ? (
              <p style={{ fontFamily: 'Poppins', textAlign:'center' }}> No data found</p>  
            ) : (
              <div className={styles.sellingGrid}>
                {pendingSales.map((sale) => (
                  <SoldCardPending
                    key={sale?.id}
                    image={sale?.watch?.cover}
                    name={sale?.watch?.listing_title}
                    price={sale?.watch?.fixed_price_value}
                    date={`${sale?.created_at?.split("T")[0]} ${sale?.created_at?.split("T")[1]?.split(".")[0]}`}
                    email={sale?.buyer?.email}
                    sellerName={`${sale?.seller?.first_name} ${sale?.seller?.last_name}`}
                    orderId={sale?.id}
                    onAccept={updateOrderStatus}
                  />
                ))}
              </div>
            )
          )}

          {sellingStatus === "inProgress" && (
            loading ? ( 
              <div className={styles.loadingContainer}>
                <div className={styles.spinnerWrapper}>
                  <div className={styles.spinner}></div>
                </div>
              </div>
            ) : inProgressSales?.length === 0 ? (
              <p style={{ fontFamily: 'Poppins',textAlign:'center'  }}> No data found</p>  
            ) : (
              selectedCard ? (
                <MySellingInProgressDetails
                  {...selectedSaleDetails}
                  orderId={selectedSaleDetails?.id}
                  onBack={() => {
                    setSelectedCard(null);
                    setSelectedSaleDetails(null);
                  }}
                />
              ) : (
             
                <div className={styles.sellingGrid}>
            {inProgressSales.map((sale) => {
              console.log(sale); 
              return (
                <div key={sale?.id} className={styles.gridItem}>
                  <SoldCardInprogress
                    image={sale?.watch?.cover}
                    name={sale?.watch?.listing_title}
                    price={sale?.watch?.fixed_price_value}
                    date={`${sale?.created_at?.split("T")[0]} ${sale?.created_at?.split("T")[1]?.split(".")[0]}`}
                    email={sale?.buyer?.email}
                    sellerName={`${sale?.seller?.first_name} ${sale?.seller?.last_name}`}
                    id={sale?.id}
                    onSellNow={(details) => handleSellNow({ ...details, id: sale.id })}
                    orderId={sale?.id}
                  />
                </div>
              );
  })}
</div>

              )
            )
          )}
                      {sellingStatus === "completed" && (
            loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinnerWrapper}>
                  <div className={styles.spinner}></div>
                </div>
              </div>
            ) : completedSales?.length === 0 ? (
              <p style={{ fontFamily: 'Poppins', textAlign:'center' }}> No data found</p>  
            ) : (
              <div className={styles.sellingGrid}>
                {completedSales.map((sale) => (
                  <SoldCardCompleted
                    key={sale?.id}
                    image={sale?.watch?.cover}
                    name={sale?.watch?.listing_title}
                    price={sale?.watch?.fixed_price_value}
                    date={`${sale?.created_at?.split("T")[0]} ${sale?.created_at?.split("T")[1]?.split(".")[0]}`}
                    email={sale?.buyer?.email}
                    sellerName={`${sale?.seller?.first_name} ${sale?.seller?.last_name}`}
                  />
                ))}
              </div>
            )
          )}

          </>
        )}
      </div>
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <button
              className={styles.closeButton}
              onClick={() => setShowSuccessPopup(false)}
            >
              <Image
                src="/assets/WatchDetails/cross.png"
                alt="Close"
                width={24}
                height={24}
              />
            </button>
            <div className={styles.popupContent}>
              <h2>{loader ? "Publishing..." : "Product Listed successfully"}</h2>
              {loader ? (
                <div className={styles.loader}>Loading...</div>
              ) : (
                <>
                  <div className={styles.checkIcon}>
                    <Image
                      src="/assets/WatchDetails/check.png"
                      alt="Success"
                      width={80}
                      height={80}
                    />
                  </div>
                  <button
                    className={styles.listNewButton}
                    onClick={() => setShowSuccessPopup(false)}
                  >
                    List New Product
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MySelling;
