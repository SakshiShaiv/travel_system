"use client";

import React, { useState } from "react";

// Next.js Image (अगर future में static images चाहिए)
import Image from "next/image";

// Components
import Navbar from "./component/header";
import Hero from "./component/homepage";
import Footer from "./component/footer";
import Assistant from "./component/assistnt";
import About from "./component/about";
import Places from "./component/places";
import Highlights from "./component/highlights";
import PlacesList from "./component/PlacesList";
import ContactUs from "./contact_us/page";

export default function Home() {

  return (
    <div
      className={`min-h-screen flex flex-col bg-white text-gray-900`}
    >
      {/* ✅ Navbar */}
      <Navbar  />

      {/* ✅ Hero Section */}
      <Hero />
{/* 
      ✅ Highlights Section
      <Highlights /> */}

      {/* ✅ About Section */}
     
      <About  />

      {/* ✅ Static Places Section (if any) */}
      {/* <Places /> */}


      {/*  ✅ API Fetched Places List
      <section className="p-6">
        <h1 className="text-2xl font-bold mb-4">Indore Tourism Guide</h1>
        <PlacesList />
      </section>
      
      */ }

      {/* ✅ Assistant (chatbot) */}
      <Assistant />

      {/* ✅ Footer */}
      {/* <Footer  /> */}
      <ContactUs />
    </div>
  );
}
