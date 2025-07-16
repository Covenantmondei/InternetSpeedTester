document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();

    const startTestBtn = document.getElementById('start-test');
    const downloadSection = {
        speed: document.getElementById('download-speed'),
        status: document.getElementById('download-status'),
        progress: document.getElementById('download-progress'),
        ping: document.getElementById('download-ping'),
        jitter: document.getElementById('download-jitter')
    };
    const uploadSection = {
        speed: document.getElementById('upload-speed'),
        status: document.getElementById('upload-status'),
        progress: document.getElementById('upload-progress'),
        ping: document.getElementById('upload-ping'),
        jitter: document.getElementById('upload-jitter')
    };

    let animInterval;

    startTestBtn.addEventListener('click', () => {
        startTestBtn.disabled = true;
        startTestBtn.textContent = 'Testing...';

        // Start animation
        let progress = 0;
        animInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;

            // Random readings
            downloadSection.speed.textContent = (Math.random() * 100).toFixed(2);
            uploadSection.speed.textContent = (Math.random() * 50).toFixed(2);
            downloadSection.ping.textContent = `${(Math.random() * 50 + 1).toFixed(2)} ms`;
            uploadSection.ping.textContent = `${(Math.random() * 50 + 1).toFixed(2)} ms`;
            downloadSection.progress.style.width = `${progress}%`;
            uploadSection.progress.style.width = `${progress}%`;
            downloadSection.status.textContent = 'Testing...';
            uploadSection.status.textContent = 'Testing...';
        }, 150);

        fetch('http://127.0.0.1:8000/internet/test')
            .then(response => response.json())
            .then(data => {
                clearInterval(animInterval);

                // Update download section
                downloadSection.speed.textContent = data.Download;
                downloadSection.status.textContent = 'Download test complete!';
                downloadSection.progress.style.width = '100%';
                downloadSection.ping.textContent = `${data.Ping} ms`;

                // Update upload section
                uploadSection.speed.textContent = data.Upload;
                uploadSection.status.textContent = 'Upload test complete!';
                uploadSection.progress.style.width = '100%';
                uploadSection.ping.textContent = `${data.Ping} ms`;

                startTestBtn.disabled = false;
                startTestBtn.textContent = 'Test Speed';
            })
            .catch(error => {
                clearInterval(animInterval);
                downloadSection.status.textContent = 'Error!';
                uploadSection.status.textContent = 'Error!';
                startTestBtn.disabled = false;
                startTestBtn.textContent = 'Test Speed';
            });
    });
});