'use client'
import { useRouter } from 'next/navigation'
const Polyci = () => {
    const router = useRouter()
    function handleClick() {
        router.push('/')
    }
    return(
        <>
        <h1>Trang chinh sach</h1>
        <button type="button" onClick={handleClick}>
               Back To Home
            </button>
            </>
    )
}
export default Polyci;