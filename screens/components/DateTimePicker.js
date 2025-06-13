import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date'); // 'date' or 'time'
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // on Android, closes automatically
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Button title="Pick Date" onPress={() => showMode('date')} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button title="Pick Time" onPress={() => showMode('time')} />
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={{ marginTop: 20 }}>
        Selected: {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </Text>
    </View>
  );
};

export default DateTimePickerComponent;
