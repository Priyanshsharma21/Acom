import React from 'react'

const Preloader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="ui-abstergo">
        <div className="abstergo-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="ui-text">
            APPRIKART
            <div className="ui-dot"></div>
            <div className="ui-dot"></div>
            <div className="ui-dot"></div>
        </div>
        </div>
    </div>
  )
}

export default Preloader