import todoIcon  from '../asset/todoIcon.svg'

export default function Navbar() {
  return (
    <div className='h-full w-full bg-yellow-200 p-5'>
        <div className='flex flex-row justify-between'>
        <div>
            <img className='h-100 w-10 rounded-full' src = {todoIcon} alt = "todo" />
        </div>
        <div>
            <h2 className='text-4xl font-bold font-sans antialiased text-black'>To-Do List</h2>
        </div>
        <div>
            <button className='bg-yellow-500 p-2 text-white text-lg rounded-lg font-semibold hover:bg-yellow-600'>Sign Out</button>
        </div>
        </div>
    </div>
  )
}
