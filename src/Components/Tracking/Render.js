import React, { useState, useEffect, useContext } from "react";

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import createDisplay from "./createDisplay";

const Render = () => {    
    const [datesToShow, setDatesToShow] = useState(14);
    const [weights, setWeights] = useState({});
    
    const user = useContext(UserContext);
    const { email } = user;


    useEffect(
        () => {
            // Pull data from Firestore by adding a listener
            firestore.collection(email).onSnapshot((querySnapshot) => {
                
                // Create weights object with all data available in database
                const weightHolder = {};

                querySnapshot.forEach(doc => {
                    const date = doc.id;
                    weightHolder[date] = doc.data().weight;
                });

                setWeights(weightHolder);

            });
        },
        []
    );


    const onNumOfDatesChange = event => {
        setDatesToShow(event.target.value);
    };


    const showDates = () => {
        const combined = createDisplay(weights, datesToShow);
     
        return (
            Object.keys(combined).map(obj => {
                return (
                    <tr key={obj}>
                        <td>{obj}</td>
                        <td>{combined[obj]}</td>
                    </tr>
                );
            })
        );
    };


    // Render table
    return (
        <div>
            <div className="ui form">
                <div className="field" onChange={onNumOfDatesChange}>
                    <label>Dates to Show</label>
                    <select>
                        <option value={14}>14</option>
                        <option value={21}>21</option>
                        <option value={28}>28</option>
                        <option value={35}>35</option>
                    </select>
                </div>
            </div>
            <table className="ui sortable celled table unstackable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {showDates()}
                </tbody>
            </table>
        </div>
    );
};

export default Render;


// This function is for sorting dates
// function compare(a, b) {
    //     let comparison = 0;
    //     if (a.date > b.date) {
    //         comparison = 1;
    //     } else if (a.date < b.date) {
    //         comparison = -1;
    //     }
    //     return comparison;
    // }

    // props.entries.sort(compare);