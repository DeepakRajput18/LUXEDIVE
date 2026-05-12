"""
generate_reviews.py
Generates populate_unique_reviews.sql with 500+ genuinely unique,
naturally-worded reviews. No prefix/suffix hacks, no broken tuple text.
"""

import random
import re

# ============================================================
# BASE REVIEW TEXTS — hand-crafted, completely natural
# ============================================================

# ---------- 5-STAR — Professional (50 variations) ----------
PROF_5 = [
    "Outstanding professional service from start to finish. Highly recommend.",
    "Exceptional attention to detail. Made our journey completely stress-free.",
    "Courteous driver who maintained professionalism throughout the entire trip.",
    "Well-dressed, polite, and knew exactly how to handle corporate clients.",
    "The level of professionalism exceeded our expectations. Will definitely book again.",
    "Punctual, polite, and professional — everything you want in a chauffeur.",
    "Handled our VIP guests with utmost care and professionalism.",
    "Extremely professional conduct. Our business partners were genuinely impressed.",
    "Maintained perfect decorum during our entire wedding event. Flawless.",
    "Professional attitude combined with a warm, friendly service.",
    "Very respectful and maintained appropriate boundaries throughout the journey.",
    "Understood the importance of discretion for our confidential business trip.",
    "Treated us with respect and dignity. A true professional.",
    "Corporate etiquette was impeccable. Left a great impression on our international clients.",
    "Professional service that absolutely justified the premium pricing.",
    "Conducted himself with poise even in the most stressful traffic situations.",
    "Impeccable conduct during our high-stakes boardroom transfer.",
    "A masterclass in elite service. Polished, precise, and perfectly timed.",
    "Sets the gold standard of hospitality. Never dropped his professional guard.",
    "Sophisticated and reliable. Handled our complex logistics flawlessly.",
    "A calm, composed demeanor that immediately put our corporate guests at ease.",
    "Dress code was immaculate. Formal attire, polished shoes, crisp presentation.",
    "He introduced himself by name and explained the route. Very professional touch.",
    "Opened car doors without being asked. Old-school elegance done right.",
    "Corporate transfer made seamless. This driver knows executive etiquette.",
    "Minimal small talk — focused on driving. Exactly what we needed.",
    "Proactively confirmed every detail before departure. Zero confusion.",
    "Handled luggage with care and efficiency. No awkward waiting moments.",
    "Discretion and tact define this driver's approach. Perfect for sensitive trips.",
    "Our CEO commented that the driver was 'better than most hotel concierges'.",
    "Greeted us with a name card at arrivals. That level of detail is rare.",
    "Zero complaints from our delegation. This is what luxury service looks like.",
    "Took ownership of every aspect of the journey without being intrusive.",
    "Soft-spoken and measured in communication. Absolute professional throughout.",
    "Handled a last-minute itinerary change without a single complaint.",
    "Well-read and could hold an intelligent conversation when invited to.",
    "The kind of chauffeur that makes you look good to your guests.",
    "Patient when we ran late at our meeting without so much as a sigh.",
    "Our foreign guests said it was the best driver experience they've had in India.",
    "Professional tone on the phone before pickup and equally refined in person.",
    "Treated our elderly relatives with the special care they deserved.",
    "A no-fuss professional who let the quality of service do the talking.",
    "Clear communication at every step. No guesswork, no confusion.",
    "Pristine presentation and professional focus. Truly luxury level service.",
    "This driver elevated our company's image during the client visit.",
    "Calm under pressure when our event ran over 45 minutes. Just waited patiently.",
    "He understood the brief: formal, discreet, on-time. Delivered all three.",
    "Handled a difficult passenger with grace and without escalation. Impressive.",
    "First time using LUXEDIVE. Left completely won over by professionalism.",
    "The driver's conduct was indistinguishable from a five-star hotel experience.",
]

# ---------- 5-STAR — Comfort & Luxury (50 variations) ----------
COMFORT_5 = [
    "Luxury vehicle maintained in pristine condition. Felt like royalty.",
    "Air conditioning was perfectly calibrated. Seats were plush and comfortable.",
    "Smooth ride throughout. The vehicle's suspension absorbed every road bump.",
    "Spacious interior with ample legroom. Comfortable for five adults with ease.",
    "The car smelled fresh and clean. Water bottles were provided. Lovely touch.",
    "Phone chargers, refreshments, and surprisingly good WiFi. Impressed.",
    "Vehicle was spotless inside and out. Clary well-maintained fleet.",
    "Incredibly comfortable ride. My elderly parents had zero complaints.",
    "Ride quality was superb. Not a single vibration even on rough patches.",
    "Plush interiors and silky smooth driving. Worth every rupee.",
    "Car was recently sanitized and smelled like a five-star hotel lobby.",
    "Absolute velvet on wheels. The suspension soaked up everything.",
    "I've never been more comfortable in a moving vehicle. Pristine condition.",
    "Climate control was spot-on. Pure luxury from the moment we stepped in.",
    "Quiet, smooth, and deeply relaxing. A genuine sanctuary on wheels.",
    "Top-tier comfort. The seats felt like they were personally adjusted for us.",
    "Elegant cabin with thoughtful touches. Felt deeply premium throughout.",
    "A refreshing oasis on wheels — cool, quiet, and relaxing in the afternoon heat.",
    "It truly felt like a first-class cabin experience, on the road.",
    "Flawless vehicle condition. Not a speck of dust, total comfort.",
    "The cabin was cool before I even sat down. Proactive comfort.",
    "Complimentary snacks and chilled water bottles. Surprise touches matter.",
    "The sound insulation was excellent. Barely heard external traffic noise.",
    "Headroom and legroom generous enough for the tallest in our group.",
    "The car felt brand new. Zero rattles, zero odors, zero discomfort.",
    "Seats were firm yet supportive. Perfect for a three-hour drive.",
    "The driver adjusted the music to a low, pleasant background level. Thoughtful.",
    "Luxury that wasn't ostentatious — tasteful, comfortable, and refined.",
    "Kids fell asleep in minutes. That's the truest comfort test. Passed.",
    "Each seat had an individual armrest. Little details that add up.",
    "Rear AC vents were ice cold — critical for peak summer travel.",
    "The panoramic roof added an incredible dimension to the scenic drive.",
    "Charging all our phones simultaneously was a thoughtful added convenience.",
    "No stale odor, no dust, no clutter. Just clean luxury.",
    "My back felt better after the drive than before. Great seat quality.",
    "Smooth at 120 km/h on the highway. Engine barely audible.",
    "The vehicle's suspension on the Ahmedabad bypass was impressively smooth.",
    "The ambient lighting inside the cabin was subtle and perfectly relaxing.",
    "Crystal clear windows — spotless inside and out.",
    "Reading without strain in that ride — zero vibrations.",
    "The rear shelf had a dedicated tissue holder and sanitizer. Smart setup.",
    "Reclineable rear seats made the night journey genuinely restful.",
    "Best in-car audio experience I've had. Premium speakers throughout.",
    "Driver preset the AC before pickup. Small act, huge difference.",
    "A first-class cabin experience at a very fair price. Exceptional.",
    "Our toddler slept the entire way. Says it all about ride quality.",
    "The carpet was vacuumed so well it looked showroom fresh.",
    "The windows were tinted just right — privacy without darkness.",
    "Refreshed and comfortable on arrival, even after 4 hours on the road.",
    "Luxurious without being showy. The perfect subtle premium.",
]

