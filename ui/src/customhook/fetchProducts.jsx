import { useEffect, useState } from "react"
import { URL } from "../url"


function useFetchProducts(url) {

    const [loading, setLoading] = useState(false)
    const [Product, setProducts] = useState(null)
    const [Status, setStatus] = useState(null)
    const [Msg, setMsg] = useState('')

    useEffect(() => {
        try {
            setLoading(true)
            URL.get(url)
                .then(res => {
                    setStatus(res.status);
                    setProducts(res.data)
                    setLoading(false)
                })
                .catch(error => {
                    setStatus(error.response.status);
                    setLoading(false)
                    setMsg(error.message || error.response.data.errorMsg)
                })
        } catch (error) {
            setLoading(false)
        }

    }, [url])

    return { Msg, loading, Product, Status }


}

export default useFetchProducts