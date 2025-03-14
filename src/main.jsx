import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Suspense } from 'react'
import Loader from './compoenets/main/Loader.jsx'
import Notfound from './pages/Notfound.jsx'
import {ToastContainer} from 'react-toastify'


// react lazy loading routes when they want to be load

const SignUp = React.lazy(() => import('./pages/Sign-up/SignUp.jsx'));
const Login = React.lazy(() => import('./pages/Login/Login.jsx'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword/ResetPassword.jsx'));
const DashboardLayout = React.lazy(() => import('./pages/Dashboard/DashboardLayout.jsx'));
const Account = React.lazy(() => import('./pages/Dashboard/Account.jsx'));
const MainDashboard = React.lazy(() => import('./pages/Dashboard/MainDashboard.jsx'));
const Settings = React.lazy(() => import('./pages/Dashboard/Settings.jsx'));
const Customer = React.lazy(() => import('./pages/Dashboard/Customer.jsx'));
const Promocode = React.lazy(() => import('./pages/Dashboard/Promocode.jsx'));
const Khwahishoutlet = React.lazy(() => import('./pages/Dashboard/Khwahish/Khwahishoutlet.jsx'));
const KhwahishHomepage = React.lazy(() => import('./pages/Dashboard/Khwahish/KhwahishHomepage.jsx'));
const Noor = React.lazy(() => import('./pages/Dashboard/Khwahish/Noor.jsx'));
const Asai = React.lazy(() => import('./pages/Dashboard/Khwahish/Asai.jsx'));
const Pache = React.lazy(() => import('./pages/Dashboard/Khwahish/Pache.jsx'));
const BridelEdit = React.lazy(() => import('./pages/Dashboard/Khwahish/BridelEdit.jsx'));
const PolkiEdit = React.lazy(() => import('./pages/Dashboard/Khwahish/PolkiEdit.jsx'));
const MakeAWish = React.lazy(() => import('./pages/Dashboard/Khwahish/MakeAWish.jsx'));

const QOHoutlet = React.lazy(() => import('./pages/Dashboard/QOH/QOHoutlet.jsx'));
const QOHhomepage = React.lazy(() => import('./pages/Dashboard/QOH/QOHhomepage.jsx'));
const Gulz = React.lazy(() => import('./pages/Dashboard/QOH/Gulz'));
const Fazza = React.lazy(() => import('./pages/Dashboard/QOH/Fazza'));
const Festara = React.lazy(() => import('./pages/Dashboard/QOH/Festara'));

//store Route for Eshop
const Eshop_Collections = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Collections.jsx'));
const Eshop_Categories = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Categories.jsx'));
const Eshop_Styles = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Styles.jsx'));
const Eshop_ProductAdd = React.lazy(() => import('./pages/Dashboard/Store/Eshop/ProductAdd.jsx'));
const Eshop_Products = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Products.jsx'));
const Eshop_Orders = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Orders.jsx'));
const Eshop_Golds = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Golds.jsx'));
const Eshop_Diamonds = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Diamonds.jsx'));
const Eshop_Labors = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Labors.jsx'));
const Eshop_UpdateProduct = React.lazy(() => import('./pages/Dashboard/Store/Eshop/UpdateProduct.jsx'));
const Eshop_Discount = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Discounts.jsx'));
const Eshop_Colors = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Colors.jsx'));
const Eshop_MakingCharges = React.lazy(() => import('./pages/Dashboard/Store/Eshop/MakingCharges.jsx'));
const Eshop_WastageCharges = React.lazy(() => import('./pages/Dashboard/Store/Eshop/WastageCharges.jsx'));
const Eshop_RecommendedFor = React.lazy(() => import('./pages/Dashboard/Store/Eshop/Recommended.jsx'));

// store Route for Khwaahish
const Khwaahish_Collections = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/Collections.jsx'));
const Khwaahish_Categories = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/Categories.jsx'));
const Khwaahish_Styles = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/Styles.jsx'));
const Khwaahish_ProductAdd = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/ProductAdd.jsx'));
const Khwaahish_Products = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/Products.jsx'));
const Khwaahish_UpdateProduct = React.lazy(() => import('./pages/Dashboard/Store/Khwaahish/UpdateProduct.jsx'));


const ArticalLayout = React.lazy(() => import('./pages/Dashboard/Articals/ArticalLayout'));
const PrivacyPolicy = React.lazy(() => import('./pages/Dashboard/Articals/PrivacyPolicy.jsx'));
const Conditions = React.lazy(() => import('./pages/Dashboard/Articals/Terms&Conditions'));
const OurStory = React.lazy(() => import('./pages/Dashboard/Articals/OurStory'));
const Blog = React.lazy(() => import('./pages/Dashboard/Articals/Blog'));
const SeoLayout = React.lazy(() => import('./pages/Dashboard/SEO/SeoLayout.jsx'));
const SeoDetails = React.lazy(() => import('./pages/Dashboard/SEO/SeoDetails.jsx'));
const DNS = React.lazy(() => import('./pages/Dashboard/SEO/DNS.jsx'));
const Customizations = React.lazy(() => import('./pages/Dashboard/SEO/Customizations.jsx'));

import Layoutlayout from './pages/Layout/Layoutlayout';
import Header from './pages/Layout/Header';
import Footer from './pages/Layout/Footer';
import QuickLinks from './pages/Layout/QuickLinks';
import TestemonialQOH from './pages/Dashboard/QOH/TestemonialQOH.jsx'
import TestemonialKhwa from './pages/Dashboard/Khwahish/TestemonialKhwa.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loader />}>
            <DashboardLayout />
          </Suspense>
        ),

        //Children of Dashboard

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <Account />
              </Suspense>
            ),
          },
          {
            path: 'dashprofile',
            element: (
              <Suspense fallback={<Loader />}>
                <MainDashboard />
              </Suspense>
            ),
          },
          {
            path: 'customers',
            element: (
              <Suspense fallback={<Loader />}>
                <Customer />
              </Suspense>
            ),
          },
          {
            path: 'promocode',
            element: (
              <Suspense fallback={<Loader />}>
                <Promocode />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: 'store/eshop',
            children: [
              {
                path: 'categories',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Categories />
                  </Suspense>
                ),
              },
              {
                path: 'collections',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Collections />
                  </Suspense>
                ),
              },
              {
                path: 'styles',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Styles />
                  </Suspense>
                ),
              },
              {
                path: 'colors',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Colors />
                  </Suspense>
                ),
              },
              {
                path: 'recommended',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_RecommendedFor />
                  </Suspense>
                ),
              },
              {
                path: 'add-product',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_ProductAdd />
                  </Suspense>
                ),
              },
              {
                path: 'discount',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Discount />
                  </Suspense>
                ),
              },
              {
                path: 'orders',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Orders />
                  </Suspense>
                ),
              },
              {
                path: 'products',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Products />
                  </Suspense>
                ),
              },
              {
                path: 'golds',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Golds />
                  </Suspense>
                ),
              },
              {
                path: 'diamonds',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Diamonds />
                  </Suspense>
                ),
              },
              {
                path: 'labors',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_Labors />
                  </Suspense>
                ),
              },
              {
                path: 'making-charges',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_MakingCharges />
                  </Suspense>
                ),
              },
              {
                path: 'wastage-charges',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_WastageCharges />
                  </Suspense>
                ),
              },
              {
                path: 'update-product',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Eshop_UpdateProduct />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'store/khwaahish',
            children: [
              {
                path: 'categories',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_Categories />
                  </Suspense>
                ),
              },
              {
                path: 'collections',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_Collections />
                  </Suspense>
                ),
              },
              {
                path: 'styles',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_Styles />
                  </Suspense>
                ),
              },
              {
                path: 'add-product',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_ProductAdd />
                  </Suspense>
                ),
              },
              {
                path: 'products',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_Products />
                  </Suspense>
                ),
              },
              {
                path: 'update-product',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Khwaahish_UpdateProduct />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: 'Khwahish',
            element: (
              <Suspense fallback={<Loader />}>
                <Khwahishoutlet />
              </Suspense>
            ),
            //Children of khwahish
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <KhwahishHomepage />
                  </Suspense>
                ),
              },
              {
                path: 'noor',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Noor />
                  </Suspense>
                ),
              },
              {
                path: 'asai',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Asai />
                  </Suspense>
                ),
              },
              {
                path: 'pache',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Pache />
                  </Suspense>
                ),
              },
              {
                path: 'brideledit',
                element: (
                  <Suspense fallback={<Loader />}>
                    <BridelEdit />
                  </Suspense>
                ),
              },
              {
                path: 'polkiedit',
                element: (
                  <Suspense fallback={<Loader />}>
                    <PolkiEdit />
                  </Suspense>
                ),
              },
              {
                path: 'makeawish',
                element: (
                  <Suspense fallback={<Loader />}>
                    <MakeAWish />
                  </Suspense>
                ),
              },
              {
                path: 'testemonialkhwa',
                element: (
                  <Suspense fallback={<Loader />}>
                    <TestemonialKhwa />
                  </Suspense>
                ),
              },
            ]
          },
          {
            path: 'queen',
            element: (
              <Suspense fallback={<Loader />}>
                <QOHoutlet />
              </Suspense>
            ),

            //children of queen
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <QOHhomepage />
                  </Suspense>
                ),
              },
              {
                path: 'gulz',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Gulz />
                  </Suspense>
                ),
              },
              {
                path: 'fazza',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Fazza />
                  </Suspense>
                ),
              },
              {
                path: 'festara',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Festara />
                  </Suspense>
                ),
              },
              {
                path: 'testemonialqoh',
                element: (
                  <Suspense fallback={<Loader />}>
                    <TestemonialQOH />
                  </Suspense>
                ),
              },
            ]
          },
          {
            path: 'artical',
            element: (
              <Suspense fallback={<Loader />}>
                <ArticalLayout />
              </Suspense>
            ),

            //Children of artical
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <PrivacyPolicy />
                  </Suspense>
                ),
              },
              {
                path: 'terms&conditions',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Conditions />
                  </Suspense>
                ),
              },
              {
                path: 'ourstory',
                element: (
                  <Suspense fallback={<Loader />}>
                    <OurStory />
                  </Suspense>
                ),
              },
              {
                path: 'blog',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Blog />
                  </Suspense>
                ),
              },
            ]
          },
          {
            path: 'seo',
            element: (
              <Suspense fallback={<Loader />}>
                <SeoLayout />
              </Suspense>
            ),

            //Children of seo
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <SeoDetails />
                  </Suspense>
                ),
              },
              {
                path: 'dns',
                element: (
                  <Suspense fallback={<Loader />}>
                    <DNS />
                  </Suspense>
                ),
              },
              {
                path: 'customizations',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Customizations />
                  </Suspense>
                ),
              },
            ]
          },
          {
            path: 'layout',
            element: (
              <Suspense fallback={<Loader />}>
                <Layoutlayout />
              </Suspense>
            ),

            //Children of layout
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <Header />
                  </Suspense>
                ),
              },
              {
                path: 'footer',
                element: (
                  <Suspense fallback={<Loader />}>
                    <Footer />
                  </Suspense>
                ),
              },
              {
                path: 'quicklinks',
                element: (
                  <Suspense fallback={<Loader />}>
                    <QuickLinks />
                  </Suspense>
                ),
              },
            ]
          },
        ]
      },
    ],
    errorElement: <Notfound />
  }])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer/>
  </StrictMode>,
)
