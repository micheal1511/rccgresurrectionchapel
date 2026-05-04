        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const loadingPage = document.getElementById('loadingPage');
            const progressBar = document.getElementById('progressBar');
            const connectionStatus = document.getElementById('connectionStatus');
            const networkSpeed = document.getElementById('networkSpeed');
            const accessStatus = document.getElementById('accessStatus');
            const messageBox = document.getElementById('messageBox');
            const messageText = document.getElementById('messageText');
            const enterBtn = document.getElementById('enterBtn');
            const retryBtn = document.getElementById('retryBtn');
            const autoRedirectNotice = document.getElementById('autoRedirectNotice');
            const countdownElement = document.getElementById('countdown');
            
            // Network check variables
            let networkCheckComplete = false;
            let networkSpeedValue = 0; // in Mbps
            let isOnline = navigator.onLine;
            let progress = 0;
            let countdownTimer;
            let autoRedirectEnabled = false;
            let countdownSeconds = 5;
            
            const HOMEPAGE_URL = 'home.html';

            const progressInterval = setInterval(() => {
                if (progress < 90) {
                    progress += 10;
                    progressBar.style.width = `${progress}%`;
                }
            }, 500);
            
            // Function to check network speed (simulated)
            function checkNetworkSpeed() {
                return new Promise((resolve) => {
                    // In a real app, you would measure actual network speed
                    // Here we simulate speed detection with random values
                    setTimeout(() => {
                        // Simulate different network conditions
                        const connectionTypes = ['offline', '2G', '3G', '4G', '5G', 'WiFi'];
                        const speeds = {
                            'offline': 0,
                            '2G': 0.1,
                            '3G': 1.5,
                            '4G': 25,
                            '5G': 100,
                            'WiFi': 50
                        };
                        
                        // Get a random connection type based on probability
                        let connectionType;
                        const rand = Math.random();
                        
                        if (!isOnline) {
                            connectionType = 'offline';
                        } else if (rand < 0.1) {
                            connectionType = 'offline'; // 10% chance offline
                        } else if (rand < 0.2) {
                            connectionType = '2G'; // 10% chance 2G
                        } else if (rand < 0.4) {
                            connectionType = '3G'; // 20% chance 3G
                        } else if (rand < 0.7) {
                            connectionType = '4G'; // 30% chance 4G
                        } else if (rand < 0.9) {
                            connectionType = '5G'; // 20% chance 5G
                        } else {
                            connectionType = 'WiFi'; // 10% chance WiFi
                        }
                        
                        networkSpeedValue = speeds[connectionType];
                        resolve({type: connectionType, speed: networkSpeedValue});
                    }, 1500);
                });
            }
            
            // Function to update connection status
            function updateConnectionStatus() {
                if (!isOnline) {
                    connectionStatus.textContent = 'Offline';
                    connectionStatus.classList.remove('connected');
                    return false;
                } else {
                    connectionStatus.textContent = 'Online';
                    connectionStatus.classList.add('connected');
                    return true;
                }
            }
            
            // Function to update network speed display
            function updateNetworkSpeed(speedInfo) {
                const {type, speed} = speedInfo;
                
                networkSpeed.textContent = `${type} (${speed.toFixed(1)} Mbps)`;
                
                if (speed === 0) {
                    networkSpeed.classList.remove('fast');
                    return false;
                } else if (speed >= 1.5) { // 3G speed or above
                    networkSpeed.classList.add('fast');
                    return true;
                } else {
                    networkSpeed.classList.remove('fast');
                    return false;
                }
            }
            
            // Function to determine access status
            function updateAccessStatus(isConnected, isFastEnough) {
                if (!isConnected) {
                    accessStatus.textContent = 'Denied';
                    accessStatus.classList.remove('granted');
                    messageText.textContent = 'No internet connection detected. Please check your network settings.';
                    messageBox.classList.add('show');
                    return false;
                } else if (!isFastEnough) {
                    accessStatus.textContent = 'Denied';
                    accessStatus.classList.remove('granted');
                    messageText.textContent = 'Your network connection is too slow. Please connect to a faster network (3G or above).';
                    messageBox.classList.add('show');
                    return false;
                } else {
                    accessStatus.textContent = 'Granted';
                    accessStatus.classList.add('granted');
                    messageBox.classList.remove('show');
                    return true;
                }
            }
            
            // Function to start auto-redirect countdown
            function startAutoRedirect() {
                autoRedirectEnabled = true;
                autoRedirectNotice.classList.add('show');
                countdownSeconds = 5;
                countdownElement.textContent = countdownSeconds;
                
                countdownTimer = setInterval(() => {
                    countdownSeconds--;
                    countdownElement.textContent = countdownSeconds;
                    
                    if (countdownSeconds <= 0) {
                        clearInterval(countdownTimer);
                        redirectToHomepage();
                    }
                }, 1000);
            }
            
            // Function to stop auto-redirect
            function stopAutoRedirect() {
                autoRedirectEnabled = false;
                autoRedirectNotice.classList.remove('show');
                if (countdownTimer) {
                    clearInterval(countdownTimer);
                }
            }
            
            // Function to redirect to homepage
            function redirectToHomepage() {
                // Store the network status in localStorage so your homepage can access it
                localStorage.setItem('networkChecked', 'true');
                localStorage.setItem('networkSpeed', networkSpeedValue.toFixed(1));
                localStorage.setItem('connectionType', isOnline ? 'Online' : 'Offline');
                
                // Redirect to the actual homepage
                window.location.href = "home.html";
            }
            
            // Function to complete the loading process
            function completeLoading() {
                clearInterval(progressInterval);
                progressBar.style.width = '100%';
                
                // Enable or disable the enter button based on access
                const isConnected = updateConnectionStatus();
                const isFastEnough = networkSpeedValue >= 1.5; // 3G threshold
                const accessGranted = updateAccessStatus(isConnected, isFastEnough);
                
                if (accessGranted) {
                    enterBtn.classList.add('active');
                    // Start auto-redirect after 2 seconds
                    setTimeout(startAutoRedirect, 2000);
                } else {
                    enterBtn.classList.remove('active');
                }
                
                networkCheckComplete = true;
            }
            
            // Main function to check network
            async function checkNetwork() {
                // First, check if online
                isOnline = navigator.onLine;
                updateConnectionStatus();
                
                // Check network speed
                const speedInfo = await checkNetworkSpeed();
                const isFastEnough = updateNetworkSpeed(speedInfo);
                
                // Complete the loading process
                completeLoading();
            }
            
            // Event listener for the enter button
            enterBtn.addEventListener('click', function() {
                if (!this.classList.contains('active')) return;
                
                // Stop auto-redirect if it's running
                stopAutoRedirect();
                
                // Redirect to homepage
                redirectToHomepage();
            });
            
            // Event listener for the retry button
            retryBtn.addEventListener('click', function() {
                // Stop auto-redirect if it's running
                stopAutoRedirect();
                
                // Reset and re-check network
                resetLoading();
                checkNetwork();
            });
            
            // Function to reset loading screen
            function resetLoading() {
                progress = 0;
                progressBar.style.width = '0%';
                connectionStatus.textContent = 'Checking...';
                connectionStatus.classList.remove('connected');
                networkSpeed.textContent = 'Testing...';
                networkSpeed.classList.remove('fast');
                accessStatus.textContent = 'Pending';
                accessStatus.classList.remove('granted');
                messageBox.classList.remove('show');
                enterBtn.classList.remove('active');
                networkCheckComplete = false;
                
                // Restart progress bar
                const newProgressInterval = setInterval(() => {
                    if (progress < 90 && !networkCheckComplete) {
                        progress += 10;
                        progressBar.style.width = `${progress}%`;
                    } else {
                        clearInterval(newProgressInterval);
                    }
                }, 500);
            }
            
            // Listen for online/offline events
            window.addEventListener('online', function() {
                if (!networkCheckComplete) {
                    isOnline = true;
                    updateConnectionStatus();
                }
            });
            
            window.addEventListener('offline', function() {
                if (!networkCheckComplete) {
                    isOnline = false;
                    updateConnectionStatus();
                    updateAccessStatus(false, false);
                }
            });
            
            // Start network check
            checkNetwork();
        });