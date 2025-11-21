function PaymentInfo() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Payment Information</h2>
        <p className="text-muted-foreground">
          Step 3: Enter your payment details
        </p>
      </div>
      
      <div className="p-6 border border-border rounded-lg bg-card">
        <p className="text-sm text-muted-foreground">
          TODO: Add payment form fields (card number, expiry, CVV)
        </p>
      </div>
    </div>
  );
}

export default PaymentInfo;

