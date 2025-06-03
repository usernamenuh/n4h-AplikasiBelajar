const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Konfigurasi transporter email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'catatanbelajar@gmail.com', // Ganti dengan email Gmail Anda
        pass: 'abcd efgh ijkl mnop' // Ganti dengan App Password dari Gmail
    }
});

// Cloud Function untuk mengirim email verifikasi
exports.sendVerificationEmail = functions.database
    .ref('/verificationCodes/{userId}')
    .onCreate(async (snapshot, context) => {
        const verificationData = snapshot.val();
        const userId = context.params.userId;

        // Ambil data user dari database
        const userSnapshot = await admin.database().ref(`/users/${userId}/profile`).once('value');
        const userData = userSnapshot.val();

        if (!userData || !userData.email) {
            console.error('User data not found');
            return null;
        }

        // Buat template email
        const mailOptions = {
            from: 'catatanbelajar@gmail.com', // Ganti dengan email Gmail Anda
            to: userData.email,
            subject: 'Kode Verifikasi - Catatan Belajar',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2196F3;">Verifikasi Akun Catatan Belajar</h2>
                    <p>Halo ${userData.username},</p>
                    <p>Terima kasih telah mendaftar di aplikasi Catatan Belajar. Untuk menyelesaikan pendaftaran, silakan masukkan kode verifikasi berikut:</p>
                    <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #2196F3; margin: 0;">${verificationData.code}</h1>
                    </div>
                    <p>Kode ini akan kadaluarsa dalam 10 menit.</p>
                    <p>Jika Anda tidak merasa mendaftar di aplikasi ini, Anda dapat mengabaikan email ini.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
                </div>
            `
        };

        try {
            // Kirim email
            await transporter.sendMail(mailOptions);
            console.log('Verification email sent to:', userData.email);
            return null;
        } catch (error) {
            console.error('Error sending verification email:', error);
            return null;
        }
    }); 