export const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jessore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Nawabganj",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];

// const handleLogin = async () => {
//     try {
//         await signInWithGoogle();
//     } catch (error) {
//         // 1. Get the code (e.g., 'auth/popup-closed-by-user')
//         const errorCode = error.code; 

//         // 2. Split it and take the second part
//         // Result: 'popup-closed-by-user'
//         const shortError = errorCode.split('/')[1];

//         // 3. Optional: Make it look nice (Result: 'Popup closed by user')
//         const readableError = shortError.replace(/-/g, ' ');
//         const finalMessage = readableError.charAt(0).toUpperCase() + readableError.slice(1);

//         Swal.fire({
//             icon: 'error',
//             title: 'Auth Error',
//             text: finalMessage, // Shows: "Popup closed by user"
//             confirmButtonColor: 'primary',
//         });
//     }
// };


// const handleGoogleLogin = async () => {
//     try {
//         await signInWithGoogle();
//         // Success logic...
//     } catch (error) {
//         // Log the real error for your eyes
//         console.error("Auth Error:", error.code);

//         // Map errors to friendly messages
//         let errorMessage = "An unexpected error occurred. Please try again.";

//         if (error.code === 'auth/popup-closed-by-user') {
//             errorMessage = "Login cancelled. You closed the window before finishing.";
//         } else if (error.code === 'auth/network-request-failed') {
//             errorMessage = "Connection lost. Please check your internet.";
//         } else if (error.code === 'auth/internal-error') {
//             errorMessage = "Google services are temporarily down. Try again later.";
//         }

//         // Show the professional alert
//         Swal.fire({
//             icon: 'info', // Use 'info' or 'warning' for cancellations
//             title: 'Wait a second!',
//             text: errorMessage,
//             confirmButtonColor: 'primary',
//             background: '#ffffff',
//             customClass: {
//                 popup: 'rounded-[2rem]',
//                 confirmButton: 'rounded-xl px-10 py-3 font-black uppercase text-xs tracking-widest'
//             }
//         });
//     }
// };

// Firebase Error Code	User-Friendly Message
// auth/popup-closed-by-user	"The login window was closed. Try clicking the button again."
// auth/user-not-found	"No account found with this email. Please sign up first."
// auth/wrong-password	"Incorrect password. Please try again."
// auth/email-already-in-use	"This email is already registered. Try logging in instead."
// auth/too-many-requests	"Account temporarily locked due to many attempts. Try again in 5 minutes."