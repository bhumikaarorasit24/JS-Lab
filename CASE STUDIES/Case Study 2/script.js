const website = "Online Store Enterprise";

function calculateBill() {
    // Get fields and assign default values to prevent calculation bugs
    const name = document.getElementById("cname").value || "Walk-in Customer";
    const mobile = document.getElementById("mobile").value || "N/A";
    const invoice = document.getElementById("invoice").value || "TEMP-" + Math.floor(Math.random() * 1000);
    const product = document.getElementById("product").value || "General Items";
    
    const qty = Number(document.getElementById("qty").value) || 0;
    const rate = Number(document.getElementById("rate").value) || 0;
    const discount = parseFloat(document.getElementById("discount").value) || 0;
    const gst = parseFloat(document.getElementById("gst").value) || 0;
    const packing = Number(document.getElementById("packing").value) || 0;
    const membership = document.getElementById("member").value === "Yes";
    const paymentMode = document.getElementById("payment").value;

    // Mathematical calculations
    const amount = qty * rate;
    const discountAmount = amount * (discount / 100);
    let subtotal = amount - discountAmount;

    if (membership) {
        subtotal = subtotal * 0.95; // Extra 5% discount
    }

    const gstAmount = subtotal * (gst / 100);
    const finalBill = subtotal + gstAmount + packing;

    // Inject structured elements cleanly into output container
    document.getElementById("result").innerHTML = `
        <div class="receipt-header">
            <strong>${website}</strong><br>
            <small>Invoice: ${invoice}</small>
        </div>
        <div class="receipt-row"><span>Customer:</span> <strong>${name}</strong></div>
        <div class="receipt-row"><span>Mobile:</span> <span>${mobile}</span></div>
        <div class="receipt-row"><span>Product:</span> <span>${product} (${qty} Kg @ ₹${rate}/Kg)</span></div>
        <hr>
        <div class="receipt-row"><span>Gross Amount:</span> <span>₹${amount.toFixed(2)}</span></div>
        <div class="receipt-row"><span>Trade Discount (${discount}%):</span> <span>-₹${discountAmount.toFixed(2)}</span></div>
        ${membership ? `<div class="receipt-row"><span>Membership Disc (5%):</span> <span>Applied</span></div>` : ''}
        <div class="receipt-row"><span>GST (${gst}%):</span> <span>+₹${gstAmount.toFixed(2)}</span></div>
        <div class="receipt-row"><span>Packing Charges:</span> <span>₹${packing.toFixed(2)}</span></div>
        <div class="receipt-row"><span>Mode of Payment:</span> <span>${paymentMode}</span></div>
        <div class="receipt-row receipt-total">
            <span>Total Payable:</span>
            <span>₹${finalBill.toFixed(2)}</span>
        </div>
    `;
}
