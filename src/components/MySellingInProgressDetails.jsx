import { useEffect, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./PurChaseCardInProgressDetails.module.css";
import { LuDownload } from "react-icons/lu";
// Import Step Icons
import step1Inactive from "/public/assets/activeicon/deliveryInactive.png";
import step2Inactive from "/public/assets/activeicon/mapInActive.png";
import step3Inactive from "/public/assets/activeicon/ratingInactive.png";
import step4Inactive from "/public/assets/activeicon/sendPaymentInactive.png";
import step1Active from "/public/assets/activeicon/deliveryActive.png";
import step2Active from "/public/assets/activeicon/mapActive.png";
import step3Active from "/public/assets/activeicon/ratingActive.png";
import step4Active from "/public/assets/activeicon/sendPaymentActive.png";
import successIcon from "/public/assets/icons/successIcon.png";
import { AiOutlineClockCircle } from "react-icons/ai"; // Clock icon
import { Rating } from "react-simple-star-rating";
import { useId } from "react";
import axios from 'axios';

export const MySellingInProgressDetails = ({
  image,
  name,
  price,
  date,
  orderId,
  onBack // Add onBack prop to handle navigation
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("Write Here");
  const [showDetails, setShowDetails] = useState(false);
  const [inputWidth, setInputWidth] = useState(
    window.innerWidth < 767 ? "90%" : "98.5%"
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orderData, setOrderData] = useState(null);
    const [communicationRating, setCommunicationRating] = useState(0);
    const [recommendationRating, setRecommendationRating] = useState(0);
    const [processingRating, setProcessingRating] = useState(0);
    const [satisfactionRating, setSatisfactionRating] = useState(0);
  // Load token from local storage
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setInputWidth(window.innerWidth < 786 ? "90%" : "98.5%");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    useEffect(() => {
        // Function to load token from local storage
        const loadToken = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };

        loadToken();
    }, []);


  useEffect(() => {
    const fetchOrderData = async () => {
      try {
          const storedToken = localStorage.getItem('token');
          const response = await axios.get(
            `https://chronedo.webjerky.com/api/orderStatus/${orderId}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
        setOrderData(response.data.data);
        console.log('store token------------',response.data)
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const validatePickupDetails = () => {
    if (!pickupAddress.trim()) {
      setError('Please enter a pickup address');
      return false;
    }
    if (!selectedDate) {
      setError('Please select a pickup date and time');
      return false;
    }
    return true;
  };

  const validateRatings = () => {
    if (rating === 0) {
      setError('Please provide a rating');
      return false;
    }
    return true;
  };

  const handleNextStep = async () => {
    setIsLoading(true);
    try {
      if (activeStep === 0) {
        if (!validatePickupDetails()) {
          setIsLoading(false);
          return;
        }
        
        const pickupDetails = {
          address: pickupAddress,
          dateTime: selectedDate.toISOString()
        };

        const token = localStorage.getItem('token');
        console.log('token++++++++', token)

        const response = await axios.post(
            '/api/saleOrderApi',
            {
                id: orderId,
                order_status: 2,
                status: 1,
                pickup_details: JSON.stringify(pickupDetails),
                token: token
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('reponse of first step', response.data)
        if (response.status === 200) {
            setActiveStep(activeStep + 1);
        } else {
            console.error("Failed to update order status");
        }
      }

         else if (activeStep === 1) {
          try {
             
              const storedToken = localStorage.getItem('token');

              const response = await axios.post(
                  '/api/saleOrderApi',
                  {
                      id: orderId,
                      order_status: 3, 
                      status:2,
                      token: storedToken
                  },
                  {
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }
              );

              console.log('response of api-------+++++++++---------------',response.data)

              if (response.status === 200) {
                  setActiveStep(activeStep + 1);
             
              } else {
                  console.error("Failed to update order status");
              }
          } catch (error) {
              console.error("Error updating order status:", error);
          }
      } else if (activeStep === 2) {
          try {
              const pickupDetails = {
                  address: pickupAddress,
                  dateTime: selectedDate.toISOString()
              };

              const storedToken = localStorage.getItem('token');

              const response = await axios.post(
                  '/api/saleOrderApi',
                  {
                      id: orderId,
                      order_status: 4, 
                      status:3,
                      token: storedToken
                  },
                  {
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }
              );

              if (response.status === 200) {
                  setActiveStep(activeStep + 1);
                  
              } else {
                  console.error("Failed to update order status");
              }
          } catch (error) {
              console.error("Error updating order status:", error);
          }
      } else if (activeStep === 3) {
          if (!validateRatings()) {
            setIsLoading(false);
            return;
          }
         

          const token = localStorage.getItem('token');
          console.log('token cchecking in progress details',token)

          const response = await axios.post(
              '/api/saleOrderApi',
              {
                  id: orderId,
                  order_status: 5, 
                  status:4,
                  token: token
              },
              {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
          );

          console.log('resposnse -----------------------',response.data)

          if (response.status === 200) {
              setActiveStep(activeStep + 1);
           
          } else {
              console.error("Failed to update order status");
          }
      }
        else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError('Failed to update order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };

  const postTextAreaId = useId();

  const onPointerEnter = () => console.log("Pointer Enter");
  const onPointerLeave = () => console.log("Pointer Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  // Steps Configuration
  const steps = [
    { activeIcon: step2Active, inactiveIcon: step2Inactive },
    { activeIcon: step4Active, inactiveIcon: step4Inactive },
    { activeIcon: step1Active, inactiveIcon: step1Inactive },
    { activeIcon: step3Active, inactiveIcon: step3Inactive },
  ];

  const CustomInput = ({ value, onClick }) => (
    <div className={styles.pickupDateTimeBox} onClick={onClick}>
      <span>{value}</span>
      <AiOutlineClockCircle className={styles.clockIcon} />
    </div>
  );

  // Dynamic Content Based on Step
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <label className={styles.label}>Pickup Details</label>
            <input
              type="text"
              value={orderData?.pickup_details || pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className={styles.pickupLocationBox}
              style={{ backgroundColor: "transparent", width: inputWidth }}
              placeholder="Enter pickup address"
            />

            <label className={styles.label}>Date & Time</label>
            <div className={styles.datePickerContainer}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy h:mm aa"
                minDate={new Date()}
                customInput={<CustomInput />}
                className={styles.datePicker}
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <label className={styles.label}>Payment Method</label>
            <div className={styles.cashPayment}>
              {orderData?.payment_method === 'Cash'
                ? 'Once you pay cash to the buyer please mark it as paid.'
                : `Payment method: ${orderData?.payment_method || 'Cash'}`}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label className={styles.label}>Watch Handover</label>
            <div className={styles.inputBox}>
              {orderData?.delivery_method === 'Delivery'
                ? 'Watch will be delivered to the specified address'
                : 'If you have received the watch, please mark it as "Watch Received"'}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <div className={styles.ratingContainer}>
                <h4 style={{fontFamily:'Poppins', fontWeight:400}}>Communication with the seller</h4>
                <Rating
                  onClick={handleRating}
                  initialValue={orderData?.seller_communication_rating || 0}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4 style={{fontFamily:'Poppins', fontWeight:400}}>Recommendation of the seller to a friend</h4>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4 style={{fontFamily:'Poppins', fontWeight:400}}>Rating of the seller</h4>
                <textarea
                  id={postTextAreaId}
                  name="postContent"
                  rows={4}
                  cols={40}
                  className={styles.textarea}
                  placeholder="Your feedback"
                  style={{ color: "white" }}
                />
              </div>

              <div className={styles.ratingContainer}>
                <h4 style={{fontFamily:'Poppins', fontWeight:400}}>Satisfaction with chronedo</h4>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4 style={{fontFamily:'Poppins', fontWeight:400}}>Share with us your opinion</h4>
                <textarea
                  value={orderData?.seller_feedback_of_app || ''}
                  onChange={(e) => handleFeedbackChange(e.target.value)}
                  className={styles.textarea}
                  placeholder="Your feedback to chronedo"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Get Button Text Based on Step
  const getButtonText = () => {
    switch (activeStep) {
      case 0:
        return "Approve";
      case 1:
        return "Mark as Paid";
      case 2:
        return "Watch Received";
      case 3:
        return "Submit Rating";
      default:
        return "Next Step";
    }
  };

  return (
    <div className={styles.purchaseCard}>
        <button onClick={onBack} style={{position: 'absolute', top: '10px', left: '10px', cursor: 'pointer'}}>Back</button>
      {/* Progress Bar Container */}
      <div className={styles.mainContent}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            width={160}
            height={160}
            className={styles.watchImage}
          />
        </div>
        <div className={styles.watchDetails}>
          <h3 className={styles.watchName}>{name}</h3>
          <div className={styles.statusContainer}>
            <Image
              src="/assets/Home/completed.png"
              alt="In-Progress"
              width={20}
              height={20}
            />
            <span className={styles.statusText}>Sold</span>
            <span className={styles.date}>{date}</span>
          </div>
          <div className={styles.price}>CHF {price}</div>
        </div>
      </div>

      <div className={styles.sellerSection}>
        <div className={styles.sellerHeader}>
          Statistics
          <Image
            src="/assets/icons/dropdown.png"
            alt="Dropdown"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
      {/* Buttons */}
      <div className={styles.buttonsWrapper}>
        <div className={styles.satusButton}>
          <div className={styles.status}>Status:</div>
          <div className={styles.payment}>
            {orderData?.payment_method === 'Cash' ? 'Payment open' : orderData?.payment_method}
          </div>
        </div>
        <div className={styles.confirmationButtonWrapper}>
          <LuDownload style={{ marginLeft: 10, marginRight: 10 }} />
          Confirmation of sale
        </div>
      </div>
      {/* Progress Steps */}
      <div className={styles.progressContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.stepWrapper}>
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={styles.stepLine}
                style={{
                  backgroundColor: index <= activeStep ? "#999" : "#999",
                }}
              ></div>
            )}
            {/* Step Icon */}
            <div
              className={`${styles.stepIcon} ${
                index === activeStep ? styles.activeStep : ""
              }`}
            >
              <Image
                src={index <= activeStep ? step.activeIcon : step.inactiveIcon}
                alt={`Step ${index + 1}`}
                width={50}
                height={50}
                style={{ marginLeft: -20 }}
              />
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {/* Dynamic Section */}
      <div className={styles.pickupDetailsContainer}>{getStepContent()}</div>

      {/* Horizontal Line */}
      <div className={styles.horizontalLine}></div>

      {/* Buttons */}
      {activeStep < 4 && (
        <button 
          className={`${styles.sellButton} ${isLoading ? styles.loading : ''}`} 
          onClick={handleNextStep}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : getButtonText()}
        </button>
      )}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <Image src={successIcon} alt="Success" width={100} height={100} />
            <p style={{fontFamily:'Poppins', fontWeight:400}}>Your rating has been submitted successfully.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.closeButton}
            >
              Your Welcome
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
};






