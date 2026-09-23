'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './SolutionFinder.module.css';

const STEPS = [
  { id: 1, label: '01', title: 'Water source' },
  { id: 2, label: '02', title: 'Approximate TDS' },
  { id: 3, label: '03', title: 'Problem' },
  { id: 4, label: '04', title: 'Application' }
];

const DATA = {
  sources: ['Borewell', 'Municipal', 'Tanker', 'Mixed', 'Not Sure'],
  tds: ['Under 500 ppm', '500 - 1000 ppm', '1000 - 2000 ppm', 'Over 2000 ppm', 'Not Sure'],
  problems: ['Scale on taps', 'Bad taste/odor', 'Hardness', 'Visible particles', 'No obvious issues', 'Not Sure'],
  applications: ['Drinking & Cooking', 'Whole Home', 'Commercial', 'Replacement Parts', 'Not Sure']
};

export function SolutionFinder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderOptions = () => {
    let options: string[] = [];
    switch (currentStep) {
      case 1: options = DATA.sources; break;
      case 2: options = DATA.tds; break;
      case 3: options = DATA.problems; break;
      case 4: options = DATA.applications; break;
    }

    return (
      <div className={styles.optionsGrid}>
        {options.map(option => (
          <button
            key={option}
            className={`${styles.optionBtn} ${answers[currentStep] === option ? styles.selected : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className={styles.solutionFinder}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.headline}>Not sure what your water needs?</h2>
          <p className={styles.subtext}>Answer a few simple questions and explore where to start.</p>
        </div>

        <div className={styles.wizard}>
          {/* Progress Indicator */}
          <div className={styles.progressTracker}>
            {STEPS.map((step, idx) => (
              <div key={step.id} className={styles.progressItem}>
                <div className={`${styles.stepIndicator} ${currentStep >= step.id ? styles.stepActive : ''}`}>
                  {step.label}
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`${styles.stepLine} ${currentStep > step.id ? styles.lineActive : ''}`} />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>{STEPS[currentStep - 1].title}</h3>
            {renderOptions()}
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            {currentStep > 1 ? (
              <button className={styles.btnSecondary} onClick={handleBack}>
                Back
              </button>
            ) : (
              <div /> /* Spacer */
            )}

            {currentStep < 4 ? (
              <button 
                className={styles.btnPrimary} 
                onClick={handleNext}
                disabled={!answers[currentStep]}
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <Link 
                href="/find-your-solution" 
                className={`${styles.btnPrimary} ${!answers[currentStep] ? styles.disabled : ''}`}
                style={{ pointerEvents: !answers[currentStep] ? 'none' : 'auto' }}
              >
                Explore My Options <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
