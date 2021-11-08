import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

export const CalendarPart = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div className="calendar_center">
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    )
}