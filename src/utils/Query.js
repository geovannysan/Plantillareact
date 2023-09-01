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

export const EnviaWhast = async (parms) => {
    /*
    {
    "user_ids":["593993713942"],
    "message":"Hola buenas tardes",
     "link":"Hola"
    }
    */
    try {
        let { data } = await axios.post("https://core.xfiv.chat/whatsapp_qr_ticket/api/v1/send", parms)
        return data
    } catch (error) {
        return error
    }
}