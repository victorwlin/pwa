import React from "react";

const Render = props => {    
    const showDates = () => {
        // Get today's date and deconstruct it
        const today = new Date();

        const deconstructDate = dateObj => {
            const year = dateObj.getFullYear();
            const month = dateObj.getMonth();
            const date = dateObj.getDate();

            return {
                year: year,
                month: month,
                date: date
            };
        };

        const deconstructToday = deconstructDate(today);


        // Make an array of date objects
        let numOfDatesToShow = 14;

        const constructDateArr = deconstructedDateObj => {
            const { year, month, date } = deconstructedDateObj;
            const dateArr = [];
            
            for (let i = 0; i < numOfDatesToShow; i++) {
                const newDate = new Date(year, month, date - i);
    
                dateArr.unshift(newDate);
            }

            return dateArr;
        };

        const dateArr = constructDateArr(deconstructToday);


        // Change array of date objects into something easier to read
        const displayDates = [];
        
        dateArr.forEach(element => {
            const { year, month, date } = deconstructDate(element);

            // Display months as three letter strings
            const displayMonth =
                (month === 0) ? "JAN" :
                (month === 1) ? "FEB" :
                (month === 2) ? "MAR" :
                (month === 3) ? "APR" :
                (month === 4) ? "MAY" :
                (month === 5) ? "JUN" :
                (month === 6) ? "JUL" :
                (month === 7) ? "AUG" :
                (month === 8) ? "SEP" :
                (month === 9) ? "OCT" :
                (month === 10) ? "NOV" :
                "DEC";

            // Display dates with two digits
            const displayDate = (date < 10) ? (`0${date}`) : date;

            displayDates.push(`${displayDate} ${displayMonth} ${year}`);
        });
        
        // Render dates array
        return (
            displayDates.map(element => {
                return (
                    <tr key={element}>
                        <td>{element}</td>
                        <td></td>
                    </tr>
                );
            })
        );
    };


    // Render table
    return (
        <table className="ui sortable celled table unstackable">
            <thead>
                <tr>
                    <th className="sorted descending">Date</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                    {showDates()}
            </tbody>
        </table>
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