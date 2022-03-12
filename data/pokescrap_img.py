import requests
from bs4 import BeautifulSoup
import re
import pandas
import matplotlib.pyplot as plt
import shutil 

URL = "https://pokemondb.net/pokedex/all"

def download_images():
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    poke_info=soup.find_all("a", class_="ent-name")
    name_eng = []
    i = 1
    for poke in poke_info:
        name = poke.getText()
        if name not in name_eng :
            url = "https://img.pokemondb.net/artwork/large/"+name.lower()+".jpg"
            r = requests.get(url, stream = True)
            print(name, ": ", end = '')
            filename = "img/"+ str(i).zfill(3) +".jpg"
            if r.status_code == 200:
                r.raw.decode_content = True
                with open(filename,'wb') as f:
                    shutil.copyfileobj(r.raw, f)
                print("OK")
            else:
                print("FAILED")
                print(url)
            name_eng.append(name)
            i+=1
download_images()