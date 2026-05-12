import random
import uuid

def generate_names():
    guj_first = ["Arjun", "Dhruv", "Karan", "Viraj", "Rohan", "Yash", "Aarav", "Harsh", "Ishaan", "Dev", "Krish", "Pranav", "Aditya", "Siddharth", "Vihaan", "Arnav", "Ayaan", "Shaurya", "Atharv", "Ananya", "Diya", "Isha", "Aanya", "Navya", "Saanvi", "Pihu", "Myra", "Kiara", "Riya", "Sara", "Zara", "Tara", "Nisha", "Priya", "Kavya", "Anaya", "Anika", "Ishita", "Meera", "Mehul", "Hardik", "Kunal", "Dhaval", "Chirag", "Nirav", "Hitesh", "Parth", "Amit", "Rakesh", "Jignesh", "Sanjay", "Alpesh", "Vivek", "Tushar", "Hemal", "Paresh", "Ankit", "Deep", "Rajesh", "Nikhil", "Smit", "Bhavesh", "Manish", "Pankaj", "Sunil", "Jatin", "Ketan", "Mayur", "Nilesh", "Paresh", "Piyush", "Pratik", "Sandeep", "Umang", "Vimal", "Yogesh", "Bimal", "Chetan", "Darshan", "Girish", "Hitendra", "Indrajit", "Jaydeep", "Kalpesh", "Lalit", "Mahesh", "Narendra", "Ojas", "Paresh", "Ratilal", "Shailesh", "Tanmay", "Utkarsh", "Vipul", "Yatin"]
    guj_last = ["Shah", "Patel", "Desai", "Mehta", "Modi", "Gandhi", "Joshi", "Pandya", "Trivedi", "Thakkar", "Solanki", "Sheth", "Raval", "Amin", "Bhatt", "Vyas", "Parikh", "Dave", "Parekh", "Choksi", "Vaghela", "Parmar", "Rathod", "Gohel", "Chauhan", "Makwana", "Zala", "Jadeja", "Jhala", "Gohil", "Mistry", "Panchal", "Suthar", "Darji", "Kumbhar", "Bharwad", "Rabari", "Ahir", "Mer", "Koli", "Vanza", "Khatri", "Bhavsar", "Luhar", "Soni", "Kansara", "Gajjar", "Mistri", "Tank", "Vaghela"]
    
    ind_first = ["Rajesh", "Amit", "Suresh", "Vikram", "Rahul", "Ashok", "Deepak", "Manoj", "Sanjay", "Vijay", "Ramesh", "Venkat", "Arun", "Krishna", "Madhavan", "Srinivas", "Balaji", "Karthik", "Prakash", "Priya", "Neha", "Pooja", "Anjali", "Sneha", "Divya", "Lakshmi", "Swati", "Shruti", "Kavita", "Sunita", "Anita", "Babita", "Chitra", "Deepika", "Esha", "Farah", "Gouri", "Heena", "Indu", "Jyoti", "Kiran", "Lata", "Meena", "Nandini", "Omana", "Pallavi", "Qismat", "Rekha", "Sita", "Tulsi", "Uma", "Vani", "Warda", "Xelia", "Yumna", "Zoya", "Abhishek", "Bharat", "Chandan", "Dinesh", "Eknath", "Farhan", "Gautam", "Hari", "Imran", "Javed", "Kamal", "Lokesh", "Mohan", "Nitin", "Om", "Prabhat", "Qadir", "Ratan", "Satish", "Tarun", "Uday", "Varun", "Waseem", "Xerxes", "Yuvraj", "Zaman"]
    ind_last = ["Kumar", "Sharma", "Gupta", "Singh", "Verma", "Malhotra", "Agarwal", "Kapoor", "Chopra", "Khanna", "Reddy", "Nair", "Rao", "Iyer", "Naidu", "Menon", "Pillai", "Das", "Chatterjee", "Banerjee", "Bose", "Dutta", "Goswami", "Mukherjee", "Saksena", "Tiwari", "Mishra", "Pandey", "Shukla", "Awasthi", "Dubey", "Pathak", "Chaturvedi", "Dwivedi", "Tripathi", "Jain", "Bansal", "Garg", "Goel", "Mittal", "Singhal", "Tayal", "Aggarwal", "Chaudhary", "Deshmukh", "Kulkarni", "Patil", "Pawar", "Shinde", "Jadhav"]
    
    for_first = ["John", "Michael", "David", "Robert", "James", "William", "Richard", "Thomas", "Charles", "Daniel", "George", "Oliver", "Harry", "Jack", "Charlie", "Henry", "Edward", "Liam", "Noah", "Mason", "Lucas", "Ethan", "Ahmed", "Mohammed", "Khalid", "Omar", "Saeed", "Marco", "Pierre", "Hans", "Carlos", "Antonio", "Emily", "Sarah", "Emma", "Sophia", "Isabella", "Olivia", "Mia", "Charlotte", "Amelia", "Harper", "Aria", "Avery", "Camila", "Chloe", "Ella", "Grace", "Layla", "Luna", "Mila", "Nora", "Riley", "Zoey", "Arthur", "Barnaby", "Casper", "Dexter", "Felix", "Gideon", "Hugo", "Jasper", "Leo", "Milo", "Oscar", "Sebastian", "Theodore", "Xavier"]
    for_last = ["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thompson", "White", "Harris", "Martin", "Jackson", "Clark", "Lewis", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Green", "Baker", "Al Maktoum", "Al Nahyan", "Al Qassimi", "Al Habtoor", "Al Jaber", "Rossi", "Dupont", "Mueller", "Garcia", "Silva", "Murphy", "O'Brien", "Kelly", "Sullivan", "Walsh", "O'Connor", "Ryan", "O'Neill", "Byrne", "O'Reilly", "Lynch", "O'Sullivan", "Kennedy", "O'Leary", "Doyle"]

    guj_cities = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Navsari"]
    ind_cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"]
    for_cities = [("New York", "USA"), ("London", "UK"), ("Sydney", "Australia"), ("Dubai", "UAE"), ("Paris", "France"), ("Berlin", "Germany"), ("Toronto", "Canada"), ("Singapore", "Singapore"), ("Tokyo", "Japan"), ("Madrid", "Spain")]

    names = set()
    rows = []

    # 1000 Gujarati
    while len(rows) < 1000:
        f = random.choice(guj_first)
        l = random.choice(guj_last)
        full = f"{f} {l}"
        if full not in names:
            names.add(full)
            city = random.choice(guj_cities)
            rows.append((full, f, l, 'gujarati', city, 'India'))

    # 700 Indian
    while len(rows) < 1700:
        f = random.choice(ind_first)
        l = random.choice(ind_last)
        full = f"{f} {l}"
        if full not in names:
            names.add(full)
            city = random.choice(ind_cities)
            rows.append((full, f, l, 'indian', city, 'India'))

    # 300 Foreign
    while len(rows) < 2000:
        f = random.choice(for_first)
        l = random.choice(for_last)
        full = f"{f} {l}"
        if full not in names:
            names.add(full)
            city, country = random.choice(for_cities)
            rows.append((full, f, l, 'foreign', city, country))

    return rows

def escape(s):
    return s.replace("'", "''")

rows = generate_names()
with open("populate_reviewer_names.sql", "w", encoding='utf-8') as f:
    f.write("INSERT INTO reviewer_names_pool (full_name, first_name, last_name, ethnicity, city, country) VALUES\n")
    for i, row in enumerate(rows):
        line = f"('{escape(row[0])}', '{escape(row[1])}', '{escape(row[2])}', '{row[3]}', '{escape(row[4])}', '{escape(row[5])}')"
        if i < len(rows) - 1:
            f.write(line + ",\n")
        else:
            f.write(line + ";\n")

print("Generated 2000 names in populate_reviewer_names.sql")
