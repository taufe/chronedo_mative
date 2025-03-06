import { useEffect, useState } from "react";
import Image from "next/image";
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

export const MySellingInProgressDetails = ({
  image,
  name,
  price,
  date,
  onChange,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("Write Here");
  const [showDetails, setShowDetails] = useState(false);
  const [inputWidth, setInputWidth] = useState(
    window.innerWidth < 767 ? "90%" : "98.5%"
  );

  useEffect(() => {
    const handleResize = () => {
      setInputWidth(window.innerWidth < 786 ? "90%" : "98.5%");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      setIsModalOpen(true);
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

  // Dynamic Content Based on Step
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <label className={styles.label}>Pickup Details</label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className={styles.pickupLocationBox}
              style={{ backgroundColor: "transparent", width: inputWidth }}
              placeholder="Enter pickup address"
            />

            <label className={styles.label}>Date & Time</label>
            <div className={styles.pickupDateTimeBox}>
              25/10/2024 - 10:45 PM
              <AiOutlineClockCircle className={styles.clockIcon} />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <label className={styles.label}>Payment Method</label>
            <div className={styles.cashPayment}>
              Once you pay cash to the buyer please mark it as paid.
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label className={styles.label}>Watch Handover</label>
            <div className={styles.inputBox}>
              If you have received the watch, please mark it as &quot;Watch
              Received&quot;
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <div className={styles.ratingContainer}>
                <h4>Communication with the seller</h4>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4>Recommendation of the seller to a friend</h4>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4>Rating of the seller</h4>
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
                <h4>Satisfaction with chronedo</h4>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                />
              </div>
              <div className={styles.ratingContainer}>
                <h4>Share with us your opinion</h4>
                <textarea
                  id={postTextAreaId}
                  name="postContent"
                  rows={4}
                  cols={40}
                  className={styles.textarea}
                  placeholder="Your feedback to chronedo"
                  style={{ color: "white" }}
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
          <div className={styles.price}>CHF {price.toLocaleString()}</div>
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
          <div className={styles.payment}>Payment open</div>
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

      {/* Dynamic Section */}
      <div className={styles.pickupDetailsContainer}>{getStepContent()}</div>

      {/* Horizontal Line */}
      <div className={styles.horizontalLine}></div>

      {/* Buttons */}
      {activeStep < 4 && (
        <button className={styles.sellButton} onClick={handleNextStep}>
          {getButtonText()}
        </button>
      )}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <Image src={successIcon} alt="Success" width={100} height={100} />
            <p>Your rating has been submitted successfully.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.closeButton}
            >
              Your Welcome
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
