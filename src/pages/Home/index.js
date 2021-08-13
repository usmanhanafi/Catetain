import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Home.scss";

const Home = () => {
    const history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    }
    return (
        <div className="homepage">
           <button onClick={handleLogin}>Login yuk!!!</button> 
        </div>
    )
}

export default Home;