# ---------- 5-STAR — Safety & Driving (50 variations) ----------
SAFETY_5 = [
    "Safe driver who respected every traffic rule. Never felt the slightest concern.",
    "Excellent driving skills. Navigated dense city traffic with complete ease.",
    "Defensive driving was clearly second nature to this driver. Felt protected.",
    "Maintained safe speed and following distance. No aggressive braking.",
    "My mother, who is a nervous passenger, was completely relaxed the whole trip.",
    "Anticipated road conditions well ahead of time. No reactive corrections.",
    "Phone was never touched during the drive. Absolute focus on the road.",
    "Highway driving was smooth and strictly within speed limits. Reassuring.",
    "Handled the steep curves on the highway with expert precision.",
    "Checked mirrors constantly and was always aware of surrounding vehicles.",
    "Night driving managed with extra caution and appropriate speed reductions.",
    "Rain on the highway — reduced speed immediately without being asked.",
    "Kept a respectful distance from all heavy vehicles. Smart, safe driving.",
    "A sudden pedestrian crossing was handled with flawless reflexes.",
    "Patient and calm. Never once compromised safety for speed.",
    "Active awareness in school and residential zones. Responsible driving.",
    "Smooth, predictable braking. No sudden jolts whatsoever.",
    "Felt like a trained defensive driving instructor behind the wheel.",
    "Vigilant and measured without being overly cautious. Efficient yet safe.",
    "Precise awareness in narrow city streets. No scraping, no close calls.",
    "Lane discipline was immaculate on the expressway. Professional technique.",
    "Kept the hazard lights on when stationary at a narrow pickup point. Safety aware.",
    "Seatbelts were offered and confirmed before the car moved. Proper protocol.",
    "Emergency stop executed flawlessly when a bike cut in unexpectedly.",
    "Consciously slowed down at every speed breaker. Comfort and safety combined.",
    "Zero phone usage, zero fatigue, zero recklessness. Model driver.",
    "My daughter's first long-distance journey — felt completely safe throughout.",
    "Overtook only when genuinely clear ahead. No risky maneuvers.",
    "Calm driving even when other drivers were aggressive or erratic.",
    "Clear signals in advance of every turn. Predictable, professional driving.",
    "Construction zone was navigated cautiously with reduced speed and full attention.",
    "Handled fog on the morning expressway with lights and reduced speed. Smart.",
    "No sudden AC changes while driving — even temperature management.",
    "Pulled over safely when we asked for a brief rest stop. No drama.",
    "Kept both hands on the wheel across the full journey. Rare discipline.",
    "Our doctor relative commented she'd rate the drive as clinically stress-free.",
    "First aid kit visible and accessible. Safety-first operator for sure.",
    "Slowed well before every toll as opposed to braking at the last second.",
    "Made eye contact in the mirror to confirm comfort at each stop. Caring.",
    "Excellent awareness of the car's blind spots in complex junctions.",
    "Crossed the railway level crossing at a near-crawl. Never cuts corners on safety.",
    "Kept indicator on for a full 3 seconds before every lane change. Textbook.",
    "Picked the calmest road for our sick family member. Proactive care.",
    "The safest long-distance drive I've experienced in a decade of travel.",
    "Speed was matched perfectly to the road conditions at every point.",
    "Expert knowledge of which roads to avoid at night. Kept us safe.",
    "Even in peak city traffic, never used the horn aggressively. Calm driving.",
    "Fog lights were used appropriately — not blinding others. Good awareness.",
    "Bumper-to-bumper traffic was handled with patience and zero aggression.",
    "One of the rare drivers who makes you say 'that was safe AND comfortable'.",
]

