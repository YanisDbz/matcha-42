var nodemailer = require('nodemailer');

const sendmailActivate = (to, subject, activationtoken) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "matchanoreply207@gmail.com",
            pass: "Matcha207",
        }
    });

    var mailOptions = {
        from: 'matchanoreply207@gmail.com',
        to,
        subject,
        html: `
            <body>
                Bienvenue sur matcha,<br>
        
                Pour activer votre compte, veuillez cliquer sur le lien ci-dessous<br><br>
        
                <a href="http://localhost:3000/activate?email=${to}&token=${activationtoken}">activer votre compte</a><br><br>
        
        
        ---------------<br><br>
        Ceci est un mail automatique, Merci de ne pas y répondre.
            </body>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + to);
        }
    });
}

const sendmailPasswordForgot = (to, subject, activationtoken) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "matchanoreply207@gmail.com",
            pass: "Matcha207",
        }
    });

    var mailOptions = {
        from: 'matchanoreply207@gmail.com',
        to,
        subject,
        html: `
            <body>
               Mot de passe oublie<br>
        
                Cliquer le lien ci dessous pour changer de mot de passe<br><br>
        
                <a href="http://localhost:3000/changepwd?email=${to}&token=${activationtoken}">Changer mot de passe</a><br><br>
        
        
        ---------------<br><br>
        Ceci est un mail automatique, Merci de ne pas y répondre.
            </body>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + to);
        }
    });
}
module.exports = {sendmailActivate, sendmailPasswordForgot}