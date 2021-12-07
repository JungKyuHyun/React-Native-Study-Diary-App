import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

function CalendarView({markedDates, onSelectDate, selectedDate}) {
  const markedSeletedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked !== undefined,
    },
  };
  return (
    <Calendar
      style={styles.calendar}
      markedDates={markedSeletedDate}
      onDayPress={day => {
        /**
         * console.log(JSON.stringify(day, null, 2)); 
         * {
              "year": 2021,
              "month": 12,
              "day": 15,
              "timestamp": 1639526400000,
              "dateString": "2021-12-15"
            }
         */
        onSelectDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
});

export default CalendarView;
