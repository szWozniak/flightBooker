Jak uruchomić projekt lokalnie?

1) Część frontendowa 
cd frontend 
npm install
npm start 
- Uruchomi się na http://localhost:3000/

2) Część backendowa
cd backend 
npm install 
- Proszę połączyć się z VPN AGH aby umożliwić dostęp do serwera MySQL
- Proszę utworzyć w katalogu /backend plik ".env" i uzupełnić go danymi:
    PORT=4000
    HOST=mysql.agh.edu.pl
    USER=swoznia1
    PASSWORD=***
    DATABASE=swoznia1
    SECRET=***
- *** w polach USER i SECRET należy zastąpić otrzymanymi ciągami znaków.
node server 
- Uruchomi się na localhost:4000