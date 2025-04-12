let qrInterval;

function generateQRCode(data) {
    const canvas = document.getElementById("qrcode");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    QRCode.toCanvas(canvas, data, { width: 200 }, function (error) {
        if (error) console.error(error);
    });
}

function startQRTimer() {
    let timeLeft = 180;

    function updateTimer() {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        document.getElementById("timer").textContent = `Reset za: ${min}:${sec < 10 ? "0" + sec : sec}`;
    }

    function newCode() {
        const payload = "QR-" + Math.random().toString(36).substring(2, 10);
        generateQRCode(payload);
        timeLeft = 180;
    }

    clearInterval(qrInterval);
    newCode();
    updateTimer();

    qrInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) newCode();
        updateTimer();
    }, 1000);
}

document.getElementById("show_qr").addEventListener("click", () => {
    document.getElementById("qr_area").classList.remove("hidden");
    document.getElementById("scanner_area").classList.add("hidden");
    startQRTimer();
});

document.getElementById("scan_qr").addEventListener("click", () => {
    document.getElementById("scanner_area").classList.remove("hidden");
    document.getElementById("qr_area").classList.add("hidden");

    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        qrCodeMessage => {
            document.getElementById("scan_result").textContent = `Zeskanowano: ${qrCodeMessage}`;
            html5QrCode.stop(); // zatrzymuje kamerę po wykryciu
        },
        errorMessage => {
            // opcjonalnie: console.log("Nieudane skanowanie:", errorMessage);
        }
    ).catch(err => {
        document.getElementById("scan_result").textContent = `Błąd: ${err}`;
    });
});
