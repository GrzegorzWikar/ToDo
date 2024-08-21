// src/components/DayView.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const DayView: React.FC<{ selectedDate: Date }> = ({ selectedDate }) => {

    const daysInWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return (
        <Container className="mt-4">
            <h2 className='text-center'>{daysInWeek[selectedDate.getDay()]}</h2>
            <h3 className="text-center">{selectedDate.toLocaleDateString()}</h3>
            <div className="border">
                <ScheduleGrid />
            </div>
        </Container>
    );
};

// Komponent siatki godzinowej
const ScheduleGrid: React.FC = () => {
    const startHour = 0; // Początkowa godzina
    const endHour = 24;  // Końcowa godzina

    // Generowanie przedziałków godzinowych co 15 minut
    const timeSlots: JSX.Element[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlots.push(
                <Row key={time} className="border">
                    <Col className="p-1">
                        {time}
                    </Col>
                    <Col className="p-1">
                        {/* Tutaj możesz dodać komponenty do planowania */}
                    </Col>
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

export default DayView;
