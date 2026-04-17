import requests
import time
import random

# PERSONAL DATA
USER_DATA = {
    "BOT_TOKEN": "8376187006:AAGei2RPkhYn9sdp54kIpaRNbHb_2np51fA",
    "CHAT_ID": "6176505353",
    "BINANCE_ID": "TBJtS2NLjDDtHyZXbkRoLwfYihH5iEt96D"
}

def report(msg):
    url = f"https://api.telegram.org/bot{USER_DATA['BOT_TOKEN']}/sendMessage"
    try:
        requests.post(url, json={"chat_id": USER_DATA['CHAT_ID'], "text": msg}, timeout=10)
    except:
        pass

def start_engine():
    report(f"🚀 Mohsin Bhai, Engine RENDER par Live ho gaya!\n💰 Binance: {USER_DATA['BINANCE_ID']}")
    
    sites = ["https://freecash.com", "https://monetag.com", "https://www.cpagrip.com"]

    while True:
        target = random.choice(sites)
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            requests.get(target, headers=headers, timeout=15)
            report(f"✅ Success: Worked on {target}")
        except Exception as e:
            report(f"❌ Error on {target}: {str(e)}")
        
        # 10-15 minute wait
        time.sleep(random.randint(600, 900))

if __name__ == "__main__":
    start_engine()
          
