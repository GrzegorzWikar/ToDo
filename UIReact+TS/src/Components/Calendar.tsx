import React, { useState } from 'react';
import { Container, Button, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeekView from './WeekView';
import DayView from './DayView';
import MonthView from './MonthView';

interface ToDoProps{
    date : Date,
    title : string,
    description : string
}

interface SwitchDisplayDataProps{
    currentYear : number, 
    currentMonth : number, 
    day : number, 
    weekIndex : number
}

const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const Calendar: React.FC = () => {
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleViewChange = (newView: 'month' | 'week' | 'day') => {
        setView(newView);
    };

    const handleDateChange = ({currentYear, currentMonth, day, weekIndex} : SwitchDisplayDataProps) => {
        if (weekIndex === 0 && day > 7 && currentMonth === 1) setSelectedDate(new Date(currentYear - 1, 12 , day));
        if (weekIndex === 0 && day > 7 && currentMonth >= 1) setSelectedDate(new Date(currentYear, currentMonth -1 , day));
        if (weekIndex === 5 && day < 7 && currentMonth !== 12) setSelectedDate(new Date(currentYear, currentMonth + 1, day));
        if (weekIndex === 5 && day < 7 && currentMonth === 12) setSelectedDate(new Date(currentYear +1 , 1, day));
        console.log(selectedDate);
    };
    console.log(selectedDate);
    return (
        <Container className="mt-4">
            <ButtonGroup className="mb-3">
                <Button variant="secondary" onClick={() => handleViewChange('month')}>Month</Button>
                <Button variant="secondary" onClick={() => handleViewChange('week')}>Week</Button>
                <Button variant="secondary" onClick={() => handleViewChange('day')}>Day</Button>
            </ButtonGroup>
            {view === 'month' && (
                <MonthView selectedDate={selectedDate} onDateChange={handleDateChange} monthsInYear={monthsInYear} daysInWeek={daysInWeek}/>
            )}
            {view === 'week' && (
                <WeekView selectedDate={selectedDate} daysInWeek={daysInWeek} monthsInYear={monthsInYear}/>
            )}
            {view === 'day' && (
                <DayView selectedDate={selectedDate} monthsInYear={monthsInYear}/>
            )}
        </Container>
    );
};

export default Calendar;
