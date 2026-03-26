require("dotenv").config();
const mongoose = require("mongoose");
const State = require("./models/State");

const data = [
  {
    "id": "1",
    "name": "Maharashtra",
    "districts": [
      {
        "id": 1,
        "name": "Ahmednagar"
      },
      {
        "id": 2,
        "name": "Akola"
      },
      {
        "id": 3,
        "name": "Amravati"
      },
      {
        "id": 4,
        "name": "Aurangabad"
      },
      {
        "id": 5,
        "name": "Beed"
      },
      {
        "id": 6,
        "name": "Bhandara"
      },
      {
        "id": 7,
        "name": "Buldhana"
      },
      {
        "id": 8,
        "name": "Chandrapur"
      },
      {
        "id": 9,
        "name": "Dhule"
      },
      {
        "id": 10,
        "name": "Gadchiroli"
      },
      {
        "id": 11,
        "name": "Gondia"
      },
      {
        "id": 12,
        "name": "Hingoli"
      },
      {
        "id": 13,
        "name": "Jalgaon"
      },
      {
        "id": 14,
        "name": "Jalna"
      },
      {
        "id": 15,
        "name": "Kolhapur"
      },
      {
        "id": 16,
        "name": "Latur"
      },
      {
        "id": 17,
        "name": "Mumbai City"
      },
      {
        "id": 18,
        "name": "Mumbai Suburban"
      },
      {
        "id": 19,
        "name": "Nagpur"
      },
      {
        "id": 20,
        "name": "Nanded"
      },
      {
        "id": 21,
        "name": "Nandurbar"
      },
      {
        "id": 22,
        "name": "Nashik"
      },
      {
        "id": 23,
        "name": "Osmanabad"
      },
      {
        "id": 24,
        "name": "Palghar"
      },
      {
        "id": 25,
        "name": "Parbhani"
      },
      {
        "id": 26,
        "name": "Pune"
      },
      {
        "id": 27,
        "name": "Raigad"
      },
      {
        "id": 28,
        "name": "Ratnagiri"
      },
      {
        "id": 29,
        "name": "Sangli"
      },
      {
        "id": 30,
        "name": "Satara"
      },
      {
        "id": 31,
        "name": "Sindhudurg"
      },
      {
        "id": 32,
        "name": "Solapur"
      },
      {
        "id": 33,
        "name": "Thane"
      },
      {
        "id": 34,
        "name": "Wardha"
      },
      {
        "id": 35,
        "name": "Washim"
      },
      {
        "id": 36,
        "name": "Yavatmal"
      }
    ]
  },
  {
    "id": "2",
    "name": "Karnataka",
    "districts": [
      {
        "id": 1,
        "name": "Bagalkot"
      },
      {
        "id": 2,
        "name": "Ballari"
      },
      {
        "id": 3,
        "name": "Belagavi"
      },
      {
        "id": 4,
        "name": "Bengaluru Rural"
      },
      {
        "id": 5,
        "name": "Bengaluru Urban"
      },
      {
        "id": 6,
        "name": "Bidar"
      },
      {
        "id": 7,
        "name": "Chamarajanagar"
      },
      {
        "id": 8,
        "name": "Chikkaballapur"
      },
      {
        "id": 9,
        "name": "Chikkamagaluru"
      },
      {
        "id": 10,
        "name": "Chitradurga"
      },
      {
        "id": 11,
        "name": "Dakshina Kannada"
      },
      {
        "id": 12,
        "name": "Davanagere"
      },
      {
        "id": 13,
        "name": "Dharwad"
      },
      {
        "id": 14,
        "name": "Gadag"
      },
      {
        "id": 15,
        "name": "Hassan"
      },
      {
        "id": 16,
        "name": "Haveri"
      },
      {
        "id": 17,
        "name": "Kalaburagi"
      },
      {
        "id": 18,
        "name": "Kodagu"
      },
      {
        "id": 19,
        "name": "Kolar"
      },
      {
        "id": 20,
        "name": "Koppal"
      },
      {
        "id": 21,
        "name": "Mandya"
      },
      {
        "id": 22,
        "name": "Mysuru"
      },
      {
        "id": 23,
        "name": "Raichur"
      },
      {
        "id": 24,
        "name": "Ramanagara"
      },
      {
        "id": 25,
        "name": "Shivamogga"
      },
      {
        "id": 26,
        "name": "Tumakuru"
      },
      {
        "id": 27,
        "name": "Udupi"
      },
      {
        "id": 28,
        "name": "Uttara Kannada"
      },
      {
        "id": 29,
        "name": "Vijayapura"
      },
      {
        "id": 30,
        "name": "Yadgir"
      },
      {
        "id": 31,
        "name": "Vijayanagara"
      }
    ]
  },
  {
    "id": "3",
    "name": "Gujarat",
    "districts": [
      { "id": 1, "name": "Ahmedabad" },
      { "id": 2, "name": "Amreli" },
      { "id": 3, "name": "Anand" },
      { "id": 4, "name": "Aravalli" },
      { "id": 5, "name": "Banaskantha" },
      { "id": 6, "name": "Bharuch" },
      { "id": 7, "name": "Bhavnagar" },
      { "id": 8, "name": "Botad" },
      { "id": 9, "name": "Chhota Udaipur" },
      { "id": 10, "name": "Dahod" },
      { "id": 11, "name": "Dang" },
      { "id": 12, "name": "Devbhoomi Dwarka" },
      { "id": 13, "name": "Gandhinagar" },
      { "id": 14, "name": "Gir Somnath" },
      { "id": 15, "name": "Jamnagar" },
      { "id": 16, "name": "Junagadh" },
      { "id": 17, "name": "Kheda" },
      { "id": 18, "name": "Kutch" },
      { "id": 19, "name": "Mahisagar" },
      { "id": 20, "name": "Mehsana" },
      { "id": 21, "name": "Morbi" },
      { "id": 22, "name": "Narmada" },
      { "id": 23, "name": "Navsari" },
      { "id": 24, "name": "Panchmahal" },
      { "id": 25, "name": "Patan" },
      { "id": 26, "name": "Porbandar" },
      { "id": 27, "name": "Rajkot" },
      { "id": 28, "name": "Sabarkantha" },
      { "id": 29, "name": "Surat" },
      { "id": 30, "name": "Surendranagar" },
      { "id": 31, "name": "Tapi" },
      { "id": 32, "name": "Vadodara" },
      { "id": 33, "name": "Valsad" }
    ]
  },
  {
    "id": "4",
    "name": "Madhya Pradesh",
    "districts": [
      { "id": 1, "name": "Agar Malwa" },
      { "id": 2, "name": "Alirajpur" },
      { "id": 3, "name": "Anuppur" },
      { "id": 4, "name": "Ashoknagar" },
      { "id": 5, "name": "Balaghat" },
      { "id": 6, "name": "Barwani" },
      { "id": 7, "name": "Betul" },
      { "id": 8, "name": "Bhind" },
      { "id": 9, "name": "Bhopal" },
      { "id": 10, "name": "Burhanpur" },
      { "id": 11, "name": "Chhatarpur" },
      { "id": 12, "name": "Chhindwara" },
      { "id": 13, "name": "Damoh" },
      { "id": 14, "name": "Datia" },
      { "id": 15, "name": "Dewas" },
      { "id": 16, "name": "Dhar" },
      { "id": 17, "name": "Dindori" },
      { "id": 18, "name": "Guna" },
      { "id": 19, "name": "Gwalior" },
      { "id": 20, "name": "Harda" },
      { "id": 21, "name": "Hoshangabad" },
      { "id": 22, "name": "Indore" },
      { "id": 23, "name": "Jabalpur" },
      { "id": 24, "name": "Jhabua" },
      { "id": 25, "name": "Katni" },
      { "id": 26, "name": "Khandwa" },
      { "id": 27, "name": "Khargone" },
      { "id": 28, "name": "Mandla" },
      { "id": 29, "name": "Mandsaur" },
      { "id": 30, "name": "Morena" },
      { "id": 31, "name": "Narsinghpur" },
      { "id": 32, "name": "Neemuch" },
      { "id": 33, "name": "Panna" },
      { "id": 34, "name": "Raisen" },
      { "id": 35, "name": "Rajgarh" },
      { "id": 36, "name": "Ratlam" },
      { "id": 37, "name": "Rewa" },
      { "id": 38, "name": "Sagar" },
      { "id": 39, "name": "Satna" },
      { "id": 40, "name": "Sehore" },
      { "id": 41, "name": "Seoni" },
      { "id": 42, "name": "Shahdol" },
      { "id": 43, "name": "Shajapur" },
      { "id": 44, "name": "Sheopur" },
      { "id": 45, "name": "Shivpuri" },
      { "id": 46, "name": "Sidhi" },
      { "id": 47, "name": "Singrauli" },
      { "id": 48, "name": "Tikamgarh" },
      { "id": 49, "name": "Ujjain" },
      { "id": 50, "name": "Umaria" },
      { "id": 51, "name": "Vidisha" }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("DB connected");

    await State.deleteMany(); // optional (clean old)

    await State.insertMany(data);

    console.log("✅ Data inserted successfully");
    process.exit();
  })
  .catch(err => console.log(err));