document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            // Navigate to the corresponding page using href
            window.location.href = href;
        });
    });

    // Add event listener for submitting feedback form
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const feedbackData = {};
        formData.forEach((value, key) => {
            feedbackData[key] = value;
        });
        
    });
});
