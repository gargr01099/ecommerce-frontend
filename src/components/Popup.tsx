// // components/Popup.tsx
// import React from "react";

// interface PopupProps {
//   message: string | null;
//   onClose: () => void;
// }

// const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
//   if (!message) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
//         <h2 className="text-xl font-bold mb-4">Notification</h2>
//         <p>{message}</p>
//         <button
//           onClick={onClose}
//           className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Popup;
