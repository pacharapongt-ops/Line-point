async function main() {
    try {
        // เปลี่ยน YOUR_LIFF_ID เป็นไอดีที่คุณได้จาก LINE Developers Console
        await liff.init({ liffId: "2009624055-e2ftGMgR" });

        if (liff.isLoggedIn()) {
            getUserProfile();
        } else {
            liff.login();
        }
    } catch (error) {
        console.error("LIFF Initialization failed", error);
    }
}

async function getUserProfile() {
    const profile = await liff.getProfile();
    document.getElementById("userName").innerText = "สวัสดีคุณ " + profile.displayName;
    
    // ตรงนี้คือส่วนที่คุณต้องเชื่อมต่อกับ Database จริงในอนาคต
    // ตอนนี้เราจะแสดงเลข 5 เป็นตัวอย่างก่อนครับ
    document.getElementById("userPoints").innerText = "5"; 
}

function scanQR() {
    // ฟังก์ชันเปิดกล้องสแกน QR Code (ต้องเปิดสิทธิ์ Scan QR ใน LINE Developers ก่อน)
    if (!liff.isInClient()) {
        alert("กรุณาเปิดผ่านแอป LINE เท่านั้น");
    } else {
        liff.scanCodeV2().then(result => {
            alert("สแกนสำเร็จ! ข้อมูลที่ได้: " + result.value);
            // ส่งค่า result.value ไปที่ Backend ของคุณเพื่อเพิ่มแต้ม
        }).catch(err => {
            console.error(err);
        });
    }
}

main();
