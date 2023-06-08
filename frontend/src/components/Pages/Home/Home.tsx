import React from 'react';

const Home = (props: any) => {
    return (
        <div className="home">
            <h3>Flight Booker</h3>
            Aplikacja do rezerwacji lotów!<br />
            <ul>
                <li>
                    Kliknij <b>Logowanie</b> aby się zalogować!
                </li>
                <li>
                    Kliknij <b>Rejestracja</b> aby się zarejestrować!
                </li>
            </ul>
            Nasza aplikacja to gwarancja najlepszych cen i jakości!
        </div>
    );
};

export default Home;