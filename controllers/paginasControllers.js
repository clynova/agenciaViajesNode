import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'


const paginaInicio = async (req, res) => {
    try {
        // Ejecutamos las consultas en paralelo con Promise.all
        const [viajes, testimoniales] = await Promise.all([
            Viaje.findAll({ limit: 3 }),
            Testimonial.findAll({ limit: 3 })
        ]);

        // Renderizamos la página con los resultados
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimoniales
        });
    } catch (err) {
        console.error('Error al cargar la página de inicio:', err);
        res.status(500).send('Error en el servidor');
    }
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (err) {
        console.log(err)
    }
}

const paginaViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    })
}

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params

    try {
        const resultado = await Viaje.findOne({ where: { slug: slug } })
        console.log(resultado)

        res.render('viaje', {
            pagina: 'Informacion viaje',
            resultado
        })
    } catch (err) {
        console.log(err)
    }
}


export {
    paginaInicio, paginaNosotros, paginaTestimoniales, paginaViajes, paginaDetalleViaje
}