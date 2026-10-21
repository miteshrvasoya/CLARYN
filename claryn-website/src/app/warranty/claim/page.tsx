'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  UploadCloud,
  FileText,
  X,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Info,
  Loader2,
  HelpCircle,
} from 'lucide-react';
import styles from './page.module.css';
import { products } from '@/data/products';

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
];
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const PURCHASE_PLATFORMS = [
  'Amazon',
  'CLARYN Website',
  'Flipkart',
  'Authorized Dealer',
  'Other Online Store',
  'Offline Retailer',
];

const ISSUE_CATEGORIES = [
  'High TDS / Low Salt Rejection',
  'Low Purified Flow / No Flow',
  'Membrane Leakage / Structural Concern',
  'Odor or Taste Issue',
  'Premature Clogging / Rapid Flow Drop',
  'Other Technical Concern',
];

export default function WarrantyClaimPage() {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchasePlatform, setPurchasePlatform] = useState('');
  const [orderId, setOrderId] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [sourceTDS, setSourceTDS] = useState('');
  const [purifiedTDS, setPurifiedTDS] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // File Upload State
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status & Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [claimReferenceId, setClaimReferenceId] = useState('');

  // Validate Indian mobile numbers
  function validateIndianMobile(num: string): boolean {
    const cleaned = num.replace(/[\s\-\(\)]/g, '');
    const re = /^(?:\+?91|0)?[6-9]\d{9}$/;
    return re.test(cleaned);
  }

  // Validate email address
  function validateEmail(mail: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(mail.trim());
  }

  // Client-side form validation
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters).';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!validateIndianMobile(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
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

    if (!issueCategory) {
      newErrors.issueCategory = 'Please select the primary issue category.';
    }

    if (!issueDescription.trim() || issueDescription.trim().length < 10) {
      newErrors.issueDescription = 'Please provide details of the issue (at least 10 characters).';
    }

    if (!termsAccepted) {
      newErrors.terms = 'Please acknowledge that the product was operated within rated conditions.';
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
      setFileError('Unsupported file type. Please upload a JPG, JPEG, PNG, or PDF file.');
      setAttachmentFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File exceeds 5 MB size limit. Please choose a smaller file.');
      setAttachmentFile(null);
      return;
    }

    setAttachmentFile(file);
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
    setAttachmentFile(null);
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

  // Form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload: Record<string, unknown> = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        productId,
        purchaseDate,
        purchasePlatform,
        orderId: orderId.trim() || undefined,
        registrationId: registrationId.trim() || undefined,
        issueCategory,
        issueDescription: issueDescription.trim(),
        sourceTDS: sourceTDS.trim() || undefined,
        purifiedTDS: purifiedTDS.trim() || undefined,
      };

      // Upload file directly to Cloudflare R2 if present
      if (attachmentFile) {
        try {
          const presignRes = await fetch('/api/upload-presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: attachmentFile.name,
              fileType: attachmentFile.type,
              fileSize: attachmentFile.size,
            }),
          });

          const presignData = await presignRes.json();
          if (presignRes.ok && presignData.presignedUrl) {
            const uploadRes = await fetch(presignData.presignedUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': attachmentFile.type,
              },
              body: attachmentFile,
            });

            if (!uploadRes.ok) {
              console.warn('[Cloudflare R2] Claim attachment direct PUT failed.');
            }

            payload.attachmentUrl = presignData.publicUrl;
            payload.attachmentFileName = attachmentFile.name;
            payload.attachmentFileSize = attachmentFile.size;
            payload.attachmentFileType = attachmentFile.type;
          }
        } catch (uploadErr) {
          console.error('[Cloudflare R2] Claim attachment upload error:', uploadErr);
          payload.attachmentFileName = attachmentFile.name;
        }
      }

      const res = await fetch('/api/warranty/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Claim submission failed. Please check your details and try again.');
      }

      setClaimReferenceId(data.claimId || `CLR-CLM-${Date.now().toString(36).toUpperCase()}`);
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

  /* ── Success Screen ──────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successSection}>
          <div className="container">
            <div className={styles.successCard}>
              <div className={styles.successIconWrapper}>
                <CheckCircle2 size={44} aria-hidden="true" />
              </div>

              <h1 className={styles.successTitle}>Warranty Claim Received</h1>

              <div className={styles.claimBadge}>
                <span className={styles.badgeLabel}>Claim Tracking ID:</span>
                <span className={styles.badgeValue}>{claimReferenceId}</span>
              </div>

              <p className={styles.successDesc}>
                Thank you, <strong>{name}</strong>. Your warranty claim has been recorded and assigned to our technical support team. A confirmation email has been dispatched to <strong>{email}</strong>.
              </p>

              <div className={styles.claimSummaryTable}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Customer Name:</span>
                  <span className={styles.summaryValue}>{name}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Product:</span>
                  <span className={styles.summaryValue}>{selectedProduct?.name || productId}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Primary Issue:</span>
                  <span className={styles.summaryValue}>{issueCategory}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Purchase Date:</span>
                  <span className={styles.summaryValue}>{purchaseDate}</span>
                </div>
                {attachmentFile && (
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Uploaded Document:</span>
                    <span className={styles.summaryValue}>{attachmentFile.name}</span>
                  </div>
                )}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Status:</span>
                  <span className={styles.summaryValue} style={{ color: '#0369a1' }}>Pending Review (1–2 business days)</span>
                </div>
              </div>

              <div className={styles.nextStepsBox}>
                <div className={styles.nextStepsTitle}>Next Steps for Your Claim</div>
                <p className={styles.nextStepsText}>
                  Our engineering team will review your claim data and contact you via email or phone within 1–2 business days.
                  If parcel inspection is required, our support team will provide return instructions, authorization, and destination shipping address.
                </p>
              </div>

              <div className={styles.successActions}>
                <Link href="/" className="btn btn--primary">
                  Return to Home
                </Link>
                <Link href="/support" className="btn btn--outline">
                  Visit Support Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Claim Form View ─────────────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      {/* ── Hero Introduction Banner ───────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="claim-heading">
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/warranty" className={styles.breadcrumbLink}>
                Warranty
              </Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>Submit a Claim</span>
            </nav>

            <span className={styles.heroEyebrow}>WARRANTY SERVICES</span>
            <h1 id="claim-heading" className={styles.heroTitle}>
              Submit a Warranty Claim
            </h1>
            <p className={styles.heroDesc}>
              Experiencing an issue with your CLARYN product? Fill in the details below to initiate our verified warranty support and inspection process.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid (Form + Sidebar) ──────────────────────────────── */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.contentGrid}>

            {/* Left Column: Form */}
            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              {serverError && (
                <div className={styles.errorBanner} role="alert">
                  <AlertCircle size={20} className={styles.errorIcon} aria-hidden="true" />
                  <div>
                    <h3 className={styles.errorBannerTitle}>Unable to submit claim</h3>
                    <p className={styles.errorBannerText}>{serverError}</p>
                  </div>
                </div>
              )}

              {/* ── Section A: Contact Details ── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <ShieldCheck size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Section A — Your Contact Details</h2>
                    <p className={styles.formCardSubtitle}>We will contact you here regarding claim status and return instructions</p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  <div className={styles.formGroup}>
                    <label htmlFor="claim-name" className={styles.formLabel}>
                      Full Name <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      id="claim-name"
                      type="text"
                      className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      required
                    />
                    {errors.name && (
                      <span className={styles.errorMessage} role="alert">
                        <AlertCircle size={14} aria-hidden="true" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="claim-phone" className={styles.formLabel}>
                        Mobile Number <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="claim-phone"
                        type="tel"
                        className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        required
                      />
                      {errors.phone && (
                        <span className={styles.errorMessage} role="alert">
                          <AlertCircle size={14} aria-hidden="true" /> {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="claim-email" className={styles.formLabel}>
                        Email Address <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="claim-email"
                        type="email"
                        className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                        placeholder="e.g. vikram@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        required
                      />
                      {errors.email && (
                        <span className={styles.errorMessage} role="alert">
                          <AlertCircle size={14} aria-hidden="true" /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section B: Product & Purchase Details ── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <FileText size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Section B — Product & Purchase Information</h2>
                    <p className={styles.formCardSubtitle}>Identifies your product and confirms warranty coverage</p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  <div className={styles.formGroup}>
                    <label htmlFor="claim-product" className={styles.formLabel}>
                      Product <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                      id="claim-product"
                      className={`${styles.formSelect} ${errors.productId ? styles.inputError : ''}`}
                      value={productId}
                      onChange={(e) => {
                        setProductId(e.target.value);
                        if (errors.productId) setErrors({ ...errors, productId: '' });
                      }}
                      required
                    >
                      <option value="">Select your CLARYN product…</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} {p.model ? `(${p.model})` : ''}
                        </option>
                      ))}
                    </select>
                    {errors.productId && (
                      <span className={styles.errorMessage} role="alert">
                        <AlertCircle size={14} aria-hidden="true" /> {errors.productId}
                      </span>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="claim-purchase-date" className={styles.formLabel}>
                        Purchase Date <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="claim-purchase-date"
                        type="date"
                        max={todayStr}
                        className={`${styles.formInput} ${errors.purchaseDate ? styles.inputError : ''}`}
                        value={purchaseDate}
                        onChange={(e) => {
                          setPurchaseDate(e.target.value);
                          if (errors.purchaseDate) setErrors({ ...errors, purchaseDate: '' });
                        }}
                        required
                      />
                      {errors.purchaseDate && (
                        <span className={styles.errorMessage} role="alert">
                          <AlertCircle size={14} aria-hidden="true" /> {errors.purchaseDate}
                        </span>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="claim-platform" className={styles.formLabel}>
                        Purchase Platform <span className={styles.requiredStar}>*</span>
                      </label>
                      <select
                        id="claim-platform"
                        className={`${styles.formSelect} ${errors.purchasePlatform ? styles.inputError : ''}`}
                        value={purchasePlatform}
                        onChange={(e) => {
                          setPurchasePlatform(e.target.value);
                          if (errors.purchasePlatform) setErrors({ ...errors, purchasePlatform: '' });
                        }}
                        required
                      >
                        <option value="">Select where you purchased…</option>
                        {PURCHASE_PLATFORMS.map((plat) => (
                          <option key={plat} value={plat}>
                            {plat}
                          </option>
                        ))}
                      </select>
                      {errors.purchasePlatform && (
                        <span className={styles.errorMessage} role="alert">
                          <AlertCircle size={14} aria-hidden="true" /> {errors.purchasePlatform}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="claim-reg-id" className={styles.formLabel}>
                        Registration Reference ID <span className={styles.optionalBadge}>(Optional)</span>
                      </label>
                      <input
                        id="claim-reg-id"
                        type="text"
                        className={styles.formInput}
                        placeholder="e.g. CLR-REG-XXXXXX"
                        value={registrationId}
                        onChange={(e) => setRegistrationId(e.target.value)}
                      />
                      <span className={styles.fieldHelper}>If you previously registered your warranty on our website</span>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="claim-orderid" className={styles.formLabel}>
                        Order ID / Invoice Number <span className={styles.optionalBadge}>(Optional)</span>
                      </label>
                      <input
                        id="claim-orderid"
                        type="text"
                        className={styles.formInput}
                        placeholder="e.g. 403-1283741-9871"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                      />
                      <span className={styles.fieldHelper}>From your marketplace or retailer order history</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section C: Issue & Operating Conditions ── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <AlertCircle size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Section C — Issue & Operating Conditions</h2>
                    <p className={styles.formCardSubtitle}>Help our technical team understand what problem occurred</p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  <div className={styles.formGroup}>
                    <label htmlFor="claim-category" className={styles.formLabel}>
                      Primary Issue Category <span className={styles.requiredStar}>*</span>
                    </label>
                    <select
                      id="claim-category"
                      className={`${styles.formSelect} ${errors.issueCategory ? styles.inputError : ''}`}
                      value={issueCategory}
                      onChange={(e) => {
                        setIssueCategory(e.target.value);
                        if (errors.issueCategory) setErrors({ ...errors, issueCategory: '' });
                      }}
                      required
                    >
                      <option value="">Select the primary problem…</option>
                      {ISSUE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.issueCategory && (
                      <span className={styles.errorMessage} role="alert">
                        <AlertCircle size={14} aria-hidden="true" /> {errors.issueCategory}
                      </span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="claim-issue" className={styles.formLabel}>
                      Describe the Problem in Detail <span className={styles.requiredStar}>*</span>
                    </label>
                    <textarea
                      id="claim-issue"
                      className={`${styles.formTextarea} ${errors.issueDescription ? styles.inputError : ''}`}
                      placeholder="Please explain the symptoms observed (e.g., when did the issue start, what was the purifer behavior, any visible damage, filter replacement history...)"
                      value={issueDescription}
                      onChange={(e) => {
                        setIssueDescription(e.target.value);
                        if (errors.issueDescription) setErrors({ ...errors, issueDescription: '' });
                      }}
                      required
                    />
                    {errors.issueDescription && (
                      <span className={styles.errorMessage} role="alert">
                        <AlertCircle size={14} aria-hidden="true" /> {errors.issueDescription}
                      </span>
                    )}
                  </div>

                  {/* Optional TDS Readings Box */}
                  <div className={styles.tdsBox}>
                    <div className={styles.tdsHeader}>
                      <Info size={16} aria-hidden="true" />
                      <span>Water TDS Readings (If measured with a TDS meter)</span>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="claim-source-tds" className={styles.formLabel}>
                          Raw / Feed Water TDS <span className={styles.optionalBadge}>(ppm)</span>
                        </label>
                        <input
                          id="claim-source-tds"
                          type="number"
                          className={styles.formInput}
                          placeholder="e.g. 800"
                          value={sourceTDS}
                          onChange={(e) => setSourceTDS(e.target.value)}
                        />
                        <span className={styles.fieldHelper}>Input water before the purifier</span>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="claim-purified-tds" className={styles.formLabel}>
                          Purified Water TDS <span className={styles.optionalBadge}>(ppm)</span>
                        </label>
                        <input
                          id="claim-purified-tds"
                          type="number"
                          className={styles.formInput}
                          placeholder="e.g. 60"
                          value={purifiedTDS}
                          onChange={(e) => setPurifiedTDS(e.target.value)}
                        />
                        <span className={styles.fieldHelper}>Output water after the RO membrane</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section D: Supporting Documents & Photos ── */}
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div className={styles.formCardIcon}>
                    <UploadCloud size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className={styles.formCardTitle}>Section D — Supporting Documents or Photos</h2>
                    <p className={styles.formCardSubtitle}>Attach purchase invoice or a photo showing the issue or membrane installation</p>
                  </div>
                </div>

                <div className={styles.formCardBody}>
                  {!attachmentFile ? (
                    <div
                      className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
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
                      aria-label="Upload document or photo"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className={styles.fileInputHidden}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileInputChange}
                      />
                      <div className={styles.dropzoneIconWrapper}>
                        <UploadCloud size={24} aria-hidden="true" />
                      </div>
                      <p className={styles.dropzoneTitle}>Click to browse or drag and drop files here</p>
                      <p className={styles.dropzoneHint}>Supports JPG, PNG, or PDF up to 5 MB</p>
                    </div>
                  ) : (
                    <div className={styles.selectedFileCard}>
                      <div className={styles.selectedFileInfo}>
                        <FileText size={28} className={styles.fileIcon} aria-hidden="true" />
                        <div>
                          <p className={styles.fileName}>{attachmentFile.name}</p>
                          <p className={styles.fileMeta}>{formatBytes(attachmentFile.size)} &bull; Ready for upload</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className={styles.removeFileBtn}
                        aria-label="Remove attached file"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>
                    </div>
                  )}

                  {fileError && (
                    <span className={styles.errorMessage} role="alert">
                      <AlertCircle size={14} aria-hidden="true" /> {fileError}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Declaration & Terms Checkbox ── */}
              <div className={styles.consentCard}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}
                  />
                  <span className={styles.checkboxText}>
                    I confirm that the product was installed in a compatible domestic RO system and operated under recommended pressure and temperature conditions.
                  </span>
                </label>
                {errors.terms && (
                  <span className={styles.errorMessage} role="alert" style={{ marginTop: '0.5rem' }}>
                    <AlertCircle size={14} aria-hidden="true" /> {errors.terms}
                  </span>
                )}
              </div>

              {/* ── Submit Button ── */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className={styles.spinner} aria-hidden="true" />
                    Submitting Warranty Claim…
                  </>
                ) : (
                  <>
                    Submit Warranty Claim
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            {/* Right Column: Helpful Information Sidebar */}
            <aside className={styles.sidebar}>

              {/* ── Highlighted Shipping Process Card ── */}
              <div className={`${styles.sidebarCard} ${styles.shippingCard}`}>
                <div className={styles.sidebarCardHeader}>
                  <Truck size={22} className={styles.sidebarCardIcon} aria-hidden="true" />
                  <h3 className={styles.sidebarCardTitle}>Warranty Claim — Shipping Process</h3>
                </div>

                <p className={styles.shippingIntro}>Need to make a warranty claim?</p>
                <p className={styles.shippingText}>
                  Initially, customers are required to arrange and pay for sending the product parcel to the CLARYN office address provided by our support team.
                  After the parcel is received and the claim is reviewed, CLARYN will reimburse eligible parcel-shipping charges according to the applicable warranty-claim process.
                </p>

                <div className={styles.processList}>
                  <div className={styles.processStep}>
                    <div className={styles.processStepNum}>01</div>
                    <div className={styles.processStepContent}>
                      <strong>Submit Claim & Confirm Instructions</strong>
                      Submit this form. Our support team will confirm eligibility and provide the destination office address.
                    </div>
                  </div>

                  <div className={styles.processStep}>
                    <div className={styles.processStepNum}>02</div>
                    <div className={styles.processStepContent}>
                      <strong>Pack & Book Courier</strong>
                      Pack the membrane securely and courier it to the CLARYN office address provided by our team.
                    </div>
                  </div>

                  <div className={styles.processStep}>
                    <div className={styles.processStepNum}>03</div>
                    <div className={styles.processStepContent}>
                      <strong>Retain Courier Receipt</strong>
                      Pay courier charges at booking and keep the official receipt or proof of payment.
                    </div>
                  </div>

                  <div className={styles.processStep}>
                    <div className={styles.processStepNum}>04</div>
                    <div className={styles.processStepContent}>
                      <strong>Inspection & Reimbursement</strong>
                      Once received and reviewed, CLARYN will process resolution and eligible shipping reimbursement.
                    </div>
                  </div>
                </div>

                <div className={styles.shippingNotice}>
                  <strong>Note:</strong> Please wait for support instructions before dispatching any parcel. Reimbursement eligibility and limits are confirmed by CLARYN Support.
                </div>
              </div>

              {/* ── Card 2: Coverage Policy ── */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <ShieldCheck size={20} className={styles.sidebarCardIcon} aria-hidden="true" />
                  <h3 className={styles.sidebarCardTitle}>Warranty Coverage Terms</h3>
                </div>

                <div className={styles.coverageList}>
                  <div className={styles.coverageItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                    <span><strong>Up to 6 Months Coverage:</strong> Applies from the date of purchase on authorized channels for eligible products.</span>
                  </div>
                  <div className={styles.coverageItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                    <span><strong>Defect Protection:</strong> Covers material flaws and premature filtration degradation.</span>
                  </div>
                  <div className={styles.coverageItem}>
                    <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                    <span><strong>Exclusions:</strong> Does not cover physical damage, dry running, or misuse beyond rated TDS.</span>
                  </div>
                </div>
              </div>

              {/* ── Card 3: Dedicated Support Helpline ── */}
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardHeader}>
                  <Phone size={20} className={styles.sidebarCardIcon} aria-hidden="true" />
                  <h3 className={styles.sidebarCardTitle}>CLARYN Support Center</h3>
                </div>

                <div className={styles.supportList}>
                  <div className={styles.supportItem}>
                    <Mail size={16} className={styles.supportIcon} aria-hidden="true" />
                    <a href="mailto:udartawatertech@gmail.com" className={styles.supportLink}>
                      udartawatertech@gmail.com
                    </a>
                  </div>
                  <div className={styles.supportItem}>
                    <Phone size={16} className={styles.supportIcon} aria-hidden="true" />
                    <span>+91 92748 41287</span>
                  </div>
                  <div className={styles.supportItem}>
                    <Clock size={16} className={styles.supportIcon} aria-hidden="true" />
                    <span>Mon – Sat &bull; 9:30 AM – 6:30 PM IST</span>
                  </div>
                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
