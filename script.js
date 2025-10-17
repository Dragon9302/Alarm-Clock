document.addEventListener('DOMContentLoaded', function() {
    const clockDisplay = document.getElementById('clock');
    const alarmTimeInput = document.getElementById('alarm-time');
    const setAlarmButton = document.getElementById('set-alarm');
    const clearAlarmButton = document.getElementById('clear-alarm');
    const statusDisplay = document.getElementById('status');

    let alarmTime = null;
    let alarmInterval = null;
    let snoozeTimeout = null;

    // Update clock display every second
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        clockDisplay.textContent = timeString;

        // Check alarm
        if (alarmTime) {
            const currentTime = now.getHours() * 60 + now.getMinutes();
            const alarmTimeValue = alarmTime.getHours() * 60 + alarmTime.getMinutes();

            if (currentTime === alarmTimeValue && now.getSeconds() === 0) {
                triggerAlarm();
            }
        }
    }

    // Set alarm
    setAlarmButton.addEventListener('click', function() {
        const timeValue = alarmTimeInput.value;
        if (timeValue) {
            const [hours, minutes] = timeValue.split(':');
            alarmTime = new Date();
            alarmTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            statusDisplay.textContent = `Alarm set for ${timeValue}`;
            setAlarmButton.disabled = true;
            clearAlarmButton.disabled = false;
        } else {
            alert('Please select a time for the alarm.');
        }
    });

    // Clear alarm
    clearAlarmButton.addEventListener('click', function() {
        alarmTime = null;
        statusDisplay.textContent = 'No alarm set';
        setAlarmButton.disabled = false;
        clearAlarmButton.disabled = true;
        if (alarmInterval) {
            clearInterval(alarmInterval);
            alarmInterval = null;
        }
        if (snoozeTimeout) {
            clearTimeout(snoozeTimeout);
            snoozeTimeout = null;
        }
    });

    // Trigger alarm
    function triggerAlarm() {
        // Speak the wake-up message
        speakWakeUpMessage();

        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Alarm!', {
                body: 'Wake up! It\'s time!',
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0VjE2QzE0IDE3LjEgMTMuMSAxOCA5Ljg5IDE4SDE0QzE0IDE5LjY1IDE1LjM1IDIxIDE3IDIxUzIwIDE5LjY1IDIwIDE4SDE0VjRDMTQgMi45IDEzLjEgMiAxMiAyWk00IDEwQzQgMTEuMSAzLjEgMTIgMiAxMloiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTIyIDRMMjAgMnoiIGZpbGw9IiM0Mjg1RjQiLz4KPC9zdmc+'
            });
        }

        // Play alarm sound (using Web Audio API for a simple beep)
        playAlarmSound();

        // Auto-snooze after 1 minute
        snoozeTimeout = setTimeout(() => {
            triggerAlarm();
        }, 60000); // 1 minute

        statusDisplay.textContent = 'ALARM! Wake up!';
    }

    // Text-to-speech function
    function speakWakeUpMessage() {
        const utterance = new SpeechSynthesisUtterance('Hey! It\'s morning, wake up now!');
        utterance.rate = 1.2;
        utterance.pitch = 1;
        utterance.volume = 1;

        // Get available voices and use a female voice if available
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('zira') || voice.name.toLowerCase().includes('susan'));
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        speechSynthesis.speak(utterance);
    }

    // Play alarm sound
    function playAlarmSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
// Register Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Start the clock
    updateClock();
    setInterval(updateClock, 1000);

    // Initialize button states
    clearAlarmButton.disabled = true;
});