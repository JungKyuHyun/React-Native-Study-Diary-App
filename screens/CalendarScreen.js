import {format} from 'date-fns';
import React, {useMemo, useState} from 'react';
import {useContext} from 'react';
import CalendarView from '../components/CalendarView';
import LogContext from '../contexts/LogContext';
import FeedList from '../components/FeedList';

function CalendarScreen() {
  const {logs} = useContext(LogContext);
  const [selectedDate, setSeletedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(() => {
    return logs.reduce((acc, cur) => {
      const formattedDate = format(new Date(cur.date), 'yyyy-MM-dd');
      acc[formattedDate] = {marked: true};
      return acc;
    }, {});
  }, [logs]);

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSeletedDate}
        />
      }
    />
  );
}

export default CalendarScreen;
