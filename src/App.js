import { useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)
  const [employeeList, setEmployeeList] = useState([])

  const addEmployee = () => {
    Axios.post('https://hr-system-sql.herokuapp.com//create', {
      firstName: firstName,
      lastName: lastName,
      age: age,
      position: position,
      wage: wage
    })
    .then(() => {setEmployeeList([...employeeList, {
      firstName: firstName,
      lastName: lastName,
      age: age,
      position: position,
      wage: wage
    }])})
    .catch((err) => {
      console.log('Could not add employee')
    })
  }

  const getEmployees = () => {
    Axios.get('https://hr-system-sql.herokuapp.com//employees')
    .then((res) => {
      setEmployeeList(res.data)
    })
    .catch(err => {
      console.log('Could not get employees. Oh no!')
    })
  }

  return (
    <div className="App">
      <div id='employee_form'>
        <label>first name</label>
        <input type='text' onChange={(event) => {setFirstName(event.target.value)}}></input>
        <label>last name</label>
        <input type='text' onChange={(event) => {setLastName(event.target.value)}}></input>
        <label>age</label>
        <input type='number' onChange={(event) => {setAge(event.target.value)}}></input>
        <label>position</label>
        <input type='text' onChange={(event) => {setPosition(event.target.value)}}></input>
        <label>wage (annual)</label>
        <input type='number' onChange={(event) => {setWage(event.target.value)}}></input>
        <button onClick={addEmployee}>Add employee</button>
      </div>
      <div id='employees'>
        <button onClick={getEmployees}>View Employees</button>
        <table id='employees-table'>
          <tr>
            <th>first name</th>
            <th>last name</th>
            <th>age</th>
            <th>position</th>
            <th>wage</th>
          </tr>
          {employeeList.map((value, index) => {
          return (
            <tr>
              <td key={index}>{value.first_name}</td>
              <td key={index}>{value.last_name}</td>
              <td key={index}>{value.age}</td>
              <td key={index}>{value.position}</td>
              <td key={index}>{value.wage}</td>
            </tr>
          )
        })}
        </table>
      </div>
    </div>
  );
}

export default App;
