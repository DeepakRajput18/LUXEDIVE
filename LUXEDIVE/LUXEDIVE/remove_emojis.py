import os

path = r'backend\generate_360\car_360_generator.py'

with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

repls = {
    '❌': '[ERROR]', '⚠️': '[WARNING]', '🔍': '[SEARCH]', '✅': '[OK]',
    '🎨': '[PROCESS]', '🔄': '[PROCESS]', '☁️': '[UPLOAD]', '💾': '[DB]',
    '🚗': '[START]', 'ℹ️': '[INFO]', '📋': '[QUEUE]'
}

for k, v in repls.items():
    text = text.replace(k, v)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("✅ Emojis removed successfully from generator module")
