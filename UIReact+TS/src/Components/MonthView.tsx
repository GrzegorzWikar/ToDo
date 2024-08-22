import { Row, Col, Badge } from "react-bootstrap";
import DayEventList from "./DayEventList";


interface SwitchDisplayDataProps{
    currentYear : number, 
    currentMonth : number, 
    day : number, 
    weekIndex : number
}

interface MonthViewProps{
    selectedDate: Date,
    onDateChange: ( {currentYear, currentMonth, day, weekIndex} : SwitchDisplayDataProps) => void,
    monthsInYear: string[],
    daysInWeek: string[]
}


const MonthView: React.FC<MonthViewProps> = ({ selectedDate, onDateChange, monthsInYear, daysInWeek }) => {
    const today = selectedDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const previousMonthLastDay = new Date(currentYear, currentMonth, 0);

    const startDay = firstDayOfMonth.getDay();
    const daysInMonth: (number)[] = [];
    const calendar: (number)[][] = [];

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
    while (daysInMonth.length < 42) { // 6 tygodni = 42 dni
        daysInMonth.push(dayCounter++);
    }

    // Dzielenie dni na tygodnie
    for (let i = 0; i < daysInMonth.length; i += 7) {
        calendar.push(daysInMonth.slice(i, i + 7));
    }

    return (
        <div>
            <h4 className='text-center'>{monthsInYear[currentMonth]} {currentYear}</h4>
            <Row className="text-center">
                {daysInWeek.map(day => (
                    <Col key={day} className="border font-weight-bold">
                        {day}
                    </Col>
                ))}
            </Row>
            {calendar.map((week, weekIndex) => (
                <Row key={weekIndex}>
                    {week.map((day, dayIndex) => (
                        
                        <Col
                            key={day}
                            className={`border py-2 ${typeof day === 'string' ? 'text-muted' : ''}`}
                            onClick={() => onDateChange({currentYear, currentMonth, day , weekIndex})}
                        >
                            
                            <Badge bg="info" pill>
                                {day}
                            </Badge>
                            <DayEventList day={day} events={daysInWeek} />
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default MonthView;