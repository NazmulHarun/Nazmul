const contactForm = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');
const emailBtn = document.getElementById('sendEmailBtn');

// 1. Feedback Logic
function showStatus(msg, isError = false) {
    statusDiv.textContent = msg;
    statusDiv.style.display = "block";
    statusDiv.className = isError ? "status-message status-error" : "status-message status-success";
    setTimeout(() => { statusDiv.style.display = "none"; }, 5000);
}

// 2. Formspree API Call
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    emailBtn.disabled = true;
    emailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(e.target);
    
    try {
        const response = await fetch("https://formspree.io/f/xrejwjyv", {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            showStatus("✅ Success! I'll get back to you shortly.");
            contactForm.reset();
        } else {
            showStatus("❌ There was an error. Try WhatsApp?", true);
        }
    } catch (err) {
        showStatus("❌ Connection lost. Please check your internet.", true);
    } finally {
        emailBtn.disabled = false;
        emailBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});

// 3. WhatsApp Obfuscation
document.getElementById('sendWhatsAppBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const msg = document.getElementById('message').value.trim();
    if (!name || !msg) return showStatus("❌ Please enter your name and message.", true);

    const phoneNumber = atob("ODgwMTg2NTk3NjAxOA=="); // Your obfuscated number
    window.open(`https://wa.me/${phoneNumber}?text=*Portfolio Message*%0AFrom: ${name}%0A${encodeURIComponent(msg)}`, '_blank');
});

// 4. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