# ---------- 5-STAR — Local Knowledge (50 variations) ----------
KNOW_5 = [
    "Knew all the shortcuts and saved us nearly 40 minutes. Invaluable knowledge.",
    "Recommended an excellent restaurant on route. Became our surprise guide!",
    "Avoided every single traffic bottleneck by taking smart alternate routes.",
    "Explained the history of the streets we passed through. A bonus tour guide!",
    "Knew the exact times the major toll booths are rush-free. Sharp thinking.",
    "Pointed out the best viewpoints for sunset photos. Stunning shots result!",
    "His local route knowledge genuinely saved us from a speeding fine.",
    "Directed us to a rest stop with exceptional hygiene standards. Very helpful.",
    "Knew exactly which lanes to use on the highway at different times of day.",
    "Advised on the best arrival time for each attraction to beat the crowds.",
    "Bypassed every construction zone through back routes only a local knows.",
    "Took us to a local eatery we'd never have discovered ourselves. Amazing food.",
    "Knew where the police checking points were. Documents ready, zero hold-ups.",
    "Suggested a scenic 8-minute detour that was absolutely worth every moment.",
    "Local knowledge transformed this trip into a cultural experience.",
    "Knew exactly where to park for quick access at every destination.",
    "Brilliant rush-hour route planning. Saved us over 30 minutes in total.",
    "Shared market tips that saved us a lot of money during shopping stops.",
    "Knows the pulse of Ahmedabad's traffic better than any app.",
    "His local insights were genuinely better than everything Google Maps suggested.",
    "Pointed out which petrol station ahead was fast-service — tiny detail, big help.",
    "Knew which hotel entry was guest-friendly for quick drop-offs. Efficient.",
    "Avoided a major accident-prone junction by taking a lesser-known bypass.",
    "Local tip on which ATM had the shortest queue. Surprisingly useful.",
    "Suggested the scenic riverside route which added beauty without adding time.",
    "Knew which truck stops are safe and hygienic for late-night travel meals.",
    "Route adapted in real time around a local festival procession. Impressive.",
    "Alerted us to a road closure 10km out and rerouted without any stress.",
    "Tips on which areas to photograph from the car were spot on.",
    "Knew exactly when the last heritage site visit would be — saved us a trip back.",
    "First-hand knowledge of Ahmedabad's best street food spots. We ate well!",
    "His familiarity with less-known lanes around the stadium saved us an hour.",
    "Recommended which arrival gate at the venue had the shortest queue. Smart.",
    "Knew the exact time to leave to avoid peak traffic heading to the airport.",
    "Avoided the regular highway in favor of a smoother, faster state road.",
    "Recommended hydration stops on the desert stretch — a genuinely helpful guide.",
    "Could predict signal-timing patterns. Little things that save big time.",
    "Knew which guesthouses had reliable parking — saved stress on arrival.",
    "Shared context on every neighborhood we passed through. Cultural gold.",
    "Guided us to the best viewpoint for the morning sunrise. Truly memorable.",
    "Suggested the shaded parking near the market. Thoughtful local detail.",
    "Perfectly timed the drive to avoid peak heat over the exposed highway section.",
    "Intimate knowledge of the old city. Took us off the tourist circuit entirely.",
    "Told us which toll route was fastest versus which was cheapest. Thoughtful.",
    "Route planning accounted for our elderly passengers. Avoided bumpy roads.",
    "His knowledge of the city is like a live, real-time alternative to GPS.",
    "Recommended we allow an extra 10 minutes for the return leg. Right call.",
    "Took us through a street market that was a highlight of our whole trip.",
    "Knew the train timing at the level crossing to time the drive perfectly.",
    "Much more than a driver — a genuine local knowledge companion.",
]

# ---------- 5-STAR — Punctuality (50 variations) ----------
PUNCTUAL_5 = [
    "Arrived 10 minutes ahead of schedule. Punctuality at its finest.",
    "Never kept us waiting, not even once across the entire multi-day booking.",
    "Time management was impeccable. We arrived at every stop exactly on plan.",
    "5 AM airport pickup and the driver was already waiting when we stepped out.",
    "Multi-day booking — punctual to the minute every single day without exception.",
    "Caught our flight with a full 35 minutes to spare. Relief personified.",
    "Driver proactively built in buffer time. We made our train with ease.",
    "A 10-stop wedding itinerary — on-time at every single venue. Incredible.",
    "Tracked our flight delay and adjusted pickup time automatically. Smart service.",
    "4 AM pickup for a pilgrimage — driver waiting 15 minutes early. Devotion.",
    "Never offered a single excuse for a delay. Always precise and communicative.",
    "A driver who treats our schedule as seriously as we do. True professional.",
    "Arrived at the boardroom venue with a 20-minute cushion to spare.",
    "Three-day multi-city tour — not a single activity ran late. Perfect logistics.",
    "Proactively left earlier to account for a public event in the city. Brilliant.",
    "Clockwork consistency. Already there whenever I looked up from my phone.",
    "Juggled three consecutive pickups without a single person waiting. Masterful.",
    "Always messaged ETA 15 minutes before arrival. Consistent and reliable.",
    "His timing at the venue exit was so precise it felt pre-choreographed.",
    "Respect for time shown in every small action from start to finish.",
    "Called ahead when the highway had slowed to prepare us. Communication gold.",
    "We had zero margin for error for the flight. He delivered with minutes to spare.",
    "The driver understood the stakes of our tight medical appointment window.",
    "Booked for 20 days. Punctual every single morning without reminder.",
    "He factored in the longer check-in queue at the terminal. Saved us the rush.",
    "Adjusted pickup time proactively based on traffic forecasts. Proactive planning.",
    "For a dinner reservation with a strict arrival rule — he got us there on time.",
    "No anxiety about being late for the first time in our road travel history.",
    "Never drove dangerously fast to compensate — trusted his planning instead.",
    "Pick-up in a complex multi-entrance mall — found us without a single call.",
    "Real-time updates over WhatsApp during the wait. Modern, thoughtful service.",
    "Arrived before we'd even finished packing the car. That is being early.",
    "Scheduled to pick us up at a precise 8:47 AM — he was there at 8:42.",
    "Coordinated three different guests from three different terminals. Seamless.",
    "Our elderly aunt was never left waiting, not even for 2 minutes.",
    "Adjusted our departure window when we flagged a traffic alert. Collaborative.",
    "Even a sudden route blockage didn't make us late. Rerouted instantly.",
    "Timing was so accurate our client commented there must have been a rehearsal.",
    "For a live event with a fixed curtain-up time — we were seated with 10 to spare.",
    "Managed to be punctual across a chaotic cricket match day in the city.",
    "Every handoff during the wedding was timed to the second. Impressive.",
    "I stopped tracking arrival times because I knew he'd always be there.",
    "Reliable in a way that erases the anxiety of travel planning entirely.",
    "Sent a 'I'm downstairs' message exactly when expected. Consistent professionalism.",
    "When the GPS rerouted, he still arrived within the original ETA. Impressive.",
    "Departed on our schedule, not his. Never rushed us out.",
    "7-day road trip — never once did we wait for him. Not once.",
    "The ceremonial procession traffic added 20 minutes. He had already factored it in.",
    "For a high-pressure pitch meeting — delivery was perfect. We nailed both.",
    "He understands punctuality as an act of respect. A rare quality.",
]

