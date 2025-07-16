document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // API configuration (replace with your actual API endpoints)
    const apiConfig = {
        download: {
            start: '/api/download/start',
            progress: '/api/download/progress',
            result: '/api/download/result'
        },
        upload: {
            start: '/api/upload/start',
            progress: '/api/upload/progress',
            result: '/api/upload/result'
        }
    };

    // DOM elements
    const downloadSection = {
        startBtn: document.getElementById('start-download'),
        speed: document.getElementById('download-speed'),
        progress: document.getElementById('download-progress'),
        status: document.getElementById('download-status'),
        ping: document.getElementById('download-ping'),
        jitter: document.getElementById('download-jitter')
    };

    const uploadSection = {
        startBtn: document.getElementById('start-upload'),
        speed: document.getElementById('upload-speed'),
        progress: document.getElementById('upload-progress'),
        status: document.getElementById('upload-status'),
        ping: document.getElementById('upload-ping'),
        jitter: document.getElementById('upload-jitter')
    };

    // Test state
    let testInProgress = {
        download: false,
        upload: false
    };

    // Event listeners
    downloadSection.startBtn.addEventListener('click', () => startTest('download'));
    uploadSection.startBtn.addEventListener('click', () => startTest('upload'));

    /**
     * Starts a speed test (download or upload)
     * @param {string} type - 'download' or 'upload'
     */
    function startTest(type) {
        if (testInProgress[type]) return;
        
        const section = type === 'download' ? downloadSection : uploadSection;
        testInProgress[type] = true;
        
        // Update UI
        section.startBtn.disabled = true;
        section.startBtn.textContent = 'Testing...';
        section.status.textContent = 'Initializing test...';
        section.speed.textContent = '0.00';
        section.progress.style.width = '0%';
        
        // Simulate API calls (replace with actual API calls)
        simulateTest(type, section);
    }

    /**
     * Simulates a speed test (replace with actual API calls)
     * @param {string} type - 'download' or 'upload'
     * @param {object} section - The DOM elements for the test section
     */
    function simulateTest(type, section) {
        let progress = 0;
        let speed = 0;
        let maxSpeed = type === 'download' ? 
            (Math.random() * 100 + 20) :  // Download typically faster
            (Math.random() * 30 + 5);     // Upload typically slower
        
        // Simulate ping and jitter
        const ping = Math.floor(Math.random() * 30 + 5);
        const jitter = (Math.random() * 5 + 1).toFixed(2);
        
        section.ping.textContent = `${ping} ms`;
        section.jitter.textContent = `${jitter} ms`;
        
        // Update progress
        const interval = setInterval(() => {
            progress += 2;
            if (progress > 100) progress = 100;
            
            // Calculate current speed (peaks around 50% progress)
            speed = maxSpeed * Math.sin((progress / 100) * Math.PI) * 0.95 + 
                    (Math.random() * maxSpeed * 0.1);
            
            // Update UI
            section.progress.style.width = `${progress}%`;
            section.speed.textContent = speed.toFixed(2);
            section.status.textContent = getStatusMessage(type, progress);
            
            // Test complete
            if (progress >= 100) {
                clearInterval(interval);
                testComplete(type, section, speed, ping, jitter);
            }
        }, 100);
    }

    /**
     * Gets a status message based on test progress
     * @param {string} type - 'download' or 'upload'
     * @param {number} progress - Current progress percentage
     * @returns {string} Status message
     */
    function getStatusMessage(type, progress) {
        if (progress < 20) return `Starting ${type} test...`;
        if (progress < 40) return `Measuring ${type} speed...`;
        if (progress < 60) return `Analyzing connection quality...`;
        if (progress < 80) return `Finalizing ${type} test...`;
        return `Completing ${type} test...`;
    }

    /**
     * Handles test completion
     * @param {string} type - 'download' or 'upload'
     * @param {object} section - The DOM elements for the test section
     * @param {number} speed - Final speed in Mbps
     * @param {number} ping - Ping in ms
     * @param {number} jitter - Jitter in ms
     */
    function testComplete(type, section, speed, ping, jitter) {
        testInProgress[type] = false;
        
        // Update UI
        section.startBtn.disabled = false;
        section.startBtn.textContent = 'Run Again';
        section.status.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} test complete!`;
        
        // Here you would send the results to your backend if needed
        // sendResultsToBackend(type, speed, ping, jitter);
        
        console.log(`${type} test results - Speed: ${speed.toFixed(2)} Mbps, Ping: ${ping} ms, Jitter: ${jitter} ms`);
    }

    /**
     * Example function to send results to your backend
     * (Uncomment and implement when your API is ready)
     */
    /*
    function sendResultsToBackend(type, speed, ping, jitter) {
        fetch('/api/save-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                testType: type,
                speed: speed,
                ping: ping,
                jitter: jitter,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Results saved:', data);
        })
        .catch(error => {
            console.error('Error saving results:', error);
        });
    }
    */
});