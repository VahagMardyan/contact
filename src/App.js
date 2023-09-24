import Time from './Components/Time/Time';
import Display from './Components/Display/Display';
import './App.css';

const App = () => {
  return (
    <section className='parent'>
      <Time />
      <Display />      
    </section>
  )
}

export default App;