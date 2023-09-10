import Time from './Components/Time/Time';
import Display from './Components/Display/Display';
import './App.css';

const App = () => {
  return (
    <section className='parent'>
      <Time />
      <h1 style={{ color: 'green', fontSize: '48px', fontWeight: '400', }}> Contact List </h1>
      <Display />
    </section>
  )
}

export default App;