# ---------- 5-STAR — Vehicle Quality (50 variations) ----------
VEHICLE_5 = [
    "Brand new vehicle with all the latest features. Exceeded every expectation.",
    "Well-maintained car despite being 3 years old. In genuinely perfect condition.",
    "The vehicle matched the listing photos exactly. No misleading information.",
    "Car was recently serviced. Everything — AC, infotainment, windows — worked perfectly.",
    "A luxury SUV spacious enough for the whole family plus all our luggage.",
    "Vintage car for our wedding — absolutely stunning. Our photos look incredible.",
    "Sports car experience was exhilarating. A genuine bucket list moment fulfilled.",
    "Premium interiors that genuinely felt like a private jet on wheels.",
    "Vehicle had full modern amenities including wireless Android Auto and Apple CarPlay.",
    "Car was washed, vacuumed, and ready before we arrived. Spotless in every detail.",
    "The panoramic sunroof transformed a mountain drive into something magical.",
    "Sound system was exceptional. We had a private concert across the highway.",
    "Car was a genuine head-turner. Pristine paint, powerful presence.",
    "Modern, sleek, and exceptionally well-kept. Every detail top-tier.",
    "Best car I've ever been a passenger in. Engine inaudible at 100 km/h.",
    "Charging cables for every device type were available in the rear console.",
    "The interior scent was a premium fragrance — not the usual synthetic car smell.",
    "Upholstery was immaculate. Not a single thread out of place.",
    "Advanced safety features visible and active — lane assist, collision warning.",
    "Clean, shiny, and performing perfectly. Could not have asked for more.",
    "Rear sunshade was deployed for our toddler without being asked. Thoughtful.",
    "The air conditioning filter was clearly fresh — zero dusty smell.",
    "Boot space was generous. Fit seven large suitcases without a squeeze.",
    "Tinted windows gave us welcome privacy for sensitive business conversations.",
    "Dashboard screen displaying the route gave us confidence throughout.",
    "Zero wind noise at motorway speed. Excellent sealing and build quality.",
    "The seat material was cool even after hours of sitting. Premium choice.",
    "Fuel efficiency was remarkable for a car of that power. Impressive engineering.",
    "The car's GPS was updated — no wrong turns due to old map data.",
    "Every vent, lever, and control worked smoothly. Proper maintenance evident.",
    "Interior temperature stabilized within 3 minutes. Fast, efficient AC.",
    "The car had a first aid kit, fire extinguisher, and emergency triangle. Safety-ready.",
    "Wheel alignment was perfect — zero pulling on the highway.",
    "Wipers were replaced recently. Rain driving was clear and safe.",
    "No squeaks, no rattles, no dashboard warning lights. Mechanically flawless.",
    "The luggage was secured in the boot with a non-slip mat. Thoughtful detail.",
    "The car looked better in person than in the photos. Rare to say that.",
    "Fold-flat rear seats allowed us to carry an oversized item effortlessly.",
    "All six cup holders were actually usable — rare in most cars.",
    "Entertainment screen in the rear was a hit with the kids on the long drive.",
    "The headrests were adjustable and actually comfortable. Rare engineering.",
    "Fuel was full when we started. No anxious glances at the gauge.",
    "Every mirror was correctly set before departure. Shows training and care.",
    "Spare tyre confirmed full before a long journey. Attention to safety detail.",
    "The car's Bluetooth paired instantly and held connection the whole trip.",
    "Exterior was waxed recently — the shine was remarkable under the midday sun.",
    "The sun visors were large enough to actually shade the eyes. Simple but rare.",
    "Number plates were clean and visible. Legal compliance matters.",
    "The door handles and buttons felt premium — no cost-cutting in the details.",
    "Clean, ready, and waiting — the car is as much a part of the experience as the driver.",
]

