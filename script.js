// Smooth scroll for all internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form handling: Email & WhatsApp
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

function getFormData() {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const emailRaw = emailInput.value.trim();

    if (!name) {
        alert("❌ Please enter your name.");
        return null;
    }
    if (!message) {
        alert("❌ Please write your message/question.");
        return null;
    }
    return { name, message, emailRaw };
}

// Email: opens mail client
function handleEmail() {
    const data = getFormData();
    if (!data) return;
    const { name, message, emailRaw } = data;
    const recipient = "nazmul@secdev.com";
    const subject = `Portfolio inquiry from ${name}`;
    let body = `Name: ${name}\n`;
    if (emailRaw) body += `Reply-to email: ${emailRaw}\n`;
    body += `\nMessage:\n${message}\n\n— Sent from Nazmul portfolio contact form.`;
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
        alert("📧 Email client opened. Please review and send the message. Thank you!");
    }, 100);
}

// WhatsApp: opens wa.me with prefilled message
function handleWhatsApp() {
    const data = getFormData();
    if (!data) return;
    const { name, message, emailRaw } = data;
    const phoneNumber = "880123456789"; // demo number – replace with your actual WhatsApp
    let waText = `*New message from ${name}*%0A%0A${encodeURIComponent(message)}`;
    if (emailRaw) {
        waText += `%0A%0A📧 My email: ${encodeURIComponent(emailRaw)}`;
    }
    waText += `%0A%0A— Sent from your portfolio contact form.`;
    const waLink = `https://wa.me/${phoneNumber}?text=${waText}`;
    window.open(waLink, '_blank');
    alert(`💬 WhatsApp chat will open with ${phoneNumber}. You can review and send your question.`);
}

if (sendEmailBtn) sendEmailBtn.addEventListener('click', handleEmail);
if (sendWhatsAppBtn) sendWhatsAppBtn.addEventListener('click', handleWhatsApp);

// Optional: reset notice for any future enhancements
console.log("Portfolio ready — separate files, clean code.");