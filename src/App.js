import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Maps from './components/Maps';
import Market from './components/Market';
import styles from './styles/Home.module.css'

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Maps />
        <div className={styles.divider}></div>
        <Market />
      </div>
      <Footer />
    </>
  );
}

export default App;
