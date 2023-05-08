import React from 'react';

const Home: React.FC<any> = (props: any): JSX.Element => {
    return (
        <div className="home">
            <img src="/images/plane.png" />
            <div className="overlay">
                Flight Booker
            </div>
        </div>
    );
};

export default Home;