import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

import axios from 'axios';

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://e906-2409-40c0-102b-9590-867-b844-5c32-67b7.ngrok-free.app/admin/auth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent and stored
});

const AdminAuthForm=()=> {
  const navigate = useNavigate();

  const { setIsAuthenticated, setUser ,setIsAdmin} = useAuthStore(); 
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const [authType, setAuthType] = useState('phone');
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

      useEffect(() => {
          const checkAdminStatus = async () => {
            try {
            
              const {data} = await axiosInstance.post("/admin-profile");
              
              if (data?.user?.roles?.includes("Admin")) {
                setIsAuthenticated(true)
                setUser(data.user)
                setIsAdmin(true);
                navigate("/dashboard")
              } else {
                setIsAuthenticated(true)
                setUser(data.user)
                setIsAdmin(false);
                navigate("/dashboard")
              }
            } catch (error) {
              console.error("Failed to fetch user data:", error);
              setIsAdmin(false);
            } 
          };
      
          checkAdminStatus();
      }, []);

// if(isAuthenticated && isAdmin) navigate("/dashboard");
  // send otp
const sendOTP = async (type, value) => {
  try {
    const response = await axiosInstance.post(`/login/${type}-otp`, {
      [type]: value,
    });

    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Failed to send OTP:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

// verify otp
const verifyOTP = async (type, value, otp) => {
  try {
    const response = await axiosInstance.post(`/login/${type}-otp-verify`, {
      [type]: value,
      otp,
    });
    setIsAuthenticated(true);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Failed to verify OTP:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(authType, value);
      console.log(response);
      
      if (response.message === 'OTP SENT SUCCESS') {
        setOtpSent(true);
        setTimer(120); // 2 minutes
      } else if (response.ttl) {
        setError(`Please wait ${response.ttl} seconds before requesting a new OTP.`);
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(authType, value, otp);
      if (response.success === true) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
   <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
      Admin Login
    </h2>

    {error && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
        {error}
      </div>
    )}

    <div className="flex space-x-4 mb-6">
      <button
        type="button"
        onClick={() => {
          setAuthType('phone');
          setValue('');
          setOtp('');
          setOtpSent(false);
          setError('');
        }}
        className={`flex-1 py-2 px-4 rounded-md font-medium ${
          authType === 'phone'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Phone
      </button>
      <button
        type="button"
        onClick={() => {
          setAuthType('email');
          setValue('');
          setOtp('');
          setOtpSent(false);
          setError('');
        }}
        className={`flex-1 py-2 px-4 rounded-md font-medium ${
          authType === 'email'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Email
      </button>
    </div>

    <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {authType === 'phone' ? 'Phone Number' : 'Email Address'}
        </label>
        <input
          type={authType === 'phone' ? 'tel' : 'email'}
          placeholder={authType === 'phone' ? '+1234567890' : 'admin@example.com'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          disabled={otpSent}
        />
      </div>

      {otpSent && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter OTP
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (timer > 0 && !otpSent)}
        className={`w-full py-2 px-4 rounded-md font-medium text-white 
          ${
            loading || (timer > 0 && !otpSent)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {loading
          ? 'Processing...'
          : otpSent
          ? 'Verify OTP'
          : timer > 0
          ? `Resend OTP in ${timer}s`
          : 'Send OTP'}
      </button>
    </form>

    {otpSent && (
      <p className="mt-4 text-sm text-gray-600 text-center">
        Didn't receive the OTP?{' '}
        {timer > 0 ? (
          <span>Wait {timer}s to resend</span>
        ) : (
          <button
            onClick={() => {
              setOtpSent(false);
              setOtp('');
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Resend OTP
          </button>
        )}
      </p>
    )}
  </div>
</div>

    </>
  );
}

export default AdminAuthForm;
