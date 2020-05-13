import React from "react";

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

class Input extends React.Component {
    static contextType = UserContext;

    // I am initializing state with an object, because I want the dates
    // and weights to be locked together.
    state = { entry: { date: "", weight: "" } };
    
    componentDidMount = () => {
        // Calculate today's date and set to default in the form
        const date = new Date();
        const today = date.toISOString().substring(0, 10);
        
        this.setState({ entry: { ...this.state.entry, date: today } });
    };

    onDateChange = event => {
        this.setState({ entry: { ...this.state.entry, date: event.target.value } });
    };

    onWeightChange = event => {
        const weightAsNum = Number(Math.round(parseFloat(event.target.value + "e" + 2)) + "e-" + 2);
        this.setState({ entry: { ...this.state.entry, weight: weightAsNum } });
    };


    // This method submits the entry to Firestore
    onFormSubmit = event => {
        // This prevents the page from refreshing every time something is
        // submitted
        event.preventDefault();
        
        // Check if there is a date and submit to Tracking
        if (this.state.entry.date) {
            // Format dates
            const year = this.state.entry.date.substring(0, 4);
            const month = this.state.entry.date.substring(5, 7);
            const displayMonth =
                    (month == 1) ? "JAN" :
                    (month == 2) ? "FEB" :
                    (month == 3) ? "MAR" :
                    (month == 4) ? "APR" :
                    (month == 5) ? "MAY" :
                    (month == 6) ? "JUN" :
                    (month == 7) ? "JUL" :
                    (month == 8) ? "AUG" :
                    (month == 9) ? "SEP" :
                    (month == 10) ? "OCT" :
                    (month == 11) ? "NOV" :
                    "DEC";
            const date = parseInt(this.state.entry.date.substring(8, 10));
            const displayDate = (date < 10) ? (`0${date}`) : date;
    
            const formattedDate = `${displayDate} ${displayMonth} ${year}`;

            // Submit to Firestore
            firestore.collection(this.context.email).doc(formattedDate).set({
                weight: this.state.entry.weight
            })

            // Reset form fields to empty
            this.setState({ entry: { date: "", weight: "" } });

        } else {
            window.alert("Please enter a date");
        }
        
    };

    render() {
        return (
            <div className="ui container">
                <h1>Weight Tracker</h1>
                <div className="ui form">
                    <div className="fields">
                        <form onSubmit={this.onFormSubmit} className="field">
                            <label>Date</label>
                            <input
                                type="date"
                                value={this.state.entry.date}
                                onChange={this.onDateChange}
                            />
                        </form>
                        <form onSubmit={this.onFormSubmit} className="field">
                            <label>Weight</label>
                            <input
                                type="number"
                                step="0.01"
                                value={this.state.entry.weight}
                                onChange={this.onWeightChange}
                            />
                        </form>
                    </div>
                    <div onClick={this.onFormSubmit} className="ui submit button">Submit</div>
                </div>
            </div>
        );
    }
}

export default Input;