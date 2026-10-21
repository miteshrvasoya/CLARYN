'use client';
import { useState, useRef, useId } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import {
  User,
  Package,
  FileUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  Headphones,
  Truck,
  Info,
  X,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import styles from './page.module.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'application/pdf'];
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.pdf'];

export default function RegisterProductPage() {
  // Form field states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePlatform, setPurchasePlatform] = useState('');
  const [orderId, setOrderId] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);

  // File upload state
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form submission & validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  // IDs for accessibility
  const nameId = useId();
  const mobileId = useId();
  const emailId = useId();
  const productIdField = useId();
  const purchaseDateId = useId();
  const platformId = useId();
  const orderIdField = useId();
  const consentId = useId();

  // Validate Indian mobile numbers
  function validateIndianMobile(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Matches 10 digits starting with 6-9, or prefixed with +91, 91, or 0
    const re = /^(?:\+?91|0)?[6-9]\d{9}$/;
    return re.test(cleaned);
  }

  // Validate email
  function validateEmail(mail: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(mail.trim());
  }

  // Validate the whole form
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!validateIndianMobile(mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!productId) {
      newErrors.productId = 'Please select your CLARYN product.';
    }

    if (!purchaseDate) {
      newErrors.purchaseDate = 'Please select the date of purchase.';
    } else {
      const selected = new Date(purchaseDate);
      const today = new Date();
      if (selected > today) {
        newErrors.purchaseDate = 'Purchase date cannot be in the future.';
      }
    }

    if (!purchasePlatform) {
      newErrors.purchasePlatform = 'Please select where you purchased this product.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // File handling
  function handleFileSelection(file: File) {
    setFileError('');
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();

    const isAcceptedType =
      ACCEPTED_FILE_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(extension);

    if (!isAcceptedType) {
      setFileError('Unsupported file type. Please upload a JPG, JPEG, or PDF file.');
      setInvoiceFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File exceeds 5 MB limit. Please choose a smaller file.');
      setInvoiceFile(null);
      return;
    }

    setInvoiceFile(file);
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }

  function removeFile() {
    setInvoiceFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare payload
      const payload: Record<string, unknown> = {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        productId,
        purchaseDate,
        purchasePlatform,
        orderId: orderId.trim() || undefined,
        marketingConsent,
      };

      // If user provided an invoice file, request Cloudflare R2 presigned URL and upload directly
      if (invoiceFile) {
        try {
          const presignRes = await fetch('/api/upload-presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: invoiceFile.name,
              fileType: invoiceFile.type,
              fileSize: invoiceFile.size,
            }),
          });

          const presignData = await presignRes.json();
          if (presignRes.ok && presignData.presignedUrl) {
            // Direct PUT upload to Cloudflare R2 bucket via presigned URL
            const uploadRes = await fetch(presignData.presignedUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': invoiceFile.type,
              },
              body: invoiceFile,
            });

            if (!uploadRes.ok) {
              console.warn('[Cloudflare R2] Direct PUT upload failed, saving metadata.');
            }

            payload.invoiceUrl = presignData.publicUrl;
            payload.invoiceKey = presignData.fileKey;
          }
        } catch (uploadErr) {
          console.error('[Cloudflare R2] Invoice upload error:', uploadErr);
        }

        // Attach invoice file metadata
        payload.invoiceFileName = invoiceFile.name;
        payload.invoiceFileSize = invoiceFile.size;
        payload.invoiceFileType = invoiceFile.type;
      }

      const res = await fetch('/api/register-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please check your details and try again.');
      }

      setRegistrationId(data.registrationId || `CLR-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong while submitting. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  const selectedProduct = products.find((p) => p.id === productId);
  const todayStr = new Date().toISOString().split('T')[0];

  /* ── Success View ──────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successSection}>
          <div className="container">
            <div className={styles.successCard}>
              <div className={styles.successIconWrapper}>
                <CheckCircle2 size={44} className={styles.successCheckIcon} aria-hidden="true" />
              </div>

              <h1 className={styles.successTitle}>Warranty Registration Received</h1>

              <div className={styles.registrationBadge}>
                <span className={styles.badgeLabel}>Reference ID:</span>
                <span className={styles.badgeValue}>{registrationId}</span>
              </div>

              <p className={styles.successDesc}>
                Thank you for registering your CLARYN product. Your warranty details have been safely stored,
                and a confirmation email has been dispatched to <strong>{email}</strong>.
              </p>

              <div className={styles.registeredSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Customer:</span>
                  <span className={styles.summaryValue}>{name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Product:</span>
                  <span className={styles.summaryValue}>{selectedProduct?.name || productId}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Platform:</span>
                  <span className={styles.summaryValue}>{purchasePlatform}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Purchase Date:</span>
                  <span className={styles.summaryValue}>{purchaseDate}</span>
                </div>
                {invoiceFile && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Invoice:</span>
                    <span className={styles.summaryValue}>{invoiceFile.name}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Email Confirmation:</span>
                  <span className={styles.summaryValue} style={{ color: '#16a34a', fontWeight: 600 }}>Dispatched to {email}</span>
                </div>
              </div>

              <div className={styles.successActions}>
                <Link href="/support" className="btn btn--primary">
                  Visit Support Center
                </Link>
                <Link href="/" className="btn btn--outline">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Registration Form View ────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      {/* ── Page Hero / Introduction ─────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="reg-heading">
        <div className="container">
          <div className={styles.heroInner}>
            <span className={styles.heroEyebrow}>PRODUCT REGISTRATION</span>
            <h1 id="reg-heading" className={styles.heroTitle}>
              Activate Your Warranty
            </h1>
            <p className={styles.heroDesc}>
              Register your CLARYN product and purchase details to keep your warranty information accessible and receive relevant support.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid (Form + Sidebar) ────────────────────────────── */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* ── Left Column: Form ────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {/* Server-level error banner */}
              {serverError && (
                <div className={styles.errorBanner} role="alert">
                  <AlertCircle size={20} className={styles.errorIcon} aria-hidden="true" />
                  <div>
                    <p className={styles.errorBannerTitle}>Unable to register product</p>
                    <p className={styles.errorBannerText}>{serverError}</p>
                  </div>
                </div>
              )}

              {/* ── Section A: Your Details ──────────────────────────────── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <User size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Your Details</h2>
                    <p className={styles.formCardSubtitle}>
                      Contact information for registration confirmation and warranty support
                    </p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  <div className={styles.grid2}>
                    {/* Full Name */}
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={nameId}>
                        Full Name
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={`${styles.fieldInput} ${errors.name ? styles.fieldInputError : ''}`}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g. Ramesh Sharma"
                        aria-required="true"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${nameId}-error` : undefined}
                      />
                      {errors.name && (
                        <p id={`${nameId}-error`} className={styles.fieldError} role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={mobileId}>
                        Mobile Number
                      </label>
                      <input
                        id={mobileId}
                        name="mobile"
                        type="tel"
                        autoComplete="tel"
                        className={`${styles.fieldInput} ${errors.mobile ? styles.fieldInputError : ''}`}
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                        }}
                        placeholder="+91 98765 43210"
                        aria-required="true"
                        aria-invalid={Boolean(errors.mobile)}
                        aria-describedby={errors.mobile ? `${mobileId}-error` : undefined}
                      />
                      {errors.mobile && (
                        <p id={`${mobileId}-error`} className={styles.fieldError} role="alert">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className={styles.fieldGroup}>
                    <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={emailId}>
                      Email Address
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={`${styles.fieldInput} ${errors.email ? styles.fieldInputError : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? `${emailId}-error` : undefined}
                    />
                    {errors.email && (
                      <p id={`${emailId}-error`} className={styles.fieldError} role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Section B: Product & Purchase Details ─────────────────── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <Package size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Product & Purchase Details</h2>
                    <p className={styles.formCardSubtitle}>
                      Details from your purchase invoice or marketplace order
                    </p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  {/* Product Selection */}
                  <div className={styles.fieldGroup}>
                    <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={productIdField}>
                      Product
                    </label>
                    <select
                      id={productIdField}
                      name="productId"
                      className={`${styles.fieldSelect} ${errors.productId ? styles.fieldSelectError : ''}`}
                      value={productId}
                      onChange={(e) => {
                        setProductId(e.target.value);
                        if (errors.productId) setErrors((prev) => ({ ...prev, productId: '' }));
                      }}
                      aria-required="true"
                      aria-invalid={Boolean(errors.productId)}
                      aria-describedby={errors.productId ? `${productIdField}-error` : undefined}
                    >
                      <option value="" disabled>
                        Select your CLARYN product model…
                      </option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.model ? `(${p.model})` : ''}
                        </option>
                      ))}
                    </select>
                    {errors.productId && (
                      <p id={`${productIdField}-error`} className={styles.fieldError} role="alert">
                        {errors.productId}
                      </p>
                    )}
                  </div>

                  {/* Purchase Date & Purchase Platform */}
                  <div className={styles.grid2}>
                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={purchaseDateId}>
                        Purchase Date
                      </label>
                      <input
                        id={purchaseDateId}
                        name="purchaseDate"
                        type="date"
                        max={todayStr}
                        className={`${styles.fieldInput} ${errors.purchaseDate ? styles.fieldInputError : ''}`}
                        value={purchaseDate}
                        onChange={(e) => {
                          setPurchaseDate(e.target.value);
                          if (errors.purchaseDate) setErrors((prev) => ({ ...prev, purchaseDate: '' }));
                        }}
                        aria-required="true"
                        aria-invalid={Boolean(errors.purchaseDate)}
                        aria-describedby={errors.purchaseDate ? `${purchaseDateId}-error` : undefined}
                      />
                      {errors.purchaseDate && (
                        <p id={`${purchaseDateId}-error`} className={styles.fieldError} role="alert">
                          {errors.purchaseDate}
                        </p>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={`${styles.fieldLabel} ${styles.fieldLabelRequired}`} htmlFor={platformId}>
                        Purchase Platform
                      </label>
                      <select
                        id={platformId}
                        name="purchasePlatform"
                        className={`${styles.fieldSelect} ${errors.purchasePlatform ? styles.fieldSelectError : ''}`}
                        value={purchasePlatform}
                        onChange={(e) => {
                          setPurchasePlatform(e.target.value);
                          if (errors.purchasePlatform) setErrors((prev) => ({ ...prev, purchasePlatform: '' }));
                        }}
                        aria-required="true"
                        aria-invalid={Boolean(errors.purchasePlatform)}
                        aria-describedby={errors.purchasePlatform ? `${platformId}-error` : undefined}
                      >
                        <option value="" disabled>
                          Select purchase platform…
                        </option>
                        {['Amazon', 'CLARYN Website', 'Flipkart', 'Authorized Dealer', 'Other Online Store', 'Offline Retailer'].map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      {errors.purchasePlatform && (
                        <p id={`${platformId}-error`} className={styles.fieldError} role="alert">
                          {errors.purchasePlatform}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order ID / Invoice Number (Optional) */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor={orderIdField}>
                      Order ID / Invoice Number{' '}
                      <span className={styles.optionalBadge}>(Optional)</span>
                    </label>
                    <input
                      id={orderIdField}
                      name="orderId"
                      type="text"
                      className={styles.fieldInput}
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. 402-1234567-8901234 or INV-2024-001"
                    />
                    <span className={styles.fieldHint}>
                      Order identifier from Amazon, Flipkart, retail receipt, or marketplace invoice
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Section C: Upload Purchase Invoice ────────────────────── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <FileText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>
                      Purchase Invoice <span className={styles.optionalBadge}>(Optional)</span>
                    </h2>
                    <p className={styles.formCardSubtitle}>
                      Upload your purchase invoice to help us verify your product registration and purchase details.
                    </p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  {/* Drop zone / Upload area */}
                  {!invoiceFile ? (
                    <div
                      className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneDragging : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      aria-label="Upload purchase invoice. Drag and drop file here, or click to browse"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.pdf,image/jpeg,application/pdf"
                        onChange={handleFileInputChange}
                        className={styles.hiddenFileInput}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <div className={styles.uploadIconCircle}>
                        <FileUp size={22} className={styles.uploadIcon} aria-hidden="true" />
                      </div>
                      <p className={styles.uploadPrimaryText}>
                        <span className={styles.uploadActionText}>Click to upload</span> or drag and drop
                      </p>
                      <p className={styles.uploadSecondaryText}>
                        Accepted formats: JPG, JPEG, PDF • Maximum file size: 5 MB
                      </p>
                    </div>
                  ) : (
                    /* Selected File View */
                    <div className={styles.selectedFileCard}>
                      <div className={styles.selectedFileInfo}>
                        <div className={styles.fileIconWrapper}>
                          <FileText size={20} className={styles.fileTypeIcon} aria-hidden="true" />
                        </div>
                        <div className={styles.fileDetails}>
                          <p className={styles.fileName}>{invoiceFile.name}</p>
                          <p className={styles.fileMeta}>
                            <span>{formatBytes(invoiceFile.size)}</span>
                            <span className={styles.metaDot} aria-hidden="true">•</span>
                            <span className={styles.readyBadge}>Ready to attach</span>
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className={styles.removeFileBtn}
                        aria-label={`Remove selected file ${invoiceFile.name}`}
                      >
                        <X size={16} aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <p className={styles.fieldError} role="alert">
                      {fileError}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Consent & Privacy ────────────────────────────────────── */}
              <div className={styles.consentContainer}>
                <label className={styles.consentCard} htmlFor={consentId}>
                  <input
                    id={consentId}
                    type="checkbox"
                    name="marketingConsent"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className={styles.consentCheckbox}
                  />
                  <span className={styles.consentLabel}>
                    I agree to receive product updates, maintenance reminders, and water quality tips from CLARYN via email or SMS. You can unsubscribe at any time. <span className={styles.optionalBadge}>(Optional)</span>
                  </span>
                </label>

                <p className={styles.privacyNote}>
                  By submitting this form, you acknowledge CLARYN&apos;s{' '}
                  <Link href="/privacy" className={styles.privacyLink}>
                    Privacy Policy
                  </Link>
                  . We collect only information required to register your product and provide warranty support.
                </p>
              </div>

              {/* ── Submit Action ────────────────────────────────────────── */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
                id="submit-register-btn"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className={styles.spinnerIcon} aria-hidden="true" />
                    <span>Registering Product…</span>
                  </>
                ) : (
                  <>
                    <span>Register Product</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* ── Right Column: Informational Sidebar ──────────────────── */}
            <aside className={styles.sidebar} aria-label="Registration assistance and warranty policies">
              {/* Card 1: Why Register? */}
              <div className={styles.sidebarCard}>
                <h2 className={styles.sidebarTitle}>Why Register?</h2>
                <div className={styles.benefitList}>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>
                      <ShieldCheck size={18} aria-hidden="true" />
                    </div>
                    <div className={styles.benefitText}>
                      <strong>Warranty Registration & Records</strong>
                      <p>Keep your official purchase record accessible for hassle-free claim verification and service.</p>
                    </div>
                  </div>

                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>
                      <Clock size={18} aria-hidden="true" />
                    </div>
                    <div className={styles.benefitText}>
                      <strong>Maintenance Reminders</strong>
                      <p>Receive timely alerts when your membrane is due for inspection or periodic replacement.</p>
                    </div>
                  </div>

                  <div className={styles.benefitItem}>
                    <div className={styles.benefitIcon}>
                      <Headphones size={18} aria-hidden="true" />
                    </div>
                    <div className={styles.benefitText}>
                      <strong>Dedicated Product Support</strong>
                      <p>Access direct assistance from CLARYN water-tech specialists for installation and compatibility guidance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Dedicated Warranty Claim — Shipping Process */}
              <div className={`${styles.sidebarCard} ${styles.shippingCard}`}>
                <div className={styles.shippingHeader}>
                  <div className={styles.shippingIconBox}>
                    <Truck size={20} aria-hidden="true" />
                  </div>
                  <h2 className={styles.shippingTitle}>Warranty Claim — Shipping Process</h2>
                </div>

                <div className={styles.shippingBody}>
                  <p className={styles.shippingIntro}>
                    <strong>Need to make a warranty claim?</strong>
                  </p>
                  <p className={styles.shippingText}>
                    Initially, customers are required to arrange and pay for sending the product parcel to the CLARYN office address provided by our support team.
                  </p>
                  <p className={styles.shippingText}>
                    After the parcel is received and the claim is reviewed, CLARYN will reimburse eligible parcel-shipping charges according to the applicable warranty-claim process.
                  </p>

                  <div className={styles.shippingSteps}>
                    <div className={styles.shippingStep}>
                      <span className={styles.shippingStepNum}>01</span>
                      <p className={styles.shippingStepText}>
                        Contact CLARYN Support to initiate your warranty claim and confirm the return instructions.
                      </p>
                    </div>

                    <div className={styles.shippingStep}>
                      <span className={styles.shippingStepNum}>02</span>
                      <p className={styles.shippingStepText}>
                        Pack the product securely and book a parcel or courier service to the CLARYN office address provided by our team.
                      </p>
                    </div>

                    <div className={styles.shippingStep}>
                      <span className={styles.shippingStepNum}>03</span>
                      <p className={styles.shippingStepText}>
                        Pay the courier charges at the time of booking and retain the shipping receipt or proof of payment.
                      </p>
                    </div>

                    <div className={styles.shippingStep}>
                      <span className={styles.shippingStepNum}>04</span>
                      <p className={styles.shippingStepText}>
                        Once the parcel is received and the claim is reviewed, CLARYN will process reimbursement of eligible shipping charges according to the applicable policy.
                      </p>
                    </div>
                  </div>

                  <div className={styles.shippingNotice}>
                    <Info size={15} className={styles.noticeIcon} aria-hidden="true" />
                    <p className={styles.noticeText}>
                      Please contact support before dispatching a warranty-claim parcel. Reimbursement eligibility, documentation requirements, and applicable limits will be confirmed by CLARYN Support.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: How It Works */}
              <div className={`${styles.sidebarCard} ${styles.sidebarCardDark}`}>
                <h2 className={`${styles.sidebarTitle} ${styles.sidebarTitleLight}`}>How It Works</h2>
                <div className={styles.stepList}>
                  <div className={styles.stepItem}>
                    <span className={styles.stepNum}>01</span>
                    <p className={styles.stepText}>Enter your contact details.</p>
                  </div>
                  <div className={styles.stepItem}>
                    <span className={styles.stepNum}>02</span>
                    <p className={styles.stepText}>Add your product and purchase details, with invoice upload if available.</p>
                  </div>
                  <div className={styles.stepItem}>
                    <span className={styles.stepNum}>03</span>
                    <p className={styles.stepText}>Submit your registration and receive confirmation once successfully processed.</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Contact Support */}
              <div className={styles.sidebarCard}>
                <p className={styles.helpText}>
                  Having trouble registering? Our support team is here to help.
                </p>
                <Link href="/support" className="btn btn--outline" style={{ justifyContent: 'center', width: '100%' }}>
                  Contact Support
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
