import React, {useState} from 'react'
import CircleLoader from "react-spinners/CircleLoader";

const BtnSpinner = () => {
    let [color, setColor] = useState("#197519");

    return (
        <CircleLoader color={color} size={20}/>
    )
}

export default BtnSpinner
