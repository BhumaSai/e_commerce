import { useState } from 'react'


function useToggle(b) {
    const [toggle, setToggle] = useState(b)

    const Toggle = () => {
        setToggle(!toggle)
    }
    return { toggle, Toggle }
}

export default useToggle