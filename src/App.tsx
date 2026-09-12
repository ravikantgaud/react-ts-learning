import Header from './components/Header';
import UserCard from './components/UserCard';
import ProductCard from './components/ProductCard';
import EmployeeCard from './components/EmployeeCard';
import Counter from './components/Counter';
import EmployeeSearch from './features/EmployeeSearch';
import EmployeeForm from './features/EmployeeForm';

const users = [
  {
    id: 1,
    name: "Ravikant",
    email: "ravikantgaud@gmail.com",
    role: "Admin",
    experience: 10,
    isActive: true
  },
  {
    id: 2,
    name: "Alex",
    email: "alex@gmail.com",
    role: "Super Admin",
    experience: 12,
    isActive: false
  },
  {
    id: 3,
    name: "John",
    email: "john@gmail.com",
    role: "User",
    experience: 15,
    isActive: true
  },
  {
    id: 4,
    name: "Leonardo",
    email: "leonardo@gmail.com",
    role: "User",
    experience: 19,
    isActive: false 
  }
]

const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 75000,
    inStock: true
  },
  {
    id: 2,
    name: 'iPad',
    price: 55000,
    inStock: false
  },
  {
    id: 3,
    name: 'Mac',
    price: 185000,
    inStock: true
  },
  { 
    id: 4,
    name: 'Mobile',
    price: 35000,
    inStock: false
  }
]

function App(){
  return (
    <>
      <Header title='Employee Management System' />
      <Header title="Admin Dashboard" />

      <div className='employees'>
        <EmployeeCard name='Ravikant' department='Frontent Engineering' experience={12} isActive={true} />
        <EmployeeCard name='Ravi' department='Achitecture Engineering' experience={15} isActive={false} />
      </div>

      <div className='user-list'>
        {
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        }
      </div>

      <div className='product-list'>
        {
          products.map((product) => (
            <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} inStock={product.inStock} />
          ))
        }
      </div>
      
      <Counter />

      <EmployeeSearch />

      <EmployeeForm />

    </>
  )
}

export default App;