import Header from './components/Header';
import UserCard from './components/UserCard';
import ProductCard from './components/ProductCard';
import EmployeeCard from './components/EmployeeCard';
//const name = "Ravikant"

function App(){
  return (
    <>
      <Header title='Employee Management System' />
      <Header title="Admin Dashboard" />
      
      <div className='users'>
        <UserCard name="Ravikant" email="ravikantgaud@gmail.com" role="Admin" />
        <UserCard name="Alex" email="alex@gmail.com" role="Super Admin" />
        <UserCard name="John" email="john@gmail.com" role="User" />
        <UserCard name="Leonardo" email="leonardo@gmail.com" role="User" />
      </div>

      <div className='products'>
        <ProductCard id={1} name='Laptop' price={75000} inStock={true} />
        <ProductCard id={2} name='Ipad' price={55000} inStock={false} />
        <ProductCard id={3} name='Mac' price={185000} inStock={true} />
        <ProductCard id={4} name='Mobile' price={35000} inStock={false} />
      </div>

      <div className='Employees'>
        <EmployeeCard name='Ravikant' department='Frontent Engineering' experience={12} isActive={true} />
        <EmployeeCard name='Ravi' department='Achitech Engineering' experience={15} isActive={false} />
      </div>
    </>
  )
}

export default App;