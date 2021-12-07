import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';
import CalendarScreen from './CalendarScreen';
import FeedsScreen from './FeedsScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#009688',
      }}>
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          title: '피드',
          tabBarIcon: ({color, size}) => (
            <Icon name="view-stream" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: '캘린더',
          tabBarIcon: ({color, size}) => (
            <Icon name="event" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
          headerTitle: () => <SearchHeader />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
