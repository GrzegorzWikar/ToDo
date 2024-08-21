import {ListGroup, Badge } from 'react-bootstrap';

interface DayEventListProps {
  day : number | string,
  events : string[]
}

function DayEventList( {day, events} : DayEventListProps ) {
  return (
    <ListGroup as="ol" >
        {events.length !== 0 ? events.map(event =>  <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{day}</div>
          {event}
        </div>
      </ListGroup.Item>) : null}
    </ListGroup>  
  );
}

export default DayEventList;