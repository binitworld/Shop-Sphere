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
        // Connect to MongoDB using Mongoose
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/shopSphereDB', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to MongoDB');
                // Save feedback data to MongoDB
                const Feedback = require('./models/Feedback'); // Assuming you have a model named 'Feedback'
                const feedback = new Feedback(feedbackData);
                feedback.save().then(() => {
                    console.log("Feedback saved to MongoDB");
                    // Clear the form after saving feedback
                    feedbackForm.reset();
                }).catch((error) => {
                    console.log("Error saving feedback to MongoDB", error);
                });
            })
            .catch((error) => {
                console.log("Error connecting to MongoDB", error);
            });
    });
});
