import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import LoginPageConfirm from './components/pages/LoginPageConfirm'
import ProfilePage from './components/pages/ProfilePage'
import WorkoutPage from './components/pages/WorkoutPage'
import CreateWorkoutPage from './components/pages/CreateWorkoutPage'
import CreateUsername from './components/Username/createUsername'
import CalendarPage from './components/pages/CalendarPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/login' element = {<LoginPage />}/>
				<Route path='/login/confirm' element = {<LoginPageConfirm />}/>
				<Route path='/' element = {<HomePage />}/>
				<Route path='/profile' element = {<ProfilePage />}/>
				<Route path='/workout' element = {<WorkoutPage />}/>
				<Route path='/createWorkout' element = {<CreateWorkoutPage />}/>
				<Route path='/createUsername' element = {<CreateUsername />}/>
				<Route path='/calendar' element = {<CalendarPage />}/>
			</Routes>
		</Router>

	)
}

export default App
