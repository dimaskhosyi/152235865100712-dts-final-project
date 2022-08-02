import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom"; 
import { Routes, Route } from 'react-router-dom';

import "./App.css"

import Home from "./component/Home";
import CountryDetails from "./component/CountryDetails";
import Form from "./component/Form";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from "./config/Firebase";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  //Login - Signup Firebase
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //State for countries
  const [countries, setCountries] = useState([])

  //Filter and search
  const countriesInputRef = useRef();
  const regionRef = useRef();
  
  //Used to navigate to other page
  const navigate = useNavigate()

  const noCountries = countries.status || countries.message;

  //Handle action login/signup
  const handleAction = (id) => {
    const authentication = getAuth();
    
    if(id === 1){
      signInWithEmailAndPassword(authentication, email, password)
        .then((resp) => {
          navigate('/')
          sessionStorage.setItem('Email', resp.user.email)
          sessionStorage.setItem('Auth Token', resp._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Wrong password!');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('User not found! Kindly check your email again');
          }
        })
    }

    if(id === 2){
      createUserWithEmailAndPassword(authentication, email, password)
        .then((resp) => {
          navigate('/')
          sessionStorage.setItem('Email', resp.user.email)
          sessionStorage.setItem('Auth Token', resp._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }

  //Hooks for session login 
  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token')

    if(authToken){
      navigate('/')
    }
  }, [])

  //Hooks for fetch data countries
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error)
    }
  }, [])

  //Fetch data countries from API
  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();

    if (data.status === 404) {
      setCountries([])
      return
    }
    setCountries(data)
  }

  //Function search countries
  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;

    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(`https://restcountries.com/v2/name/${searchValue}`)
        const data = await response.json();

        setCountries(data)
      }

      try {
        fetchSearch()
      } catch (err) {
        console.log(err)
      }
    } else {
      fetchData();
    }
  }

  //Function filter by region
  const selectRegion = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        );
        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData();
          } catch (err) {
            console.log(err)
          }
          return;
        }

        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (err) {
        console.log(err)
      }
    }
  }

  //Function to details page
  const showDetails = (code) => {
    navigate(`/${code}`)
  }

  return (
    <div className='app'>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Home 
              regionRef={regionRef} 
              countriesInputRef={countriesInputRef} 
              searchCountries={searchCountries} 
              selectRegion={selectRegion} 
              noCountries={noCountries} 
              countries={countries} 
              showDetails={showDetails} 
            />
          }
        />
        <Route 
          path="/:countryCode"
          element={
            <CountryDetails 
              countries={countries} 
              refetch={fetchData} 
            />} 
        />
        <Route 
          path="/login"
          element={
            <Form 
              title="Log in"
              setEmail={setEmail}
              setPassword={setPassword} 
              handleAction={() => handleAction(1)} />}
        />
        <Route  
          path='/signup' 
          element={
            <Form 
              title="Sign up"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(2)} />} 
        />
      </Routes>

    </div>
  );
}

export default App;
