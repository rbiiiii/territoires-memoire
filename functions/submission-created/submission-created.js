const dotenv = require('dotenv')
dotenv.config()
const sgMail = require('@sendgrid/mail')

exports.handler = async (event, context, callback) => {

    function getCurrentTime() {
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
    
        let hours = new Date().getHours()
        let minutes = new Date().getMinutes()
        let seconds = new Date().getSeconds()
        let currentTime = pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
    
        return currentTime
    }
    
    try {
        let payload = JSON.parse(event.body).payload
        let content = `
            <p><strong>De</strong> : ${payload.data.firstname} ${payload.data.name} (<a href="mailto:${payload.data.email}">${payload.data.email}</a>)<br />envoyé à ${getCurrentTime()}</p>
            <h1>Formulaire de demande de réservation PJC!</h1>
            <ul>
                <h3>Coordonnées de la personne de contact</h3>
                <li><strong>Sexe</strong> : ${payload.data.sexe}</li>
                <li><strong>Prénom</strong> : ${payload.data.firstname}</li>
                <li><strong>Nom</strong> : ${payload.data.name}</li>
                <li><strong>Tél.</strong> : ${payload.data.tel}</li>
                <li><strong>Email</strong> : ${payload.data.email}</li>
                <li>
                    <strong>Adresse</strong> :<br>
                    ${payload.data.address}<br>
                    ${payload.data.cp}&nbsp;${payload.data.localite}
                </li>
                <h3>S'il s'agit d'un groupe</h3>
                <li><strong>Scolaire ?</strong> : ${payload.data.scolaire}</li>
                <li><strong>Nom (de l'établissement, de l'organisation…)</strong> : ${payload.data.groupName}</li>
                <li>
                    <strong>Adresse</strong> :<br>
                    ${payload.data.groupAddress}<br>
                    ${payload.data.groupCp}&nbsp;${payload.data.groupLocalite}
                </li>
                <h3>La visite</h3>
                <li><strong>Nbr de participants entre 11 et 14 ans</strong> : ${payload.data.nbr1114}</li>
                <li><strong>Nbr de participants de 15 ans et +</strong> : ${payload.data.nbr15}</li>
                <li><strong>Nbr de participants seniors</strong> : ${payload.data.nbrSeniors}</li>
                <li><strong>Nbr d'accompagnateurs</strong> : ${payload.data.nbrAccompanists}</li>
                <li><strong>Dates</strong> : ${payload.data.dates}</li>
                <li><strong>Horaire</strong> : ${payload.data.schedule}</li>
                <li><strong>Langue de la visite</strong> : ${payload.data.language}</li>
                <li><strong>Autres infos</strong> : ${payload.data.otherInfos}</li>
            </ul>
            <p>Formulaire envoyé à partir du site web des Territoires de la Mémoire</p>`

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
        to: ['robinfoguenne@territoires-memoire.be', 'reservation@territoires-memoire.be'],
        from: payload.data.email,
        subject: 'Formulaire de demande de réservation PJC!',
        text: content,
        html: content,
    }

    sgMail.send(msg)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Hello at ${getCurrentTime()}` })
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
    
}