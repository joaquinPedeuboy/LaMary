import { nullToEmptyString } from "@/helpers";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";


export const contact = {
    sendEmail: defineAction({
        accept: 'form',
        input: z.object({
            name: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El Nombre no puede ir vacio'})
            ),
            email: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El Email no puede ir vacio'}).email({message: 'Email no valido'})
            ),
            location: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'La Localidad no puede ir vacia'})
            ),
            phone: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El telefono no puede ir vacio'})
                .regex(/^[0-9+\s()-]+$/, { message: 'Teléfono no válido' })
            ),
            subject: z.preprocess(
                nullToEmptyString,
                z.string().min(1, {message: 'El Asunto no puede ir vacio'})
            ),
            message: z.preprocess(
                nullToEmptyString,
                z.string().min(30, {message: 'ElMensaje no puede ir vacio o es muy corto'})
            ),
        }),
        handler: async (input) => {
            const url = `${import.meta.env.HOME_URL}wp-json/contact-form-7/v1/contact-forms/100/feedback`

            const formData = new FormData()
            formData.append('your-name', input.name)
            formData.append('your-email', input.email)
            formData.append('your-subject', input.subject)
            formData.append('your-location', input.location)
            formData.append('your-phone', input.phone)
            formData.append('your-message', input.message)
            formData.append('_wpcf7_unit_tag', "wpcf7-123")

            const res = await fetch(url, {
                method: 'POST',
                body: formData
            })

            const json = await res.json()

            return {
                error: false,
                message: 'Tu consulta se envio correctamente, muchas gracias'
            }
        }
    })
}