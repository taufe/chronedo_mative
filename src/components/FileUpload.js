import React, { useState } from 'react';
import Image from 'next/image';
import styles from './FileUpload.module.css';

const FileUpload = ({ label, onUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onUpload(file);
        }
    };

    return (
        <div className={styles.fileUploadContainer}>
            <div className={styles.labelContainer}>
                <Image
                    src="/assets/icons/IDfront.png" 
                    alt={`${label} ID`}
                    width={24}
                    height={24}
                />
                <span className={styles.label}>{label}</span>
            </div>
            <label className={styles.fileInputLabel}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className={styles.fileInput}
                />
                <div className={styles.uploadButton}>
                    <Image
                        src="/assets/icons/Uload.png" 
                        alt="Upload"
                        width={24}
                        height={24}
                    />
                    <span>{fileName || 'Select file'}</span>
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
