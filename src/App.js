import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/Toolbar';
import UserForm from './components/Registro/intex';

function App() {
  return (
    <div className=" px-0 vh-100"  style={{
      overflow:"hidden"
    }}>
      {/*<SearchAppBar />*/}
      <div className=' ' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:"100%"
      }}>
        <div className='  col-12 col-md-6 shadow-lg '

        >
          <UserForm />
        </div>
      </div>


      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
    </div>
  );
}

export default App;
