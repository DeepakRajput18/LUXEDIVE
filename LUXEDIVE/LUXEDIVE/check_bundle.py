import urllib.request
import re

js = urllib.request.urlopen('https://luxedive-app.onrender.com/assets/index-ZeKinEYe.js').read().decode('utf-8')
print('Matches:', set(re.findall(r'https?://[^/"\'`]+\S*api/auth', js)))
