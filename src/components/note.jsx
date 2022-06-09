import React from 'react'

function Note(props) {
    return (
        <div className="list-notes card-notes mb-3">
            <div className="card-body my-4 mx-3">
                <button className="btn-delete float-end"
                    onClick={
                        () => {
                            props.delete(props.id)
                        }
                    }>
                    <ion-icon name="close-outline"></ion-icon>
                </button>
                <h5 className="card-title float-none">{props.judul}</h5>
                <h6>{props.tanggal}</h6>
                <p>{props.isi}</p>
            </div>
        </div>
    )
}

export default Note
