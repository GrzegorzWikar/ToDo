// src/components/WeekView.tsx
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const WeekView: React.FC<{ selectedDate: Date }> = ({ selectedDate }) => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Ustaw na poniedziałek

    const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const daysOfWeek: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        daysOfWeek.push(day);
    }

    return (
        <Container className="mt-4">
            <Row className="text-center">
                <Col xs={2} className="border">
                <h4>{monthsInYear[selectedDate.getMonth()]}</h4>
                <h5>{selectedDate.getFullYear()}</h5>
                </Col>
                {daysOfWeek.map(day => (
                    <Col key={day.toDateString()}  className="p-1 border">
                        <h4>{daysInWeek[day.getDay()]}</h4>
                        <h5>{day.getDate()}</h5>
                    </Col>
                ))}
            </Row>
            <ScheduleGrid days={daysOfWeek} />
        </Container>
    );
};

// Komponent siatki godzinowej
const ScheduleGrid: React.FC<{ days: Date[] }> = ({ days }) => {
    const startHour = 0; // Początkowa godzina
    const endHour = 24;  // Końcowa godzina

    // Generowanie przedziałków godzinowych co 15 minut
    const timeSlots: JSX.Element[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlots.push(
                <Row key={time} className="border">
                    <Col xs={2} className="p-1 border text-right">
                        {time}
                    </Col>
                    {days.map((_, dayIndex) => (
                        <Col key={dayIndex} className="p-1 border">
                            {/* Tutaj możesz dodać komponenty do planowania */}
                        </Col>
                    ))}
                </Row>
            );
        }
    }

    return (
        <div>
            {timeSlots}
        </div>
    );
};

export default WeekView;
