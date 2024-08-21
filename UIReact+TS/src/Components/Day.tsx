type DayProps = {
    dayInMonth: number;
  };
  
const Day: React.FC<DayProps> = ({ dayInMonth }) => {
    return(<>
        {dayInMonth}
        </>
    )
}

export default Day;