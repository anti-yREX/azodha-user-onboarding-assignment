import { Formik, Field, type FormikHelpers, type FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updatePaymentInfo, setPaymentInfoDone, selectPaymentInfo } from '@/store/onboardingDataSlice';

interface PaymentInfoFormValues {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

function PaymentInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const paymentInfo = useAppSelector(selectPaymentInfo);

  const initialValues: PaymentInfoFormValues = {
    cardNumber: paymentInfo.cardNumber,
    expiry: paymentInfo.expiry,
    cvv: paymentInfo.cvv,
  };

  // Format card number: add spaces every 4 digits
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  // Format expiry: MM/YY
  const formatExpiry = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  // Format CVV: digits only, max 4
  const formatCVV = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 4);
  };

  const validateForm = (values: PaymentInfoFormValues): Partial<Record<keyof PaymentInfoFormValues, string>> => {
    const errors: Partial<Record<keyof PaymentInfoFormValues, string>> = {};

    // Card number validation
    const cardNumberDigits = values.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      errors.cardNumber = 'Card number is required';
    } else if (cardNumberDigits.length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }

    // Expiry validation
    if (!values.expiry) {
      errors.expiry = 'Expiry date is required';
    } else {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!expiryRegex.test(values.expiry)) {
        errors.expiry = 'Invalid format. Use MM/YY';
      } else {
        const [month, year] = values.expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        const expiryYear = parseInt(year, 10);
        const expiryMonth = parseInt(month, 10);

        if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
          errors.expiry = 'Card has expired';
        }
      }
    }

    // CVV validation
    if (!values.cvv) {
      errors.cvv = 'CVV is required';
    } else if (values.cvv.length < 3 || values.cvv.length > 4) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }

    return errors;
  };

  const handleSubmit = (
    values: PaymentInfoFormValues,
    { setSubmitting }: FormikHelpers<PaymentInfoFormValues>
  ) => {
    // Remove spaces from card number before saving
    const cardNumberDigits = values.cardNumber.replace(/\s/g, '');
    dispatch(updatePaymentInfo({ cardNumber: cardNumberDigits, expiry: values.expiry, cvv: values.cvv }));
    dispatch(setPaymentInfoDone(true));
    setSubmitting(false);
    navigate('/onboarding/success');
  };

  const handleBack = () => {
    navigate('/onboarding/favorite-songs');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Payment Information</h2>
        <p className="text-muted-foreground">Step 3: Enter your payment details</p>
      </div>

      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, setFieldValue, handleBlur, submitForm }: FormikProps<PaymentInfoFormValues>) => {
          const isFormValid = 
            (values.cardNumber || '').replace(/\s/g, '').length === 16 &&
            values.expiry &&
            (values.cvv || '').length >= 3;

          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formErrors = validateForm(values);
                if (Object.keys(formErrors).length === 0) {
                  submitForm();
                }
              }}
              className="space-y-6"
            >
              <div className="p-6 border border-border rounded-lg bg-card space-y-4">
                {/* Card Number Field */}
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium">
                    Card Number <span className="text-destructive">*</span>
                  </label>
                  <Field
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const formatted = formatCardNumber(e.target.value);
                      setFieldValue('cardNumber', formatted);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      handleBlur(e);
                      // Auto-save to Redux
                      const cardNumberDigits = values.cardNumber.replace(/\s/g, '');
                      dispatch(updatePaymentInfo({ cardNumber: cardNumberDigits }));
                    }}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <p className="text-sm text-destructive">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry and CVV Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Field */}
                  <div className="space-y-2">
                    <label htmlFor="expiry" className="block text-sm font-medium">
                      Expiry Date <span className="text-destructive">*</span>
                    </label>
                    <Field
                      id="expiry"
                      name="expiry"
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="MM/YY"
                      maxLength={5}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatExpiry(e.target.value);
                        setFieldValue('expiry', formatted);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        handleBlur(e);
                        // Auto-save to Redux
                        dispatch(updatePaymentInfo({ expiry: values.expiry }));
                      }}
                    />
                    {touched.expiry && errors.expiry && (
                      <p className="text-sm text-destructive">{errors.expiry}</p>
                    )}
                  </div>

                  {/* CVV Field */}
                  <div className="space-y-2">
                    <label htmlFor="cvv" className="block text-sm font-medium">
                      CVV <span className="text-destructive">*</span>
                    </label>
                    <Field
                      id="cvv"
                      name="cvv"
                      type="password"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="123"
                      maxLength={4}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatCVV(e.target.value);
                        setFieldValue('cvv', formatted);
                      }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        handleBlur(e);
                        // Auto-save to Redux
                        dispatch(updatePaymentInfo({ cvv: values.cvv }));
                      }}
                    />
                    {touched.cvv && errors.cvv && (
                      <p className="text-sm text-destructive">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Back and Next Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:shadow-md active:scale-[0.98] border-4 border-white"
                >
                  Next
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PaymentInfo;
