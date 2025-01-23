import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    const { nombre, correo, mensaje } = req.body

    const errores = []

    // Validación del campo nombre
    if (!nombre || nombre.trim() === "") {
        errores.push({ mensaje: "El campo 'nombre' es obligatorio." });
    }

    // Validación del campo correo
    if (!correo || correo.trim() === "") {
        errores.push({ mensaje: "El campo 'correo' es obligatorio." });
    }

    // Validación del campo mensaje
    if (!mensaje || mensaje.trim() === "") {
        errores.push({ mensaje: "El campo 'mensaje' es obligatorio." });
    }

    if (errores.length > 0) {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
         
    } else {
        try {
            await Testimonial.create({
                nombre, correo, mensaje
            })
            res.redirect('/testimoniales')
        } catch(err) {
            console.log(err)
        }
    }
}

export { guardarTestimonial }

