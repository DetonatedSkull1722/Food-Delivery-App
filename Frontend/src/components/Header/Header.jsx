import React from 'react'
import './Header.css'

const Header = () => {
return (
    <div className='header'>
            <div className="header-contents">
                    <h2>Order your favourite food here</h2>
                    <p>
                            Choose from a diverse menu featuring a variety of dishes crafted to satisfy your cravings. 
                            Whether you're in the mood for a quick snack or a full-course meal, we've got you covered. 
                            Our chefs use only the freshest ingredients to prepare each dish with care and precision. 
                            Enjoy a delightful dining experience from the comfort of your home.
                    </p>
                    <button>View Menu</button>
            </div>
    </div>
)
}

export default Header