# ---------- 5-STAR — Overall Experience (50 variations) ----------
OVERALL_5 = [
    "Best chauffeur service I've experienced anywhere in Ahmedabad. Genuinely outstanding.",
    "Worth every rupee. Will be a returning customer without any hesitation.",
    "Exceeded expectations on every single front. Five stars thoroughly earned.",
    "Our wedding day was stress-free largely because of this exceptional service.",
    "Our corporate clients were visibly impressed. It reflected well on our firm.",
    "The whole family absolutely loved the journey. The kids are already requesting 'that car again'.",
    "From booking confirmation to drop-off — a perfectly seamless experience end-to-end.",
    "This is the benchmark for what premium car services should aspire to be.",
    "Already recommended this to three colleagues. That should speak for itself.",
    "Our anniversary trip was made truly special. Beautiful memories created.",
    "A solo female traveler who felt completely safe the entire journey. That matters.",
    "Our elderly relatives were so comfortable. Peace of mind for the whole family.",
    "Last-minute booking sorted efficiently with zero drama. A real lifesaver.",
    "Outstanding value for money. Premium-grade service at a completely fair price.",
    "LUXEDIVE is my default for all road travel in Gujarat going forward.",
    "A flawless experience across every touchpoint. Truly high-end in every way.",
    "Professionalism and luxury in perfect balance. Worth every cent paid.",
    "Third booking with them — it's consistent 5-star quality every single time.",
    "The attention paid to the passenger experience is genuinely unmatched.",
    "Heartfelt gratitude for making what could have been a stressful trip effortless.",
    "Our international delegates rated the transfer as the smoothest part of the trip.",
    "Medical transport handled with urgency, care, and calm. Exactly what we needed.",
    "Airport transfer to start the vacation — set a brilliant tone for the whole trip.",
    "Absolutely unmatched in terms of reliability and service standard.",
    "From the first call to the final drop-off — professionalism personified.",
    "A premium experience that justified the booking without any second-guessing.",
    "My in-laws arrived relaxed and smiling. That's what good transport delivers.",
    "Zero stress, zero surprises, zero complaints. A complete 10/10 experience.",
    "The trip turned into a highlight of our visit — that's how good it was.",
    "Every detail was handled so we didn't have to think about a single thing.",
    "Booked through multiple platforms before — LUXEDIVE is simply in another league.",
    "This service doesn't just transport you; it genuinely enhances your travel.",
    "The quality of care shown made us feel genuinely important as passengers.",
    "Every member of our group gave the same review: absolutely brilliant.",
    "Our 5-year-old waved goodbye to the driver. That's the level of impression made.",
    "The route, the timing, the comfort — every variable was managed with precision.",
    "Post-trip, the driver checked in to make sure we'd arrived safely. Lovely.",
    "The efficiency of the entire operation was remarkable from start to finish.",
    "Corporate transport sorted for the year. Only using LUXEDIVE from here on.",
    "When the unexpected happens, you see true service — this driver showed his calibre.",
    "I travel frequently. This was categorically the best chauffeur experience I've had.",
    "The service made an ordinary drive feel like an occasion. Remarkable.",
    "Our guests kept asking for the driver's contact. That's the best review.",
    "Booking, communication, pickup, drive, drop-off — every step was five stars.",
    "The total peace of mind throughout was worth the premium alone.",
    "A service you actually look forward to using again. That's the benchmark.",
    "LUXEDIVE understood the brief: luxury, discretion, reliability. All delivered.",
    "I'd put LUXEDIVE up against any premium transfer service in the country.",
    "The consistent excellence through different drivers is what truly impresses.",
    "Driver, car, and service combined to create something genuinely special.",
]

# ---------- 4-STAR — Minor Issues (150 base variations) ----------
FOUR_STAR = [
    # Delay-related
    "Great service overall. Only minor issue was a 15-minute delay in pickup.",
    "Very good experience, though the driver was about 10 minutes late arriving.",
    "A slight delay at pickup — maybe 12 minutes — but the rest was flawless.",
    "Everything was excellent except the driver was behind schedule by 20 minutes.",
    "Punctuality could be better. Arrived 15 minutes after promised time.",
    "Almost perfect. A short wait on pickup, otherwise no complaints at all.",
    "Good service but would appreciate a heads-up message before a delay occurs.",
    "Would have been five stars had the pickup been on the promised time. Close!",
    "Happy with the safety and comfort. Just punctuality could be 5 minutes tighter.",
    "Good trip overall. The drive back was slow — would have liked a faster departure.",

    # Cleanliness / Interior
    "Excellent driving but the car interior could have been vacuumed a bit better.",
    "The driver was great — the car had some dust on the dashboard on inspection.",
    "Very comfortable ride but an old air freshener was overused and overpowering.",
    "Decent experience. Car interior had small marks on the seat — minor but visible.",
    "Good service. A slight stale smell in the cabin on entry, cleared up after AC.",
    "Professional driver but the car's floor mats could have been cleaner.",
    "Comfortable and safe — just the car exterior had a few visible scratches.",
    "The car was presentable. A more thorough clean before pickup would be perfect.",
    "Good car quality overall. Found one forgotten item from a previous passenger.",
    "Fine experience. Car boot had a small leak of some liquid — cleaned by driver.",

    # AC / Climate
    "Professional driver but the AC was only moderately effective in peak summer heat.",
    "Comfortable journey but AC took a long time to fully cool the cabin.",
    "Good experience but the climate control was a little inconsistent.",
    "Comfortable ride. The rear AC vents were weaker than the front — minor issue.",
    "Great trip but wished the AC had been pre-cooled before we boarded.",
    "Fine service. AC worked but the fan made a slight rattling noise at full blast.",
    "Enjoyed the drive. Temperature could have been managed a bit more efficiently.",
    "Good overall — just the heating took a while to kick in during the cold morning.",

    # Music / Volume
    "Comfortable ride but would have preferred softer background music.",
    "Driver played music at a slightly high volume before I asked him to lower it.",
    "Pleasant drive, though the music genre wasn't to my taste — switched easily.",
    "Good service. Audio was on from the start — would prefer silence unless asked.",
    "Great driver, slightly aggressive music selection for an early morning drive.",

    # Route / Navigation
    "Great experience but the driver ignored Google Maps and took a longer route.",
    "Good service but driver was less confident navigating the newer highway stretch.",
    "Route knowledge was strong for the city but less so outside it.",
    "Polite driver but used a slightly longer route than the optimal one.",
    "Very capable driver. Route planning could have been slightly more efficient.",
    "Good driving. Used GPS but over-reliance meant a missed junction once.",
    "Good service but the route chosen added around 15 minutes unnecessarily.",
    "Knowledgeable about major routes but less familiar with the newer bypass.",

    # Conversation / Communication
    "Excellent technically, but limited English slowed down some coordination.",
    "Professional driver. Could improve on explaining detours when they happen.",
    "Good overall service. Driver didn't confirm pickup address until very last minute.",
    "Reliable service. The driver was quite chatty — fine for some, not for all.",
    "Good journey. Would appreciate acknowledgement messages after booking.",
    "Solid service but driver communication before departure could be clearer.",
    "Good experience. Would have liked a brief vehicle and route intro on boarding.",

    # Charging / Amenities
    "Comfortable journey but the USB cable provided didn't suit my phone type.",
    "Good service. Phone charger was available but the cable was quite short.",
    "Good overall. The bottled water was warm — chilled would be better.",
    "Decent experience. Only downside: no bottle water provided in the car.",
    "Comfortable ride but the phone holder mount in the cabin was broken.",
    "Everything was fine. A small suggestion: provide a wet wipe or tissue box.",
    "Good journey. Would have appreciated some light refreshments on a long drive.",

    # Vehicle Condition
    "Comfortable car but the model was a year or two older than expected.",
    "Decent car. The door handle was slightly sticky — minor maintenance oversight.",
    "Good vehicle overall but the infotainment screen glitched twice.",
    "Fine experience. Car's windshield had a small crack — not dangerous but visible.",
    "Good service. Parking sensors made a beeping sound that wasn't explained.",
    "Comfortable ride. Would have preferred a newer model at this price point.",
    "Car was great overall. One window tint was slightly peeling at a corner.",
    "Good trip. Car's rear wiper was making a slight squeak — minor servicing needed.",

    # Driving Style (minor)
    "Safe driver overall but braking in city traffic was occasionally abrupt.",
    "Good technical driver. Could smooth out acceleration from traffic lights.",
    "Comfortable enough but a few sharp corners were taken at slightly high speed.",
    "Safe driving on the highway. Slightly cautious in overtaking situations.",
    "Good overall. A bit too slow sometimes — could have kept better pace.",
    "Pleasant journey. Driving on gravel side-roads felt rushed in sections.",
    "Competent driver. Slight tendency to tail-gate on the expressway.",
    "Good service. Lane changes were fine but less smoothly executed than ideal.",

    # Uniform / Presentation (minor)
    "Driver was professional in conduct but his uniform was slightly wrinkled.",
    "Good service but the driver's shoes weren't polished — small presentation detail.",
    "Pleasant trip. The driver's badge wasn't visible — minor but worth noting.",
    "Good driver. Formal attire could be a touch smarter for a top-tier service.",

    # Overall Good with Minor Note
    "Solid four-star experience. Minor hiccups that didn't spoil an otherwise good trip.",
    "Good value and service. A couple of small things held it back from five stars.",
    "Very close to five stars. One or two small improvements needed.",
    "Great experience in most ways. One niggle: the pickup location was slightly off.",
    "Comfortable and safe journey. Just a couple of areas where refinement is needed.",
    "Thoroughly decent experience. Not flawless but well above average.",
    "Good service — just needs small polish to reach true five-star standard.",
    "Close to perfect. Next booking I hope to report an uncomplicated five stars.",
    "Very good service with minimal issues. Genuinely happy with the experience.",
    "Four stars given generously. Excellent in most areas, minor gaps in a couple.",
    "Positive experience on the whole. Isolated issues prevented a five-star.",
    "The driver was good. The car was good. The timing was okay. All round decent.",
    "Good experience with LUXEDIVE. Would book again for the reliability.",
    "Everything worked well. Route and comfort were strong — timing was just okay.",
    "Would book again. Professional standard with a few areas still to strengthen.",
    "Overall, a very positive trip. Would easily book LUXEDIVE again.",
    "Strong four stars. The service shows genuine care for the passenger experience.",
    "A notch below perfection on this occasion. The drive itself was excellent.",
    "Very good overall. Just the pickup felt slightly less premium than the drive.",
    "Good service from driver and vehicle. A couple of minor misses from five stars.",
]

