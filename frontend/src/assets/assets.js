import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General Physician",
    degree: "MBBS, MD",
    experience: "7 Years",
    about: "Dr. Richard James specializes in internal medicine, offering personalized care and focusing on holistic health management.",
    fees: 55,
    address: {
      line1: "12 Elm Street",
      line2: "Downtown, Bristol",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS, MS",
    experience: "5 Years",
    about: "Dr. Emily Larson has expertise in women's health, offering exceptional care in prenatal and postnatal management.",
    fees: 70,
    address: {
      line1: "45 Maple Avenue",
      line2: "West End, Birmingham",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS, DDVL",
    experience: "3 Years",
    about: "Dr. Sarah Patel is skilled in treating a variety of skin conditions with advanced dermatological techniques.",
    fees: 40,
    address: {
      line1: "78 Oak Drive",
      line2: "Central Park, Manchester",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatrician",
    degree: "MBBS, DCH",
    experience: "6 Years",
    about: "Dr. Christopher Lee focuses on providing compassionate care for children, ensuring their growth and well-being.",
    fees: 50,
    address: {
      line1: "22 Pine Street",
      line2: "Greenwood, Edinburgh",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS, DM",
    experience: "8 Years",
    about: "Dr. Jennifer Garcia is an expert in diagnosing and treating neurological disorders with a patient-centric approach.",
    fees: 85,
    address: {
      line1: "91 Birch Lane",
      line2: "Riverfront, Glasgow",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Cardiologist",
    degree: "MBBS, MD, DM",
    experience: "10 Years",
    about: "Dr. Andrew Williams provides comprehensive cardiac care, specializing in interventional cardiology.",
    fees: 100,
    address: {
      line1: "34 Willow Way",
      line2: "Sunnyvale, Liverpool",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Chloe Evans",
    image: doc7,
    speciality: "Orthopedic Surgeon",
    degree: "MBBS, MS",
    experience: "4 Years",
    about: "Dr. Chloe Evans excels in treating musculoskeletal injuries with advanced surgical techniques.",
    fees: 75,
    address: {
      line1: "58 Cedar Grove",
      line2: "Hilltop, Nottingham",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Ryan Martinez",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS, DGO",
    experience: "6 Years",
    about: "Dr. Ryan Martinez is dedicated to women's health, with a focus on minimally invasive gynecological procedures.",
    fees: 65,
    address: {
      line1: "39 Spruce Court",
      line2: "Lakeview, Leeds",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS, MD",
    experience: "2 Years",
    about: "Dr. Ava Mitchell specializes in cosmetic dermatology, enhancing skin health and aesthetics.",
    fees: 45,
    address: {
      line1: "16 Poplar Road",
      line2: "Meadowlands, Cardiff",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatrician",
    degree: "MBBS, MD",
    experience: "7 Years",
    about: "Dr. Jeffrey King offers comprehensive pediatric care, fostering the health and happiness of children.",
    fees: 60,
    address: {
      line1: "83 Aspen Boulevard",
      line2: "Woodside, Sheffield",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS, DM",
    experience: "9 Years",
    about: "Dr. Zoe Kelly is a leading expert in treating complex neurological conditions with personalized care plans.",
    fees: 90,
    address: {
      line1: "25 Juniper Lane",
      line2: "Northshore, Belfast",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Psychiatrist",
    degree: "MBBS, MD",
    experience: "6 Years",
    about: "Dr. Patrick Harris specializes in mental health, focusing on stress, anxiety, and depression management.",
    fees: 80,
    address: {
      line1: "67 Chestnut Street",
      line2: "Harborview, Southampton",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Amelia Hill",
    image: doc13,
    speciality: "General Physician",
    degree: "MBBS, MD",
    experience: "5 Years",
    about: "Dr. Amelia Hill is committed to preventive healthcare, ensuring overall wellness for her patients.",
    fees: 50,
    address: {
      line1: "49 Magnolia Avenue",
      line2: "Highland, Cambridge",
    },
  },
];

