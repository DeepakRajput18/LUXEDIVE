import fs from 'fs';
import path from 'path';

// Note: I can't easily import the .ts file directly in this environment 
// without complex setup, so I'll parse it as text or just define the data here 
// based on my previous view_file output.

const BASE = [
    { id:1, fullName:'Rajesh Mehta', firstName:'Rajesh', age:42, experienceYears:12, pricePerDay:2200, totalTripsCompleted:1250,
      languages:['English','Hindi','Gujarati'], availabilityStatus:'Available', isTopChauffeur:true,
      profilePhoto:'/images/chauffeurs/rajesh.png',
      uniformStyle:'Premium Black Suit',
      drivingLicenseNumber:'DL-04-2010-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving','VIP Protocol','First Aid'], specialTraining:['Luxury Vehicle Handling','VIP Escort'],
      bio:'LUXEDIVE\'s most decorated chauffeur with 12 years of service to India\'s business elite. Known for impeccable timing and zero-compromise attitude toward luxury.',
      drivingStyle:'Smooth & Calm', specializations:['VIP Escort','Airport Transfers','Wedding Convoys']
    },
    { id:2, fullName:'Vikram Patel', firstName:'Vikram', age:35, experienceYears:8, pricePerDay:1500, totalTripsCompleted:850,
      languages:['Hindi','Gujarati','English'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1559418162-0d309d8d10a3?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Formal Safari Suit',
      drivingLicenseNumber:'DL-01-2015-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['First Aid','Tourism Guide'], specialTraining:['Wedding Etiquette','Airport Protocol'],
      bio:'Go-to chauffeur for weddings and family events. Deep knowledge of Gujarati customs makes him ideal for celebratory occasions.',
      drivingStyle:'Professional & Precise', specializations:['Wedding Convoys','Airport Transfers','Family Events']
    },
    { id:3, fullName:'Anil Shah', firstName:'Anil', age:29, experienceYears:6, pricePerDay:1200, totalTripsCompleted:600,
      languages:['English','Hindi','Marathi'], availabilityStatus:'Available',
      profilePhoto:'/images/chauffeurs/anil.png',
      uniformStyle:'Modern Formal',
      drivingLicenseNumber:'DL-12-2018-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving'], specialTraining:['Nightlife Escort','City Tours'],
      bio:'Most dynamic chauffeur in the fleet. Specializes in exotic and sports vehicles. Trained at IIMD Advanced Motorsport Academy.',
      drivingStyle:'Swift & Confident', specializations:['Sports Car Handling','City Tours','Night Events']
    },
    { id:4, fullName:'Suresh Kumar', firstName:'Suresh', age:38, experienceYears:10, pricePerDay:900, totalTripsCompleted:750,
      languages:['Hindi','Gujarati'], availabilityStatus:'Busy',
      profilePhoto:'/images/chauffeurs/suresh.png',
      uniformStyle:'Formal',
      drivingLicenseNumber:'DL-09-2017-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving','Elderly Care Transit'], specialTraining:['Family Trips','Medical Escort'],
      bio:'Most trusted family-trip chauffeur. Specializes in comfortable long-distance travel for elderly clients and children.',
      drivingStyle:'Smooth & Calm', specializations:['Family Trips','Medical Escort','Pilgrimage Routes']
    },
    { id:5, fullName:'Arjun Reddy', firstName:'Arjun', age:45, experienceYears:15, pricePerDay:2500, totalTripsCompleted:1500,
      languages:['English','Hindi','Telugu'], availabilityStatus:'Available', isTopChauffeur:true,
      profilePhoto:'/images/chauffeurs/arjun.png',
      uniformStyle:'Tactical Formal',
      drivingLicenseNumber:'DL-03-2005-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Security Protocol','First Aid','Advanced Driving'], specialTraining:['VIP Security','Convoy Driving'],
      bio:'Former NSG trainee turned luxury driver with 15 years of VIP escort experience for Cabinet ministers and corporate CEOs.',
      drivingStyle:'Luxury & Refined', specializations:['VIP Security','Counter-Surveillance','Long-Range Missions']
    },
    { id:6, fullName:'Mohan Das', firstName:'Mohan', age:52, experienceYears:25, pricePerDay:1800, totalTripsCompleted:3000,
      languages:['English','Hindi','Gujarati'], availabilityStatus:'On Leave', isTopChauffeur:true,
      profilePhoto:'/images/chauffeurs/mohan.png',
      uniformStyle:'Classic Chauffeur',
      drivingLicenseNumber:'DL-01-1995-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Master Driver','VIP Protocol','First Aid'], specialTraining:['Government Protocol','VVIP Handling'],
      bio:'Living legend of Indian luxury driving. 3,000+ trips over 25 years. Personal commendation from the Government of Gujarat.',
      drivingStyle:'Luxury & Refined', specializations:['Diplomatic Escort','VVIP Protocol','Government Fleet']
    },
    { id:7, fullName:'Dinesh Solanki', firstName:'Dinesh', age:34, experienceYears:7, pricePerDay:1100, totalTripsCompleted:420,
      languages:['Hindi','Gujarati'], availabilityStatus:'Available',
      profilePhoto:'/images/chauffeurs/dinesh.png',
      uniformStyle:'Business Formal',
      drivingLicenseNumber:'DL-07-2017-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving'], specialTraining:['Airport Protocol','Highway Driving'],
      bio:'Reliable and punctual chauffeur with 7 years of corporate transport experience across Gujarat.',
      drivingStyle:'Professional & Precise', specializations:['Corporate Transfers','Airport Pickups','Highway Trips']
    },
    { id:8, fullName:'Kamlesh Rathod', firstName:'Kamlesh', age:40, experienceYears:9, pricePerDay:1300, totalTripsCompleted:560,
      languages:['Hindi','Gujarati','English'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1712130126754-009c33690ee3?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Formal Safari',
      drivingLicenseNumber:'DL-05-2015-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['First Aid','Wedding Logistics'], specialTraining:['Wedding Coordination','Guest Management'],
      bio:'Specialist in wedding event logistics with experience managing large convoy operations across Rajasthan and Gujarat.',
      drivingStyle:'Smooth & Calm', specializations:['Wedding Convoys','VIP Transfers','Event Logistics']
    },
    { id:9, fullName:'Bhavesh Parmar', firstName:'Bhavesh', age:31, experienceYears:5, pricePerDay:800, totalTripsCompleted:280,
      languages:['Gujarati','Hindi'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Casual Formal',
      drivingLicenseNumber:'DL-11-2019-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving'], specialTraining:['City Navigation','Customer Service'],
      bio:'Young professional with a knack for navigating Ahmedabad\'s complex road network efficiently. Great with first-time luxury car clients.',
      drivingStyle:'Swift & Confident', specializations:['City Tours','Short Transfers','Outstation Trips']
    },
    { id:10, fullName:'Nitin Joshi', firstName:'Nitin', age:39, experienceYears:11, pricePerDay:1600, totalTripsCompleted:900,
      languages:['English','Hindi','Gujarati'], availabilityStatus:'Available',
      profilePhoto:'https://media.istockphoto.com/id/2165571969/photo/asian-businessman-big-toothy-smile-studio-isolated-portrait-confident-professional-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=shDtTV_1-bzmeSGb8zPse8CDQAc2TLCAsSbaQopNZ8Q=',
      uniformStyle:'Premium Formal',
      drivingLicenseNumber:'DL-02-2013-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Advanced Driving','VIP Protocol'], specialTraining:['Luxury Fleet Management','Long Range Travel'],
      bio:'Experienced professional specializing in long-distance luxury journeys across western India. Known for comfort optimization on extended trips.',
      drivingStyle:'Luxury & Refined', specializations:['Long Distance','VIP Clients','Outstation Comfort']
    },
    { id:11, fullName:'Hardik Trivedi', firstName:'Hardik', age:27, experienceYears:4, pricePerDay:700, totalTripsCompleted:180,
      languages:['Gujarati','Hindi'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1714237447344-21773efd1d56?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Smart Casual Formal',
      drivingLicenseNumber:'DL-08-2020-*******', backgroundVerified:true, policeVerificationStatus:false,
      certifications:['Defensive Driving'], specialTraining:['City Navigation'],
      bio:'Emerging chauffeur known for warm hospitality and local area expertise across Ahmedabad\'s key business districts.',
      drivingStyle:'Professional & Precise', specializations:['City Transfers','Airport Pickups','Day Hire']
    },
    { id:12, fullName:'Kalpesh Desai', firstName:'Kalpesh', age:43, experienceYears:13, pricePerDay:1700, totalTripsCompleted:1100,
      languages:['English','Gujarati','Hindi'], availabilityStatus:'Available', isTopChauffeur:true,
      profilePhoto:'https://images.unsplash.com/photo-1763610452494-e4c2acc57690?q=80&w=800&auto=format&fit=crop',
      uniformStyle:'Classic Black Formal',
      drivingLicenseNumber:'DL-03-2011-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving','First Aid','VIP Protocol'], specialTraining:['Luxury Fleet','Corporate Escort'],
      bio:'Senior chauffeur with 13 years of elite service. Client retention rate exceeds 90% — passengers become regulars after the first ride.',
      drivingStyle:'Smooth & Calm', specializations:['Corporate Accounts','Airport Transfers','VIP Escort']
    },
    { id:13, fullName:'Mukesh Agarwal', firstName:'Mukesh', age:48, experienceYears:18, pricePerDay:2000, totalTripsCompleted:2100,
      languages:['Hindi','English'], availabilityStatus:'Available', isTopChauffeur:true,
      profilePhoto:'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Classic Chauffeur',
      drivingLicenseNumber:'DL-06-2006-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Master Driver','Advanced Driving','VIP Protocol'], specialTraining:['VIP Handling','International Clients'],
      bio:'18-year veteran with specialization in international clientele. Has driven visiting delegations at three Vibrant Gujarat Summits.',
      drivingStyle:'Luxury & Refined', specializations:['International VIP','Government Delegation','Summit Events']
    },
    { id:14, fullName:'Jigar Pandya', firstName:'Jigar', age:33, experienceYears:6, pricePerDay:950, totalTripsCompleted:320,
      languages:['Gujarati','Hindi','English'], availabilityStatus:'Busy',
      profilePhoto:'https://images.unsplash.com/photo-1552571072-0eadf8e3953c?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Business Casual Formal',
      drivingLicenseNumber:'DL-04-2018-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving'], specialTraining:['City Navigation','Tourism Guide'],
      bio:'Popular city guide and chauffeur rolled into one. Clients love his commentary on Ahmedabad\'s heritage and modern landmarks during drives.',
      drivingStyle:'Professional & Precise', specializations:['City Tours','Heritage Routes','Airport Transfers']
    },
    { id:15, fullName:'Tejas Kapadia', firstName:'Tejas', age:30, experienceYears:5, pricePerDay:850, totalTripsCompleted:240,
      languages:['English','Gujarati'], availabilityStatus:'Available',
      profilePhoto:'https://plus.unsplash.com/premium_photo-1663076401064-a5fec5be2948?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Modern Sleek Formal',
      drivingLicenseNumber:'DL-09-2019-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving'], specialTraining:['Performance Vehicle Handling'],
      bio:'Adrenaline-aware chauffeur who blends speed consciousness with absolute safety. Ideal for sports car hirers seeking a premium experience.',
      drivingStyle:'Swift & Confident', specializations:['Sports Cars','Performance Driving','Night Events']
    },
    { id:16, fullName:'Darshan Naik', firstName:'Darshan', age:36, experienceYears:8, pricePerDay:1050, totalTripsCompleted:490,
      languages:['Hindi','Gujarati','Telugu'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1654279511005-eb0531f49dce?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Formal',
      drivingLicenseNumber:'DL-10-2016-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['First Aid','Defensive Driving'], specialTraining:['Long Distance','Highway Safety'],
      bio:'Calm demeanor, zero accidents in 8+ years. Preferred by repeat clients for his reliability on extended highway journeys.',
      drivingStyle:'Smooth & Calm', specializations:['Long Distance','Highway Trips','City Transfers']
    },
    { id:17, fullName:'Vishal Rana', firstName:'Vishal', age:44, experienceYears:14, pricePerDay:1900, totalTripsCompleted:1300,
      languages:['English','Hindi'], availabilityStatus:'Available', isTopChauffeur:true,
      profilePhoto:'https://images.unsplash.com/photo-1747913485453-42696ca5b510?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Premium Black Suit',
      drivingLicenseNumber:'DL-01-2010-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Advanced Driving','VIP Protocol','Security Protocol'], specialTraining:['VIP Security','Defensive Tactics'],
      bio:'Ex-hotel security and luxury fleet manager with 14 years of impeccable service. Combines discretion with professionalism.',
      drivingStyle:'Luxury & Refined', specializations:['VIP Security','Corporate Events','International Guests']
    },
    { id:18, fullName:'Rohan Choksi', firstName:'Rohan', age:28, experienceYears:3, pricePerDay:650, totalTripsCompleted:120,
      languages:['English','Gujarati'], availabilityStatus:'Available',
      profilePhoto:'https://media.istockphoto.com/id/1162254186/photo/indian-businessman.webp?a=1&b=1&s=612x612&w=0&k=20&c=J9hMQKL8fq1wIOxvdAKTcYxc664gEatv6y2L6o7rvEg=',
      uniformStyle:'Smart Casual Formal',
      drivingLicenseNumber:'DL-06-2021-*******', backgroundVerified:true, policeVerificationStatus:false,
      certifications:['Defensive Driving'], specialTraining:['City Navigation','Customer Service'],
      bio:'One of LUXEDIVE\'s newest recruits, Rohan brings enthusiasm and modern driving techniques. Best suited for city and short-distance rides.',
      drivingStyle:'Swift & Confident', specializations:['City Transfers','Short Distance','Airport Pickups']
    },
    { id:19, fullName:'Nilesh Vaghela', firstName:'Nilesh', age:41, experienceYears:12, pricePerDay:1400, totalTripsCompleted:820,
      languages:['Gujarati','Hindi','English'], availabilityStatus:'Available',
      profilePhoto:'https://images.unsplash.com/photo-1676743217690-fb7bb4f20544?w=800&auto=format&fit=crop&q=60',
      uniformStyle:'Traditional Formal',
      drivingLicenseNumber:'DL-07-2012-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving','First Aid'], specialTraining:['Pilgrimage Routes','Wedding Events'],
      bio:'Deeply knowledgeable about pilgrimage routes across Gujarat and Rajasthan. Preferred choice for religious trips and family functions.',
      drivingStyle:'Smooth & Calm', specializations:['Pilgrimage Trips','Family Events','Religious Tours']
    },
    { id:20, fullName:'Sanjay Sharma', firstName:'Sanjay', age:37, experienceYears:9, pricePerDay:1250, totalTripsCompleted:640,
      languages:['Hindi','English','Punjabi'], availabilityStatus:'Available',
      profilePhoto:'https://media.istockphoto.com/id/1162520281/photo/portrait-of-a-young-indian-successful-businessman-wearing-suit-and-spectacles.webp?a=1&b=1&s=612x612&w=0&k=20&c=xFA3oCo8UBx1ieLkMJBWyQT7oZOlbsukG2i30G856H8=',
      uniformStyle:'Premium Formal',
      drivingLicenseNumber:'DL-03-2015-*******', backgroundVerified:true, policeVerificationStatus:true,
      certifications:['Defensive Driving','Advanced Driving'], specialTraining:['North India Routes','VIP Transfers'],
      bio:'Cross-country specialist with extensive knowledge of NH-48 and NH-27 corridors. Popular for Ahmedabad–Delhi and Ahmedabad–Mumbai runs.',
      drivingStyle:'Professional & Precise', specializations:['Long Distance','Highway Expertise','Corporate Accounts']
    },
];