# ---------- 3-STAR — Average / Significant Issues (70 variations) ----------
THREE_STAR = [
    "Average experience overall. The driver was okay but the car had issues.",
    "Decent service but the half-hour late arrival with no notice was frustrating.",
    "The ride was okay. Our driver seemed visibly fatigued on the return leg.",
    "Car was not properly cleaned before handover. Found leftover items inside.",
    "Acceptable service but felt slightly overpriced relative to the quality delivered.",
    "Driver was polite but needed our help with navigation more than once.",
    "Uncomfortable seats for a journey this long. Not reflective of the advertising.",
    "Speed was okay but unexpectedly aggressive overtaking made passengers nervous.",
    "Met basic expectations but nothing impressed. Felt like a regular taxi ride.",
    "Car AC broke down midway. Driver tried to fix it but ultimately couldn't.",
    "Communication barrier made coordination throughout the journey difficult.",
    "The ride was bumpy and the vehicle felt dated for a luxury-branded service.",
    "Driver arrived 20 minutes late and offered no explanation or apology.",
    "Acceptable for a short trip but I wouldn't rely on this for long distances.",
    "Service needs improvement. Driver was distracted and missed a junction.",
    "Vehicle condition was below what the photos suggested. Disappointing.",
    "The car had a faint smell of smoke that lingered throughout the trip.",
    "No water or basic amenities provided. Felt very basic for the price.",
    "Driving was erratic with too many rapid stops and starts throughout the city.",
    "Okay overall but several small things going wrong added up.",
    "Average trip. Not bad enough to avoid, not good enough to enthusiastically return.",
    "Driver was quiet but the AC was barely functional in the city heat.",
    "Service was technically complete but entirely lacked any premium feel.",
    "The car was old and showed it. Vibrations constant on the highway.",
    "Arrived at the wrong pickup gate and took 15 minutes to locate us.",
    "Driver used GPS but the map version was outdated, causing a detour.",
    "The vehicle smelled musty throughout — unpleasant for 3+ hours.",
    "Basic experience. Needed more proactive communication from the driver.",
    "Got us there eventually, but the journey felt unnecessarily stressful.",
    "Driver played loud radio despite being asked to lower it multiple times.",
    "Adequate driving skill but the car was noisy and squeaky throughout.",
    "Booked a premium car and received something clearly a category below.",
    "The driver kept his phone mounted but was checking messages at signals.",
    "Mild discomfort throughout: bumpy road choice, weak AC, limited conversation.",
    "OK trip but the service level didn't justify the premium price point.",
    "Driver was late and gave a vague excuse. Communication throughout was patchy.",
    "Vehicle was presentable but the ride quality was rough on longer stretches.",
    "Nothing went terribly wrong but nothing impressed us either.",
    "The driver seemed unfamiliar with the pickup location and called 3 times.",
    "Decent effort but the car had visible wear — not what luxury implies.",
    "Service was functional. It got the job done. That's all it did.",
    "Driver's tone felt transactional rather than professional. Subtle but noticeable.",
    "The return journey driver was a different standard to the earlier one.",
    "Three stars is fair. It wasn't bad, but it was far from the standard expected.",
    "Adequate service for the type of journey. Better standards were expected.",
    "A below-par experience that I'm hopeful was a one-off.",
    "Pickup was on time but the car was clearly not inspected beforehand.",
    "The driver was kind enough but the car's odometer and the model didn't match.",
    "Music was chosen by the driver and kept on even after a request to reduce.",
    "For a luxury service, this felt more like a mid-range cab experience.",
    "Okay ride but the driver seemed to be on his first day with the new route.",
    "The journey was fine but the car had clearly been used heavily before us.",
    "Mild issues throughout that accumulated into an underwhelming 3-star experience.",
    "Driver was responsive to messages but very slow to actually arrive.",
    "Not bad at all. Just not what we expected for the price.",
    "The car had two non-functioning rear window controls. Minor but annoying.",
    "The driver arrived, but the whole experience felt rushed and impersonal.",
    "For a corporate booking, the level of presentation was below our expectations.",
    "The service met the minimum standard. It needs to exceed for five stars.",
    "Okay trip but the car was in clear need of a service before being sent out.",
    "Driver was good with directions but rough with braking throughout.",
    "Got us there safely but not particularly comfortably or punctually.",
    "Fine experience but the booking confirmation process was unnecessarily slow.",
    "Three stars — could easily be four with a bit more attention to detail.",
    "The trip was completed. Not much more to say beyond that.",
    "Service was passable for a one-off. I'd look for alternatives for longer use.",
    "Nothing alarming, but nothing remarkable. Expected more from LUXEDIVE.",
    "Okay driving, average communication, functional car. Average experience.",
    "Below the standard I'd expect at this price. Needs improvement.",
    "Basic ride. No extras, no comfort niceties, just a drive. Three stars.",
    "Disappointing relative to previous LUXEDIVE experiences. Off day perhaps.",
]

