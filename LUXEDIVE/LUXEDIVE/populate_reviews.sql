DO $$
DECLARE
  r_user RECORD;
BEGIN
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('cc107ecb-48d6-4fa5-90e5-c2939de63802');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('cc107ecb-48d6-4fa5-90e5-c2939de63802', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('032416ae-0a92-4361-8f2b-3683b6d6b87c');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('032416ae-0a92-4361-8f2b-3683b6d6b87c', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('e63db808-73e0-48e8-8689-3c1e4f35f0db');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('e63db808-73e0-48e8-8689-3c1e4f35f0db', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('07b1acce-f7e7-4731-8052-c8879f1b1b97');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('07b1acce-f7e7-4731-8052-c8879f1b1b97', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0aeafa65-f006-4547-9c35-dc516924ed06');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0aeafa65-f006-4547-9c35-dc516924ed06', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('f17df373-f27d-459d-9f1d-76734de903b2');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('f17df373-f27d-459d-9f1d-76734de903b2', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('637ba102-dafa-4f00-81f0-50d815bf7081');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('637ba102-dafa-4f00-81f0-50d815bf7081', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('fdce45c8-50f2-485b-bb23-21548113051f');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('fdce45c8-50f2-485b-bb23-21548113051f', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5fa5360f-d389-4203-9a80-e867e79267df');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5fa5360f-d389-4203-9a80-e867e79267df', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('8b52987b-77c8-4eae-abef-0a85e2c107b9');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('8b52987b-77c8-4eae-abef-0a85e2c107b9', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('5dee1a2d-4851-431c-8e77-6d36606f01d3');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('5dee1a2d-4851-431c-8e77-6d36606f01d3', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('480a5547-ecaf-48e2-a3c5-2672f54cbf39');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('480a5547-ecaf-48e2-a3c5-2672f54cbf39', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('20f78374-dc4d-4771-8f57-a9c9a2b474fa');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('20f78374-dc4d-4771-8f57-a9c9a2b474fa', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('c7988e83-95ae-4903-bcd5-e419f13bb555');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('c7988e83-95ae-4903-bcd5-e419f13bb555', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('a5c51005-0123-47bc-871e-bb6a09cd0abd');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('a5c51005-0123-47bc-871e-bb6a09cd0abd', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('91cbc847-9d22-4952-ab40-9e2fd0c3863d');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('91cbc847-9d22-4952-ab40-9e2fd0c3863d', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Car smelled of cigarette smoke. Request LUXEDIVE to check vehicle standards.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Driving style is acceptable, not very smooth on speed breakers. Serviceable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Adequate service. Expected more from a luxury service. Nothing extraordinary.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('b33a5bab-66c3-41d7-8cf1-564a330ece1b');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('b33a5bab-66c3-41d7-8cf1-564a330ece1b', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('0c3c0cd5-d31a-4c08-baca-ecf141eb6c53', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Communication could be better. Didn''t know English well but manageable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Excellent service. Driver was courteous, well-spoken and discreet.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Slight delay at pickup but compensated by taking a faster route. Average.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Driver took a longer route and was non-responsive to feedback during the trip.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('eee58812-c101-4c5a-9628-b2c0283bc396');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('eee58812-c101-4c5a-9628-b2c0283bc396', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 2, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Perfect ride for our corporate event. Professional attire and great manner.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Reached on time, car was spotless, and the drive was extremely comfortable.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Driver was extremely polite and even helped with heavy luggage at the hotel.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Long distance trip was made comfortable. Great company throughout the journey.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Would book again without hesitation. Best chauffeur experience in Ahmedabad.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Clean car, a/c perfectly set, on-time pickup. Nothing to complain about.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Five stars without a doubt. Handled the route expertly and safely.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Smooth driving on highway, knew all the rest stops. Very helpful.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'My entire family was comfortable throughout the trip. Highly recommended.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Arrived 10 minutes early. Made us feel prioritized. Luxury service indeed.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Bahu saro anubhav rahyo. Professional ane punctual, fully satisfied.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 4, 'Very smooth and professional. Exactly what luxury driving should feel like.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 5, 'Navigated seamlessly through traffic. No stress whatsoever.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'The car was clean but the music was too loud initially. Asked to lower it.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 3, 'Decent driver but arrived about 15 minutes late. Overall okay experience.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
  SELECT * INTO r_user FROM assign_unique_reviewer_name('3b92916d-025b-4cc4-b63e-d2dda5970b68');
  INSERT INTO chauffeur_reviews (chauffeur_id, reviewer_name_id, full_name, city, rating, comment, initials) 
  VALUES ('3b92916d-025b-4cc4-b63e-d2dda5970b68', r_user.name_id, r_user.assigned_full_name, r_user.assigned_city, 1, 'Driver came late by 30 minutes with no prior intimation. Very unprofessional.', SUBSTRING(r_user.assigned_full_name FROM 1 FOR 1) || SUBSTRING(r_user.assigned_full_name FROM POSITION(' ' IN r_user.assigned_full_name) + 1 FOR 1));
END $$;