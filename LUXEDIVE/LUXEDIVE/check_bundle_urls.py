import urllib.request
import re

js = urllib.request.urlopen('https://luxedive-app.onrender.com/assets/index-ZeKinEYe.js').read().decode('utf-8')
print('Localhost Matches:', set(re.findall(r'http://localhost:5000', js)))
print('Onrender Matches:', set(re.findall(r'https://luxedive\.onrender\.com', js)))
