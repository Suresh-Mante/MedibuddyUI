import React, { useEffect } from 'react';
import '../../css/loading.css';
import { delayByXMs } from '../Utils';

const Loading = ({ params }) => {

    const applyLoadingAnimation = async () => {
        try {
            while (true) {
                let circle = document.getElementById('loading-circle');
                if (circle == undefined) break;
                await delayByXMs(1500);
                circle.style.stroke = params && params.color ? params.color : "red";
                await delayByXMs(1500);
                circle.style.stroke = params && params.color ? params.color : "green";
                await delayByXMs(1500);
                circle.style.stroke = params && params.color ? params.color : "dodgerblue";
            }
        } catch (e) { }
    }

    useEffect(() => {
        applyLoadingAnimation();
    }, []);
    
    return (
        <div className='loading' id='loading'>
            <svg className='loading-svg' width={params && params.size ? params.size + 'px' : '30px'}
                height={params && params.size ? params.size + 'px' : '30px'}
                viewBox="0 0 44 44" role="status">
                <circle className="loading-circle" id='loading-circle' cx="22" cy="22" r="20"
                    fill="none" stroke={params && params.color ? params.color : "dodgerblue"} strokeWidth="4">
                </circle>
            </svg>
        </div>
    );
}
export default Loading;