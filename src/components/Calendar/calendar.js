/* eslint-disable max-len */
import '../../App.css'
import './calendar.css'
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

function CalendarComponent(props) {
	return (
		<div className='main-calendar-container'>
			<Calendar
				localizer={localizer}
				startAccessor='start'
				endAccessor='end'
				className='calendar'
			/>
		</div>
	)
}

export default CalendarComponent
