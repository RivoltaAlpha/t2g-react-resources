import './App.css'
import Book from './components/Book';
import { Book1 } from './components/Book1'
import Book2 from './components/Book2';
import Book3 from './components/Book3';
import Registrations from './components/Registrations';
import UserProfile from './components/UserProfile';

export const App = () => {
  return (
    <>
    <h1>Favorite Books</h1>
   {/* components  */}
    <Book1/>
    <Book2/>
    <Book3/>
    <Book title="Introduction to React" author="Tiffany Nyawira"/>
    <Book title="Introduction to JS" author="Shelton Sifuna"/>
    <Book title="Introduction to HTML" author="Debby"/>
    <Book title="Introduction to TS" author="Miriam "/>
    <UserProfile />
    <Registrations />
    </>
  );
};

export default App
