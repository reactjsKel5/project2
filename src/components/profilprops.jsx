import React from "react";

const ProfileProps = (props) => {
    return (

        <div className="row p-4">
            <div className="text-center mb-5">
                <img src={require('../img/profile1.png')} width="170" alt="profile" />
            </div>
            <div class="mb-1">
                <p class="profile-title float-start">Nama Lengkap</p>
                <p class="profile-title float-end">
                    {props.nama_lengkap}
                </p>
            </div>

            <hr className="mb-4" />
            <div class="mb-1">
                <p class="profile-title float-start">Email</p>
                <p class="profile-value float-sm-end">
                    {props.email}

                </p>
            </div>
            <hr className="mb-4" />
            <div class="mb-4">
                <p class="profile-title float-start">Nomor Telepon</p>
                <p class="profile-value float-sm-end">
                    {props.no_hp}
                </p>
            </div>
        </div>
    )
}
export default ProfileProps;
