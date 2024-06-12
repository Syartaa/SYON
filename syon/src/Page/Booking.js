import React, { useState } from 'react';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Booking() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [no_of_days, setNoOfDays] = useState([]);
    const [blankdays, setBlankdays] = useState([]);
    const [events, setEvents] = useState([
        {
            event_date: new Date(2020, 3, 1),
            event_title: "April Fool's Day",
            event_theme: 'blue'
        },
        {
            event_date: new Date(2020, 3, 10),
            event_title: "Birthday",
            event_theme: 'red'
        },
        {
            event_date: new Date(2020, 3, 16),
            event_title: "Upcoming Event",
            event_theme: 'green'
        }
    ]);
    const [event_title, setEventTitle] = useState('');
    const [event_date, setEventDate] = useState('');
    const [event_theme, setEventTheme] = useState('blue');
    const [openEventModal, setOpenEventModal] = useState(false);

    const initDate = () => {
        let today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
    };

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);
        return today.toDateString() === d.toDateString() ? true : false;
    };

    const showEventModal = (date) => {
        setOpenEventModal(true);
        setEventDate(new Date(year, month, date).toDateString());
    };

    const addEvent = () => {
        if (event_title === '') {
            return;
        }
        setEvents(prevEvents => [...prevEvents, {
            event_date: event_date,
            event_title: event_title,
            event_theme: event_theme
        }]);
        setEventTitle('');
        setEventDate('');
        setEventTheme('blue');
        setOpenEventModal(false);
    };

    const getNoOfDays = () => {
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let dayOfWeek = new Date(year, month).getDay();
        let blankdaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }
        let daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }
        setBlankdays(blankdaysArray);
        setNoOfDays(daysArray);
    };

    return (
        <div className="antialiased sans-serif bg-gray-100 h-screen">
           <div className="container mx-auto px-4 py-2 md:py-24">
    <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between py-2 px-6">
            {/* Month and Year Display */}
            <div>
                <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
            </div>
            {/* Navigation Buttons */}
            <div className="border rounded-lg px-1" style={{ paddingTop: '2px' }}>
                <button
                    type="button"
                    className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
                    disabled={month === 0}
                    onClick={() => { setMonth(month - 1); getNoOfDays(); }}
                >
                    {/* Left Arrow Icon */}
                    <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="border-r inline-flex h-6"></div>
                <button
                    type="button"
                    className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1"
                    disabled={month === 11}
                    onClick={() => { setMonth(month + 1); getNoOfDays(); }}
                >
                    {/* Right Arrow Icon */}
                    <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        {/* Calendar Body */}
        <div className="-mx-1 -mb-1">
            {/* Days of the Week Header */}
            <div className="flex flex-wrap" style={{ marginBottom: '-40px' }}>
                {DAYS.map((day, index) => (
                    <div key={index} style={{ width: '14.26%' }} className="px-2 py-2">
                        <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">{day}</div>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex flex-wrap border-t border-l">
                {/* Blank Cells for Previous Month */}
                {blankdays.map((blankday, index) => (
                    <div key={index} style={{ width: '14.28%', height: '120px' }} className="text-center border-r border-b px-4 pt-2"></div>
                ))}
                {/* Days of the Current Month */}
                {no_of_days.map((date, dateIndex) => (
                    <div key={dateIndex} style={{ width: '14.28%', height: '120px' }} className="px-4 pt-2 border-r border-b relative">
                        <div
                            onClick={() => showEventModal(date)}
                            className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                                isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
                            }`}
                        >
                            {date}
                        </div>
                        {/* Render Events for the Day */}
                        <div style={{ height: '80px' }} className="overflow-y-auto mt-1">
                            {events
                                .filter((event) => new Date(event.event_date).toDateString() === new Date(year, month, date).toDateString())
                                .map((event, index) => (
                                    <div key={index} className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border border-${event.event_theme}-200 text-${event.event_theme}-800 bg-${event.event_theme}-100`}>
                                        <p className="text-sm truncate leading-tight">{event.event_title}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>

            {/* Modal */}
            {openEventModal && (
                <div className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                        {/* Modal content goes here */}
                        <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">

                            <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Event Details</h2>

                            <div className="mb-4">
                                <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event title</label>
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={event_title} onChange={(e) => setEventTitle(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event date</label>
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={event_date} readOnly />
                            </div>

                           
                            <div className="mt-8 text-right">
                                <button type="button" className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2" onClick={() => setOpenEventModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm" onClick={addEvent}>
                                    Save Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;
