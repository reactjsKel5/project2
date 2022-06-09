import React from "react";

const Topbar = () => {
    // menu toggle
    // let toggle = document.querySelector('.toggle');
    // let navigation = document.querySelector('.navigation');
    // let main = document.querySelector('.main');
    // toggle.onclick = () => {
    //     navigation.classList.toggle('active');
    //     main.classList.toggle('active');
    // }
    return (
        <div className="topbar">
            <div className="toggle">
                <ion-icon name="menu-outline"></ion-icon>
            </div>
            <div className="user-information row">
                <div className="col name align-self-center">
                    <h6>Khoirunnisa</h6>
                </div>
                <div className="col user">
                    <img src="https://images.unsplash.com/photo-1638204957796-4ad60705aa17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBvcnRyYWl0JTIwcGhvdG9ncmFwaHl8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" width="200" alt="user-photo" />
                </div>
            </div>
        </div>
    );
}

export default Topbar;