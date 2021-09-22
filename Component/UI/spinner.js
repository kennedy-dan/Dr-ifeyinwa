import React, {useState} from 'react'
import RingLoader from "react-spinners/RingLoader";

const Spinner = () => {
    let [color, setColor] = useState("#197519");

    return (
        <RingLoader color={color} size={60}/>
    )
}

export default Spinner
