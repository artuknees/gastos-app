import React from "react";
import { useAppSelector } from "../../redux/hooks";

const Home = () => {
    const { logged } = useAppSelector(state => state.session);
    return(
        <>
            { logged && 
                <div>Home</div>
            }
        </>
    )
};

export default Home;