// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { tabs } from './tabs.jsx';

function App() {

  let [todolist, settodolist] = useState([])
  let [activetabs, setactivetabs] = useState(0)
  let [activecontent, setactivecontent] = useState(tabs[0])

  let changedata = (index) => {
    setactivetabs(index)
    setactivecontent(tabs[index])
  }

  let savetodolist = (event) => {

    let todoname = event.target.todoname.value;
    if (!todolist.includes(todoname)) {
      let finaldolist = [...todolist, todoname]
      settodolist(finaldolist)
    } else {
      alert("ToDo Name Allready Exists ...")
    }

    // alert(todoname);

    event.preventDefault();
  }
  let list = todolist.map((value, index) => {
    return (
      <Todolistitems value={value} key={index} indexno={index} todolist={todolist} settodolist={settodolist} />
    )
  })
  return (
    <div className="App">

      <div className='tabsouter'>
        <h1 style={{ textAlign: 'left' }}>
          Law Prep Vision Mission and Values
        </h1>
        <ul>
          {tabs.map((tabsitems, index) => {
            return (
              <li>
                <button onClick={() => changedata(index)} className={activetabs == index ? 'activebtn' : ''}>{tabsitems.title}</button>
              </li>
            )
          })}
        </ul>
        {
          activecontent !== undefined ?
            <p>
              {activecontent.description}
            </p>
            :
            ''
        }


      </div>


      <h1>ToDo List</h1>
      <form onSubmit={savetodolist}>
        <input type='text' name='todoname' /> <button>Save</button>
      </form>
      <div className='outerdiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;


function Todolistitems({ value, indexno, todolist, settodolist }) {
  let [status, setstatus] = useState(false);

  let deleterow = () => {
    let finaldata = todolist.filter((v, i) => i != indexno)
    settodolist(finaldata)
  }
  let checkstatus = () => {
    setstatus(!status)
  }
  return (
    <li className={(status) ? "completetodo" : ""} onClick={checkstatus}> {indexno + 1}{value}<span onClick={deleterow}>&times;</span></li>
  )
}