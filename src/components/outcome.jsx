import React from 'react'

function OutList(props) {
  return (
    <div className="income-item row mt-4">
        <div className="col-auto">
            <img src={require('../img/gaji.png')} alt="category-logo"/>
        </div>
        <div className="col nama-pemasukan align-self-center">
            <p className="m-0">{props.catatan}</p>
        </div>
        <div className="col jumlah align-self-center">
            <p className="m-0">{props.pengeluaran}</p>
        </div>
        <div className="col-auto delete align-self-center">
            <button
            onClick={
                () => {
                    props.delete(props.id)
                }
            }>
                <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
    </div>
  )
}

export default OutList
