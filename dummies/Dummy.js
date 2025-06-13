import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerExample = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={{ paddingTop: 40 }}>
      <View>
        <Button onPress={() => showMode('date')} title="Select Date" />
        <Button onPress={() => showMode('time')} title="Select Time" />
      </View>
      <Text>Selected: {date.toLocaleString()}</Text>
      {show && (
        <RNDateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          title="Select Date and Time"
        />
      )}
    </View>
  );
};

export default DateTimePickerExample;