function escape(s) {
    if (!s) return null;
    return s.replace(/'/g, "''");
}

let sql = "INSERT INTO chauffeurs (legacy_id, full_name, first_name, profile_photo, age, experience_years, total_trips_completed, price_per_day, languages, availability_status, is_top_chauffeur, bio, driving_style, specializations, uniform_style, certifications, background_verified, police_verification_status, driving_license_number) VALUES\n";

BASE.forEach((c, i) => {
    const langs = `ARRAY['${c.languages.join("','")}']`;
    const specs = `ARRAY['${c.specializations.join("','")}']`;
    const certs = `ARRAY['${c.certifications.join("','")}']`;
    
    sql += `(${c.id}, '${escape(c.fullName)}', '${escape(c.firstName)}', '${escape(c.profilePhoto)}', ${c.age}, ${c.experienceYears}, ${c.totalTripsCompleted}, ${c.pricePerDay}, ${langs}, '${c.availabilityStatus}', ${c.isTopChauffeur || false}, '${escape(c.bio)}', '${escape(c.drivingStyle)}', ${specs}, '${escape(c.uniformStyle)}', ${certs}, ${c.backgroundVerified}, ${c.policeVerificationStatus}, '${escape(c.drivingLicenseNumber)}')`;
    
    if (i < BASE.length - 1) {
        sql += ",\n";
    } else {
        sql += ";\n";
    }
});

fs.writeFileSync("populate_chauffeurs.sql", sql);
console.log("Generated populate_chauffeurs.sql");
