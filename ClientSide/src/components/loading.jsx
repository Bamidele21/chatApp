import Tearoom from '../assets/tearoom.svg?react'
import './loading.css'



function Loading() {
    return (
        <div className="loading-container">
            <Tearoom className='loading-logo'/>
            <div className="loading-txt">
            <h1> Please wait just a moment...</h1>
            </div>
        </div>
    )
 
} 

export default Loading;