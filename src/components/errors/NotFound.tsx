import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Not Found 404</h1>
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition cursor-pointer"
            >
                <ArrowLeft size={20} />
                Go to Home
            </button>
        </div>
    )
}

export default NotFound
