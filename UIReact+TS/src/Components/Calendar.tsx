import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeekView from './WeekView';
import DayView from './DayView';
import DayEventList from './DayEventList';

interface ToDoProps{
    date : Date,
    title : string,
    description : string
}

const Calendar: React.FC = () => {
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleViewChange = (newView: 'month' | 'week' | 'day') => {
        setView(newView);
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <Container className="mt-4">
            <ButtonGroup className="mb-3">
                <Button variant="secondary" onClick={() => handleViewChange('month')}>Month</Button>
                <Button variant="secondary" onClick={() => handleViewChange('week')}>Week</Button>
                <Button variant="secondary" onClick={() => handleViewChange('day')}>Day</Button>
            </ButtonGroup>
            {view === 'month' && (
                <MonthView selectedDate={selectedDate} onDateChange={handleDateChange} />
            )}
            {view === 'week' && (
                <WeekView selectedDate={selectedDate} />
            )}
            {view === 'day' && (
                <DayView selectedDate={selectedDate} />
            )}
        </Container>
    );
};

const MonthView: React.FC<{ selectedDate: Date; onDateChange: (date: Date) => void }> = ({ selectedDate, onDateChange }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const previousMonthLastDay = new Date(currentYear, currentMonth, 0);

    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // 0 (poniedziałek) do 6 (niedziela)
    const daysInMonth: (number | string)[] = [];
    const calendar: (number | string)[][] = [];

    const totalDaysInMonth = lastDayOfMonth.getDate();
    const totalDaysInPrevMonth = previousMonthLastDay.getDate();

    // Dodajemy dni z poprzedniego miesiąca
    for (let i = startDay; i > 0; i--) {
        daysInMonth.push(totalDaysInPrevMonth - i + 1);
    }

    // Dodajemy dni obecnego miesiąca
    for (let i = 1; i <= totalDaysInMonth; i++) {
        daysInMonth.push(i);
    }
    
    // Dodajemy dni z następnego miesiąca, tylko jeśli nie osiągnęliśmy jeszcze 35 dni
    let dayCounter = 1;
    while (daysInMonth.length < 35) { // 5 tygodni = 35 dni
        daysInMonth.push(dayCounter++);
    }

    // Dzielenie dni na tygodnie
    for (let i = 0; i < daysInMonth.length; i += 7) {
        calendar.push(daysInMonth.slice(i, i + 7));
    }

    // Pełne nazwy dni tygodnia
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div>
            <Row className="text-center">
                {daysOfWeek.map(day => (
                    <Col key={day} className="border font-weight-bold">
                        {day}
                    </Col>
                ))}
            </Row>
            {calendar.map((week, weekIndex) => (
                <Row key={weekIndex}>
                    {week.map((day, dayIndex) => (
                        <Col
                            key={dayIndex}
                            className={`border py-2 ${typeof day === 'string' ? 'text-muted' : ''}`}
                            onClick={() => day !== 'string' && onDateChange(new Date(currentYear, currentMonth, day as number))}
                        >
                            <Badge bg="info" pill>
                                {day}
                            </Badge>
                            <DayEventList day={day} events={daysOfWeek}/>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default Calendar;