# ============================================================
# ORGANIC SENTENCE-LEVEL COMBINERS (no prefix/suffix hacking)
# ============================================================

def make_natural_combo_5(cat_pool):
    """Create genuine multi-sentence combos by joining two different short sentences."""
    entries = []
    pairs = [
        (0, 1), (1, 2), (2, 0), (3, 4), (4, 5), (5, 3), (6, 7), (7, 8), (8, 9),
        (9, 10), (10, 11), (11, 12), (12, 13), (13, 14), (14, 15), (15, 16),
        (16, 17), (17, 18), (18, 19), (19, 20), (20, 0), (21, 2), (22, 4),
        (23, 6), (24, 8), (25, 10), (26, 12), (27, 14), (28, 16), (29, 18),
        (30, 1), (31, 3), (32, 5), (33, 7), (34, 9), (35, 11), (36, 13),
        (37, 15), (38, 17), (39, 19), (40, 21), (41, 23), (42, 25), (43, 27),
        (44, 29), (45, 0), (46, 2), (47, 4), (48, 6), (49, 8),
    ]
    n = len(cat_pool)
    for a, b in pairs:
        if a < n and b < n:
            sa = cat_pool[a].rstrip('.')
            sb = cat_pool[b]
            combo = f"{sa}. {sb}"
            if combo not in [e[0] for e in entries]:
                entries.append(combo)
    return entries


def make_cross_cat_combos():
    """Create natural cross-category two-sentence reviews."""
    combos = []
    pool_pairs = [
        (PROF_5, COMFORT_5), (COMFORT_5, SAFETY_5), (SAFETY_5, KNOW_5),
        (KNOW_5, PUNCTUAL_5), (PUNCTUAL_5, VEHICLE_5), (VEHICLE_5, OVERALL_5),
        (OVERALL_5, PROF_5), (PROF_5, SAFETY_5), (COMFORT_5, PUNCTUAL_5),
        (SAFETY_5, VEHICLE_5), (KNOW_5, OVERALL_5), (PUNCTUAL_5, PROF_5),
    ]
    idxs = [(0,1),(2,3),(4,5),(6,7),(8,9),(10,11),(12,13),(14,15),(16,17),
             (18,19),(20,21),(22,23),(24,25),(26,27),(28,29),(30,31),(32,33),
             (34,35),(36,37),(38,39),(40,41),(42,43),(44,45),(46,47),(48,49)]
    for poolA, poolB in pool_pairs:
        for ia, ib in idxs[:10]:
            if ia < len(poolA) and ib < len(poolB):
                sa = poolA[ia].rstrip('.')
                sb = poolB[ib]
                combo = f"{sa}. {sb}"
                combos.append(combo)
    return combos


