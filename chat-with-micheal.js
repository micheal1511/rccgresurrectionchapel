// File upload handling
        const fileInput = document.getElementById('file-input');
        const fileChosen = document.getElementById('file-chosen');
        const imagePreview = document.getElementById('image-preview');
        const form = document.getElementById('whatsappForm');
        
        // Update file chosen text and show preview
        fileInput.addEventListener('change', function() {
            const files = this.files;
            const fileNames = [];
            imagePreview.innerHTML = '';
            
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    fileNames.push(files[i].name);
                    
                    // Create image preview
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.classList.add('preview-image');
                        img.alt = `Preview ${i+1}`;
                        imagePreview.appendChild(img);
                    }
                    reader.readAsDataURL(files[i]);
                }
                
                if (files.length === 1) {
                    fileChosen.textContent = `1 file selected: ${fileNames[0]}`;
                } else {
                    fileChosen.textContent = `${files.length} files selected: ${fileNames.join(', ')}`;
                }
            } else {
                fileChosen.textContent = 'No files chosen';
            }
        });
        
        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate inputs
            if (!name || !phone || !message) {
                alert('Please fill in all required fields (Name, Phone, Message).');
                return;
            }
            
            // Validate phone number (basic validation)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number (without country code).');
                return;
            }
            
            // Format the message for WhatsApp
            // Replace YOUR_NUMBER_HERE with your actual WhatsApp number in international format
            // Example: +1234567890 (no spaces or dashes)
            const yourWhatsAppNumber = "+2348061428633"; // CHANGE THIS TO YOUR ACTUAL NUMBER
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(
                `Hello! I'm contacting you via your website.\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* +234${phone}\n` +
                `*Message:* ${message}\n\n` +
                `_This message was sent from your website contact form._`
            );
            
            // Create WhatsApp URL (images cannot be pre-loaded in WhatsApp Web)
            const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Show a confirmation message
            alert('Opening WhatsApp with your pre-filled message. Please review and send it.');
            
            // Optional: Reset the form
            // form.reset();
            // fileChosen.textContent = 'No files chosen';
            // imagePreview.innerHTML = '';
        });
        
        // Add some example images for demonstration
        window.addEventListener('DOMContentLoaded', function() {
            // This is just for demonstration - in a real implementation
            // you would handle actual file uploads
            
            // Add drag and drop functionality
            const fileContainer = document.querySelector('.file-input-container');
            
            fileContainer.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = '#25D366';
                this.style.backgroundColor = '#f0f9f0';
            });
            
            fileContainer.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.style.borderColor = '#ccc';
                this.style.backgroundColor = '#f9f9f9';
            });
            
            fileContainer.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = '#25D366';
                this.style.backgroundColor = '#f9f9f9';
                
                // Handle dropped files
                const files = e.dataTransfer.files;
                fileInput.files = files;
                
                // Trigger change event
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            });
        });