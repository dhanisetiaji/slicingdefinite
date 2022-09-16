import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'


const MiraChat = () => {
    const [toggle, setToggle] = useState(false)
    return (<>
        <div className={toggle ? 'mira addtop' : 'mira'}>
            <div className="content" onClick={() => setToggle(!toggle)}>
                {toggle ? (
                    <div className="close">
                        <AiOutlineClose className="icon-close" />
                    </div>
                ) : ''}
                <p>Ask MIRA</p>
                <div className="image">
                    <img src="/images/mira.png" alt="" />
                </div>
            </div>
        </div>
        <div className={toggle ? "details-box active" : "details-box"}>
            <div className="details">
                <div className="details-content"><img src='../../images/icon1.png' className='miraIcon' alt='icon1' />find dealers</div>
                <div className="details-content"><img src='../../images/icon2.png' className='miraIcon' alt='icon2' /> brochure download</div>
                <div className="details-content"><img src='../../images/icon3.png' className='miraIcon' alt='icon3' /> test drive</div>
                <div className="details-content"><img src='../../images/icon4.png' className='miraIcon1' alt='icon4' /> credit simulation</div>
                <div className="details-content"><img src='../../images/icon5.png' className='miraIcon' alt='icon5' /> purchase consultation</div>
                <div className="closeIcon">
                    <AiOutlineClose onClick={() => setToggle(!toggle)} className="close" />
                </div>
            </div>
        </div>
    </>
    )
}

export default MiraChat