import axios from "axios"

export const Guardarsolicitud = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/mikroti/solicitu/crear", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}