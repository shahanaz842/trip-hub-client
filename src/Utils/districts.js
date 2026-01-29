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

export const districtCoords = {
  "Bagerhat": [22.6602, 89.7895],
  "Bandarban": [22.1953, 92.2184],
  "Barguna": [22.1592, 90.1263],
  "Barishal": [22.7010, 90.3535],
  "Bhola": [22.6859, 90.6481],
  "Bogra": [24.8481, 89.3730],
  "Brahmanbaria": [23.9571, 91.1119],
  "Chandpur": [23.2333, 90.6667],
  "Chattogram": [22.3569, 91.7832],
  "Chuadanga": [23.6402, 88.8418],
  "Cox's Bazar": [21.4272, 92.0058],
  "Cumilla": [23.4607, 91.1809],
  "Dhaka": [23.8103, 90.4125],
  "Dinajpur": [25.6279, 88.6332],
  "Faridpur": [23.6070, 89.8424],
  "Feni": [23.0159, 91.3976],
  "Gaibandha": [25.3288, 89.5389],
  "Gazipur": [23.9999, 90.4203],
  "Gopalganj": [23.0051, 89.8266],
  "Habiganj": [24.3745, 91.4155],
  "Jamalpur": [24.9375, 89.9370],
  "Jessore": [23.1778, 89.1801],
  "Jhalokathi": [22.6406, 90.1987],
  "Jhenaidah": [23.5448, 89.1539],
  "Joypurhat": [25.0968, 89.0227],
  "Khagrachhari": [23.1193, 91.9847],
  "Khulna": [22.8456, 89.5403],
  "Kishoreganj": [24.4449, 90.7766],
  "Kurigram": [25.8054, 89.6360],
  "Kushtia": [23.9013, 89.1208],
  "Lakshmipur": [22.9447, 90.8282],
  "Lalmonirhat": [25.9923, 89.2847],
  "Madaripur": [23.1641, 90.1897],
  "Magura": [23.4873, 89.4194],
  "Manikganj": [23.8617, 90.0003],
  "Meherpur": [23.7622, 88.6318],
  "Moulvibazar": [24.4829, 91.7774],
  "Munshiganj": [23.5422, 90.5305],
  "Mymensingh": [24.7471, 90.4203],
  "Naogaon": [24.7936, 88.9318],
  "Narail": [23.1551, 89.4955],
  "Narayanganj": [23.6238, 90.5000],
  "Narsingdi": [23.9322, 90.7154],
  "Natore": [24.4139, 88.9876],
  "Nawabganj": [24.5965, 88.2776],
  "Netrokona": [24.8835, 90.7316],
  "Nilphamari": [25.9318, 88.8560],
  "Noakhali": [22.8696, 91.0994],
  "Pabna": [24.0064, 89.2372],
  "Panchagarh": [26.3354, 88.5517],
  "Patuakhali": [22.3596, 90.3299],
  "Pirojpur": [22.5791, 89.9750],
  "Rajbari": [23.7574, 89.6440],
  "Rajshahi": [24.3745, 88.6042],
  "Rangamati": [22.7324, 92.2985],
  "Rangpur": [25.7439, 89.2752],
  "Satkhira": [22.7085, 89.0718],
  "Shariatpur": [23.2423, 90.4348],
  "Sherpur": [25.0205, 90.0153],
  "Sirajganj": [24.4534, 89.7007],
  "Sunamganj": [25.0716, 91.3990],
  "Sylhet": [24.8949, 91.8687],
  "Tangail": [24.2513, 89.9167],
  "Thakurgaon": [26.0337, 88.4699]
};


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
//                 confirmButton: 'rounded px-10 py-3 font-black uppercase text-xs tracking-widest'
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