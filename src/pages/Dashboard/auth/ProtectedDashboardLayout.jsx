import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../../../store/authStore';
import axios from 'axios';
import Dashboardsidemenu from '../../../compoenets/main/Dashboardsidemenu';
import Dashboarduppermenu from '../../../compoenets/main/Dashboarduppermenu';

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://e906-2409-40c0-102b-9590-867-b844-5c32-67b7.ngrok-free.app/admin/auth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent and stored
});

const ProtectedDashboardLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser ,setIsAdmin} = useAuthStore(); 

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);
 
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


  const handleLogout = async () => {
    try {

      let logoutUrl = '/logout';
      const response = await axiosInstance.post(logoutUrl);
      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !isAdmin) {
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // if (loading) {
  //   return <div className="text-center text-lg">Loading...</div>;
  // }

  if(isAuthenticated && !isAdmin){
    return <>
    <div>
      <h2>You are not an Admin</h2>
      <div className=' flex flex-col gap-2.5'>
                    <h1 className=' text-[20px] font-semibold'>Priya</h1>
                    <p>{user?.email}</p>
                    <button
                        onClick={handleLogout}
                        className=' text-[16px] border rounded-md border-amber-300 p-1.5 w-[160px] text-center mt-2 hover:text-amber-300 hover:bg-black transition-colors duration-300 ease-in-out cursor-pointer'>
                        Logout
                    </button>
      </div>
    </div>
    </>
  }

  if (isAuthenticated && isAdmin) {
  return (
    <>
    <div className='flex' >
        <div>
            <Dashboardsidemenu />

        </div>

        <div className='w-full p-4 h-screen overflow-hidden overflow-y-scroll'>
            <Dashboarduppermenu />
            <Outlet />
        </div>

    </div>

  </>
  ); 
}

};

export default ProtectedDashboardLayout;