def build_pool():
    seen = set()
    pool = []  # list of (text, rating, category, style)

    def add(text, rating, cat, style):
        key = text.strip().lower()
        if key not in seen and len(text.strip()) > 0:
            seen.add(key)
            pool.append((text.strip(), rating, cat, style))

    # Add all raw 5-star base entries
    for t in PROF_5:
        add(t, 5, 'professional', 'formal')
    for t in COMFORT_5:
        add(t, 5, 'comfort', 'enthusiastic')
    for t in SAFETY_5:
        add(t, 5, 'safety', 'formal')
    for t in KNOW_5:
        add(t, 5, 'knowledge', 'casual')
    for t in PUNCTUAL_5:
        add(t, 5, 'punctual', 'formal')
    for t in VEHICLE_5:
        add(t, 5, 'vehicle', 'enthusiastic')
    for t in OVERALL_5:
        add(t, 5, 'overall', 'enthusiastic')

    # Cross-category combos for additional 5-star diversity
    for combo in make_cross_cat_combos():
        add(combo, 5, 'overall', 'enthusiastic')

    # Per-category sentence combos
    for cat_pool, cat, style in [
        (PROF_5, 'professional', 'formal'),
        (COMFORT_5, 'comfort', 'enthusiastic'),
        (SAFETY_5, 'safety', 'formal'),
        (KNOW_5, 'knowledge', 'casual'),
        (PUNCTUAL_5, 'punctual', 'formal'),
        (VEHICLE_5, 'vehicle', 'enthusiastic'),
        (OVERALL_5, 'overall', 'enthusiastic'),
    ]:
        for combo in make_natural_combo_5(cat_pool):
            add(combo, 5, cat, style)

    # 4-star reviews
    for t in FOUR_STAR:
        add(t, 4, 'overall', 'casual')

    # 3-star reviews
    for t in THREE_STAR:
        add(t, 3, 'overall', 'casual')

    return pool


def write_sql(pool):
    outpath = "backend/scripts/populate_unique_reviews.sql"
    with open(outpath, "w", encoding='utf-8') as f:
        f.write("-- ============================================================\n")
        f.write("-- UNIQUE REVIEW TEXT POOL — auto-generated\n")
        f.write("-- ============================================================\n\n")

        f.write("CREATE TABLE IF NOT EXISTS review_text_pool (\n")
        f.write("  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n")
        f.write("  review_text TEXT NOT NULL UNIQUE,\n")
        f.write("  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),\n")
        f.write("  category TEXT NOT NULL,\n")
        f.write("  language_style TEXT NOT NULL,\n")
        f.write("  used BOOLEAN DEFAULT FALSE,\n")
        f.write("  used_for_review_id UUID,\n")
        f.write("  created_at TIMESTAMPTZ DEFAULT NOW()\n")
        f.write(");\n\n")

        f.write("CREATE INDEX IF NOT EXISTS idx_review_text_unused ON review_text_pool(used) WHERE used = FALSE;\n")
        f.write("CREATE INDEX IF NOT EXISTS idx_review_text_rating ON review_text_pool(rating);\n\n")

        f.write("TRUNCATE review_text_pool;\n\n")

        # Batch insert
        batch_size = 100
        values = []
        for text, rating, cat, style in pool:
            clean = text.replace("'", "''")
            values.append(f"('{clean}', {rating}, '{cat}', '{style}')")

        for i in range(0, len(values), batch_size):
            batch = values[i:i + batch_size]
            f.write("INSERT INTO review_text_pool (review_text, rating, category, language_style) VALUES\n")
            f.write(",\n".join(batch))
            f.write(";\n\n")

        # Functions
        f.write("""
CREATE OR REPLACE FUNCTION assign_unique_review_text(
  p_review_id UUID,
  p_preferred_rating INTEGER DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
  selected_review RECORD;
BEGIN
  -- First: try to get an unused review matching the preferred rating
  SELECT * INTO selected_review
  FROM review_text_pool
  WHERE used = FALSE
    AND (p_preferred_rating IS NULL OR rating = p_preferred_rating)
  ORDER BY RANDOM()
  LIMIT 1;

  -- Fallback: any unused review regardless of rating
  IF selected_review IS NULL THEN
    SELECT * INTO selected_review
    FROM review_text_pool
    WHERE used = FALSE
    ORDER BY RANDOM()
    LIMIT 1;
  END IF;

  -- Ultimate fallback
  IF selected_review IS NULL THEN
    RETURN 'Exceptional service throughout the journey. Highly recommended.';
  END IF;

  -- Mark as used
  UPDATE review_text_pool
  SET used = TRUE,
      used_for_review_id = p_review_id
  WHERE id = selected_review.id;

  RETURN selected_review.review_text;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION update_all_review_texts()
RETURNS void AS $$
DECLARE
  review_record RECORD;
  new_text TEXT;
BEGIN
  -- Reset used flags first so we can reassign cleanly
  UPDATE review_text_pool SET used = FALSE, used_for_review_id = NULL;

  FOR review_record IN
    SELECT id, rating FROM chauffeur_reviews ORDER BY created_at
  LOOP
    BEGIN
      new_text := assign_unique_review_text(review_record.id, review_record.rating);
      UPDATE chauffeur_reviews SET comment = new_text WHERE id = review_record.id;
    EXCEPTION WHEN OTHERS THEN
      NULL; -- skip and continue
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- EXECUTE: Replace all existing review comments with unique text
-- ============================================================
SELECT update_all_review_texts();


-- ============================================================
-- VERIFICATION QUERIES (run after execution)
-- ============================================================

-- Should return 0 rows (no duplicates)
-- SELECT comment, COUNT(*) as cnt
--   FROM chauffeur_reviews
--   GROUP BY comment
--   HAVING COUNT(*) > 1
--   ORDER BY cnt DESC;

-- Distribution by rating
-- SELECT rating, COUNT(*) FROM chauffeur_reviews GROUP BY rating ORDER BY rating DESC;

-- Sample 20 random reviews
-- SELECT cr.full_name, cr.rating, cr.comment, c.full_name as chauffeur
--   FROM chauffeur_reviews cr
--   JOIN chauffeurs c ON c.id = cr.chauffeur_id
--   ORDER BY RANDOM()
--   LIMIT 20;
""")

    print(f"✅ Generated {len(pool)} unique reviews → {outpath}")
    by_rating = {}
    for _, r, _, _ in pool:
        by_rating[r] = by_rating.get(r, 0) + 1
    for r in sorted(by_rating.keys(), reverse=True):
        print(f"   {r}-star: {by_rating[r]} reviews")


if __name__ == "__main__":
    random.seed(42)
    pool = build_pool()
    write_sql(pool)
