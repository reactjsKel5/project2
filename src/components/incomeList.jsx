import React from "react";

function IncomeList(props) {
    return (
        <div>
            <div className="income-item row mt-4">
                <div className="col-auto">
                    <img src={require('../img/gaji.png')} alt="category-logo" />
                </div>
                <div className="col nama-pemasukan align-self-center">
                    <p className="m-0">{props.catatan}</p>
                </div>
                <div className="col-auto jumlah align-self-center">
                    <p className="m-0">{props.pemasukan}</p>
                </div>
                <div className="col-auto delete align-self-center">
                    <button onClick={
                        () => {
                            props.delete(props.id)
                        }
                    }><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    );
}

export default IncomeList;