import DashboardLayout from '../components/Layout/DashboardLayout';
import Image from 'next/image';
import styles from './invoices.module.css';
import InvoiceCard from '../components/InvoiceCard/InvoiceCard';
import { useRouter } from 'next/router';

const Invoices = () => {
    const router = useRouter();

    // Dummy invoice data
    const invoices = [
        {
            watchImage: '/assets/watches/w1.png',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            status: 'Pending'
        },
        {
            watchImage: '/assets/watches/w2.jpg',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            status: 'Paid'
        },
        {
            watchImage: '/assets/watches/w3.jpeg',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            status: 'Pending'
        },
        {
            watchImage: '/assets/watches/w4.png',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            status: 'Paid'
        },
        {
            watchImage: '/assets/watches/w5.png',
            watchName: 'Rolex Datejust Oyster 41mm',
            invoiceNo: '5678932565',
            date: '10th Oct, 2024',
            amount: '80',
            status: 'Pending'
        },
        {
            watchImage: '/assets/watches/w6.png',
            watchName: 'Omega Speedmaster',
            invoiceNo: '5678932566',
            date: '11th Oct, 2024',
            amount: '120',
            status: 'Paid'
        },
    ];

    const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const canceledInvoices = invoices.filter(inv => inv.status === 'Canceled');

    const handlePayNow = (invoiceNo) => {
        console.log('Processing payment for invoice:', invoiceNo);
        // Add payment handling logic here
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
                                <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.iconsContainer}>
                        <Image src="/assets/icons/notification.png" alt="Notifications" width={24} height={24} />
                        <Image src="/assets/icons/cart.png" alt="Cart" width={24} height={24} />
                        <Image src="/assets/icons/profile.png" alt="Profile" width={24} height={24} />
                    </div>
                </div>

                <div className={styles.invoicesContainer}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Pending</h2>
                        <div className={styles.cards}>
                            {pendingInvoices.map((invoice, index) => (
                                <InvoiceCard
                                    key={`pending-${index}`}
                                    {...invoice}
                                    onPayNow={() => handlePayNow(invoice.invoiceNo)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Paid</h2>
                        <div className={styles.cards}>
                            {paidInvoices.map((invoice, index) => (
                                <InvoiceCard
                                    key={`paid-${index}`}
                                    {...invoice}
                                    onPayNow={() => handlePayNow(invoice.invoiceNo)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Invoices; 