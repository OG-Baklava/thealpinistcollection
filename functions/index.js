const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mjml2html = require("mjml");
admin.initializeApp();
const db = admin.firestore();
const adminEmail = "info@thealpinistcollection.com";
const baseUrl = "https://thealpinistcollection.com";
const baseTestUrl = "http://localhost:5173";
const stripe = require("stripe");

const confirmGueriteBook = (newData, change) => {
  const htmlOutput = mjml2html(
      `
<mjml>
<mj-body background-color="#fff">
  <mj-section>
    <mj-column>
      <mj-divider border-color="#42b883"></mj-divider>
      <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite Booking</mj-text>
      <mj-text font-size="16px" color="#171717">Bonjour bonjour,</mj-text>
      <mj-text font-size="16px" color="#171717">C’est avec grand plaisir que nous confirmons votre réservation pour ${
  newData.peoples
} à LA GUERITE à Saillon le ${new Intl.DateTimeFormat("fr-CH").format(
    newData.date.toDate()
)} pour le repas du midi.</mj-text>
      <mj-text font-size="16px" color="#171717">Le rendez vous est fixé à 11h15 au parking des Remparts dans le vieux bourg de Saillon où Nicolas sera là pour vous accueillir.</mj-text>
      <mj-text font-size="16px" color="#171717">Il vous accompagnera à pieds à la guerite et vous offrira une petite dégustation de certains de ses crus au cœur de son vignoble. Crème solaire, chapeau et baskets sont les bienvenus.</mj-text>
      <mj-text font-size="16px" color="#171717">Nous avez vous bien communiqué vos éventuelles intolérances? N’ayant pas de plan b à la guérite, il est important pour nous de les connaître avant.</mj-text>
      <mj-text font-size="16px" color="#171717">Nous nous réjouissons de vous accueillir pour cette nouvelle édition dans notre petit coin de paradis.</mj-text>
      <mj-text font-size="16px" color="#171717">Salutations gourmandes.</mj-text>
      <mj-text font-size="16px" color="#171717">Delphine, Pierre & Nicolas</mj-text>
      <mj-divider border-color="#42b883" border-width="2px" />
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`
  );
  db.collection("mail")
      .add({
        to: newData.email,
        message: {
          subject: "Confirmation de votre de réservation !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log("Guerite Confirm Mail Document written with ID: ", docRef.id);
        change.after.ref.set(
            {
              mailConfirmId: docRef.id,
            },
            {merge: true}
        );
      });
};

const refuseGueriteBook = (newData, change) => {
  const htmlOutput = mjml2html(
      `
<mjml>
<mj-body background-color="#fff">
  <mj-section>
    <mj-column>
      <mj-divider border-color="#42b883"></mj-divider>
      <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite Booking</mj-text>
      <mj-text font-size="16px" color="#171717">Bonjour,</mj-text>
      <mj-text font-size="16px" color="#171717">Nous avons bien reçu votre demande de réservation. Nous avons le regret de ne pas être en mesure de la confirmer, le nombre de personne demandé n’est pas disponible pour le ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(
      newData.date.toDate()
  )}. Nous nous permettrons de vous appeler pour vous proposer d’autres dates.</mj-text>
      <mj-text font-size="16px" color="#171717">Au plaisir de vous entendre, meilleures salutations.</mj-text>
      <mj-text font-size="16px" color="#171717">Delphine, Pierre & Nicolas.</mj-text>
      <mj-divider border-color="#42b883" border-width="2px" />
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`
  );
  db.collection("mail")
      .add({
        to: newData.email,
        message: {
          subject: "Refus de votre de réservation !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log("Guerite Confirm Mail Document written with ID: ", docRef.id);
        change.after.ref.set(
            {
              mailRefuseId: docRef.id,
            },
            {merge: true}
        );
      });
};

const cancelGueriteBook = (newData, change) => {
  const htmlOutput = mjml2html(
      `
<mjml>
<mj-body background-color="#fff">
  <mj-section>
    <mj-column>
      <mj-divider border-color="#42b883"></mj-divider>
      <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite Booking</mj-text>
      <mj-text font-size="16px" color="#171717">Madame, Monsieur</mj-text>
      <mj-text font-size="16px" color="#171717">Ce mail fait office d'annulation de votre réservation du ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(newData.date.toDate())}</mj-text>
      <mj-text font-size="16px" color="#171717">Au plaisir de vous entendre, meilleures salutations.</mj-text>
      <mj-text font-size="16px" color="#171717">Delphine, Pierre & Nicolas.</mj-text>
      <mj-divider border-color="#42b883" border-width="2px" />
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`
  );
  db.collection("mail")
      .add({
        to: newData.email,
        message: {
          subject: "Annulation de votre de réservation !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log("Guerite Confirm Mail Document written with ID: ", docRef.id);
        change.after.ref.set(
            {
              mailCancelId: docRef.id,
            },
            {merge: true}
        );
      });
};

exports.onGueriteBookChange = functions
    .region("europe-west1")
    .firestore.document("gueriteBooking/{bookId}")
    .onUpdate((change, context) => {
      const beforeData = change.before.data();
      const newData = change.after.data();
      if (newData.approved != beforeData.approved) {
        if (newData.approved === true) confirmGueriteBook(newData, change);
        else if (newData.approved === false) refuseGueriteBook(newData, change);
      } else if (newData.canceled != beforeData.canceled) {
        cancelGueriteBook(newData, change);
      }
    });

exports.onGueriteBook = functions
    .region("europe-west1")
    .firestore.document("gueriteBooking/{bookId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const htmlOutput = mjml2html(
          `
<mjml>
  <mj-body background-color="#fff">
    <mj-section>
      <mj-column>
        <mj-divider border-color="#42b883"></mj-divider>
        <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite Booking</mj-text>
        <mj-text font-size="16px" color="#171717">Bonjour à vous !</mj-text>
        <mj-text font-size="16px" color="#171717">Nous vous remercions pour votre demande de réservation et pour l’intérêt porté sur notre guerite.</mj-text>
        <mj-text font-size="16px" color="#171717">Vous recevrez un mail qui confirmera votre demande avec toutes les informations pratiques, ou un appel de notre part dans le cas où nous ne pourrions pas la confirmer pour vous proposer une autre date.</mj-text>
        <mj-text font-size="16px" color="#171717">Salutations gourmandes.</mj-text>
        <mj-text font-size="16px" color="#171717">Delphine, Pierre & Nicolas.</mj-text>
        <mj-divider border-color="#42b883" border-width="1px"></mj-divider>
        <mj-text font-size="16px" color="#171717">Nom Prénom: ${
  data.firstname
} ${data.lastname}</mj-text>
        <mj-text font-size="16px" color="#171717">email: ${data.email}</mj-text>
        <mj-text font-size="16px" color="#171717">date: ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(data.date.toDate())}</mj-text>
        <mj-text font-size="16px" color="#171717">Nb personnes: ${
  data.peoples
}</mj-text>
        <mj-text font-size="16px" color="#171717">Allergies ou intolérances: ${
  data.notes
}</mj-text>
        <mj-divider border-color="#42b883" border-width="2px" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
      );
      const htmlOutputAdmin = mjml2html(
          `
<mjml>
<mj-body background-color="#fff">
  <mj-section>
    <mj-column>
      <mj-divider border-color="#42b883"></mj-divider>
      <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite Booking</mj-text>
      <mj-text font-size="16px" color="#171717">Ce mail fait office de confirmation d'une nouvelle demande de réservation pour la Guerite.</mj-text>
      <mj-text font-size="16px" color="#171717">Nom Prénom: ${data.firstname} ${
  data.lastname
}</mj-text>
      <mj-text font-size="16px" color="#171717">email: ${data.email}</mj-text>
      <mj-text font-size="16px" color="#171717">date: ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(data.date.toDate())}</mj-text>
      <mj-text font-size="16px" color="#171717">Nb personnes: ${
  data.peoples
}</mj-text>
      <mj-text font-size="16px" color="#171717">Allergies ou intolérances: ${
  data.notes
}</mj-text>
      <mj-divider border-color="#42b883" border-width="2px" />
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
`
      );
      db.collection("mail")
          .add({
            to: data.email,
            message: {
              subject: "Confirmation de votre demande de réservation !",
              html: htmlOutput.html,
            },
          })
          .then((docRef) => {
            console.log("Guerite Mail Document written with ID: ", docRef.id);
            snap.ref.set(
                {
                  mail_id: docRef.id,
                },
                {merge: true}
            );
          });

      db.collection("mail")
          .add({
            to: adminEmail,
            message: {
              subject: "Nouvelle demande de réservation Guerite !",
              html: htmlOutputAdmin.html,
            },
          })
          .then((docRef) => {
            console.log("Admin Guerite Mail Document written with ID: ", docRef.id);
            snap.ref.set(
                {
                  mail_admin_id: docRef.id,
                },
                {merge: true}
            );
          });
    });

exports.onContact = functions
    .region("europe-west1")
    .firestore.document("contact/{contactId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const htmlOutput = mjml2html(
          `
<mjml>
  <mj-body background-color="#fff">
    <mj-section>
      <mj-column>
        <mj-divider border-color="#42b883"></mj-divider>
        <mj-text font-size="20px" color="#171717" font-family="helvetica">${data.subject}</mj-text>
        <mj-text font-size="16px" color="#171717">${data.message}</mj-text>
        <mj-text font-size="12px" color="#171717">Nom Prénom: ${data.firstname} ${data.lastname}</mj-text>
        <mj-text font-size="12px" color="#171717">email: ${data.email}</mj-text>
        <mj-text font-size="12px" color="#171717">Ce mail a été envoyé via le formulaire de contact du site alpinistcollection.</mj-text>
        <mj-divider border-color="#42b883" border-width="2px" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
      );
      db.collection("mail")
          .add({
            to: adminEmail,
            message: {
              subject: `Message de ${data.email}`,
              html: htmlOutput.html,
            },
          })
          .then((docRef) => {
            console.log("Mail Contact Document written with ID: ", docRef.id);
            snap.ref.set(
                {
                  mail_id: docRef.id,
                },
                {merge: true}
            );
          });
    });

exports.on4808Book = functions
    .region("europe-west1")
    .firestore.document("the4808Booking/{bookId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const htmlOutput = mjml2html(
          `
      <mjml>
      <mj-body background-color="#fff">
        <mj-section>
          <mj-column>
            <mj-divider border-color="#42b883"></mj-divider>
            <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - 4808 Booking</mj-text>
            <mj-text font-size="16px" color="#171717">Ce mail fait office de confirmation d'une nouvelle demande de réservation pour le 4808.</mj-text>
            <mj-text font-size="16px" color="#171717">Nom Prénom: ${
  data.firstname
} ${data.lastname}</mj-text>
            <mj-text font-size="16px" color="#171717">email: ${
  data.email
}</mj-text>
            <mj-text font-size="16px" color="#171717">téléphone: ${
  data.phone
}</mj-text>
            <mj-text font-size="16px" color="#171717">lieu: ${
  data.place
}</mj-text>
            <mj-text font-size="16px" color="#171717">date: ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(data.date.toDate())}</mj-text>
            <mj-text font-size="16px" color="#171717">Nb personnes: ${
  data.peoples
}</mj-text>
            <mj-text font-size="16px" color="#171717">Allergies ou intolérances: ${
  data.notes
}</mj-text>
            <mj-divider border-color="#42b883" border-width="2px" />
          </mj-column>
        </mj-section>
      </mj-body>
      </mjml>
`
      );
      db.collection("mail")
          .add({
            to: adminEmail,
            message: {
              subject: "Demande réservation 4808",
              html: htmlOutput.html,
            },
          })
          .then((docRef) => {
            console.log("4808 book Document written with ID: ", docRef.id);
            snap.ref.set(
                {
                  mail_id: docRef.id,
                },
                {merge: true}
            );
          });
    });

exports.onMayenBook = functions
    .region("europe-west1")
    .firestore.document("mayenBooking/{bookId}")
    .onCreate((snap, context) => {
      const data = snap.data();
      const htmlOutput = mjml2html(
          `
      <mjml>
      <mj-body background-color="#fff">
        <mj-section>
          <mj-column>
            <mj-divider border-color="#42b883"></mj-divider>
            <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Mayen 1842 Booking</mj-text>
            <mj-text font-size="16px" color="#171717">Ce mail fait office de confirmation d'une nouvelle demande de réservation pour le mayen 1842.</mj-text>
            <mj-text font-size="16px" color="#171717">Nom Prénom: ${
  data.firstname
} ${data.lastname}</mj-text>
            <mj-text font-size="16px" color="#171717">email: ${
  data.email
}</mj-text>
            <mj-text font-size="16px" color="#171717">téléphone: ${
  data.phone
}</mj-text>
            <mj-text font-size="16px" color="#171717">dates: ${new Intl.DateTimeFormat(
      "fr-CH"
  ).format(data.dates[0].toDate())} - ${new Intl.DateTimeFormat(
    "fr-CH"
).format(data.dates[1].toDate())}</mj-text>
            <mj-text font-size="16px" color="#171717">Nb personnes: ${
  data.peoples
}</mj-text>
            <mj-divider border-color="#42b883" border-width="2px" />
          </mj-column>
        </mj-section>
      </mj-body>
      </mjml>
`
      );
      db.collection("mail")
          .add({
            to: adminEmail,
            message: {
              subject: "Demande réservation Mayen 1842",
              html: htmlOutput.html,
            },
          })
          .then((docRef) => {
            console.log("Mayen book Document written with ID: ", docRef.id);
            snap.ref.set(
                {
                  mail_id: docRef.id,
                },
                {merge: true}
            );
          });
    });

exports.createCheckout = functions
    .region("europe-west1")
    .runWith({secrets: ["STRIPE_PROD_API"]})
    .https.onCall((data, context) => {
      const collectionRef = db.collection("checkout");
      const amount = data.amount * 100;
      const stripeInstance = stripe(process.env.STRIPE_PROD_API);
      return stripeInstance.checkout.sessions
          .create({
            payment_method_types: ["card"],
            line_items: [
              {
                name: "Commande chez Alpinist Collection",
                amount: Math.round(amount),
                currency: "chf",
                quantity: 1,
              },
            ],
            success_url: baseUrl + "/checkout/{CHECKOUT_SESSION_ID}",
            cancel_url: baseUrl + "/checkout?error=true",
          })
          .then((sessionId) => {
            Object.assign(data, {checkoutSessionId: sessionId, verified: false});
            return collectionRef.add(data).then((documentReference) => {
              console.log(`Added document with name: ${documentReference.id}`);

              return {sessionId: sessionId.id};
            });
          });
    });

exports.onUserCreate = functions
    .region("europe-west1")
    .auth.user()
    .onCreate((user) => {
      db.doc(`users/${user.uid}`).set({active: true, createDate: new Date()});
    });

const sendCheckoutEmail = (snapshot) => {
  const docId = snapshot.id;
  const data = snapshot.data();
  const htmlOutput = mjml2html(
      `
<mjml>
  <mj-body background-color="#fff">
    <mj-section>
      <mj-column>
        <mj-divider border-color="#42b883"></mj-divider>
        <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Epicerie 2018</mj-text>
        <mj-text font-size="16px" color="#171717">Madame, Monsieur,</mj-text>

        <mj-text font-size="16px" color="#171717">C’est avec grand plaisir que nous confirmons votre commande. Vous pouvez la consulter à tout moment sur notre site web en cliquant sur le lien ci-dessous.</mj-text>
        <mj-button background-color="#42b883" href="${baseUrl}/order/${docId}">Voir la commande</mj-button>
        <mj-text font-size="16px" color="#171717">Vous recevrez un mail de confirmation lorsque celle-ci sera envoyée, dans un délai d’une semaine.</mj-text>
        <mj-text font-size="16px" color="#171717">Référence commande: ${docId}</mj-text>
        <mj-text font-size="16px" color="#171717">Salutations gourmandes.</mj-text>
        <mj-divider border-color="#42b883" border-width="2px" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
  );
  db.collection("mail")
      .add({
        to: data.email,
        message: {
          subject: "Confirmation de votre de commande !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log("Checkout Confirm Mail Document written with ID: ", docRef.id);
        snapshot.ref.set(
            {
              mail_confirm_id: docRef.id,
            },
            {merge: true}
        );
      });
};

const sendCheckoutEmailAdmin = (snapshot) => {
  const docId = snapshot.id;
  const data = snapshot.data();
  const htmlOutput = mjml2html(
      `
<mjml>
  <mj-body background-color="#fff">
    <mj-section>
      <mj-column>
        <mj-divider border-color="#42b883"></mj-divider>
        <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Epicerie 2018</mj-text>
        <mj-text font-size="16px" color="#171717">Ce mail fait office de confirmation d'une nouvelle commande sur l'Epicerie.</mj-text>
        <mj-button background-color="#42b883" href="${baseUrl}/order/${docId}">Voir la commande</mj-button>
        <mj-text font-size="16px" color="#171717">Référence commande: ${docId}</mj-text>
        <mj-text font-size="16px" color="#171717">Email client: ${data.email}</mj-text>
        <mj-divider border-color="#42b883" border-width="2px" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
  );
  db.collection("mail")
      .add({
        to: adminEmail,
        message: {
          subject: "Confirmation commande Epricerie 2018 !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log(
            "Checkout Admin Confirm Mail Document written with ID: ",
            docRef.id
        );
      });
};

exports.validatePayment = functions
    .region("europe-west1")
    .https.onCall((data, context) => {
      const collectionRef = db.collection("checkout");

      return collectionRef
          .where("checkoutSessionId.id", "==", data.sessionId)
          .get()
          .then((querySnapshot) => {
            const snapshot = querySnapshot.docs[0];
            const orderId = snapshot.id;
            if (snapshot.data().verified) {
              return {orderId: orderId};
            }
            sendCheckoutEmail(snapshot);
            sendCheckoutEmailAdmin(snapshot);
            snapshot.ref.set(
                {
                  verified: true,
                },
                {merge: true}
            );
            return {orderId: orderId};
          });
    });

const sendGueriteCheckoutEmail = (snapshot) => {
  const docId = snapshot.id;
  const data = snapshot.data();
  const htmlOutput = mjml2html(
      `
      <mjml>
        <mj-body background-color="#fff">
          <mj-section>
            <mj-column>
              <mj-divider border-color="#42b883"></mj-divider>
              <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite 1814</mj-text>
              <mj-text font-size="16px" color="#171717">Madame, Monsieur,</mj-text>
  
              <mj-text font-size="16px" color="#171717">C’est avec grand plaisir que nous confirmons votre réservation pour ${
  data.peoples
} personnes à LA GUERITE à Saillon le ${new Intl.DateTimeFormat(
    "fr-CH"
).format(data.date.toDate())} prochain à midi.</mj-text>
              <mj-button background-color="#42b883" href="${baseUrl}/guerite1814/booking/${docId}">Voir la réservation</mj-button>
              <mj-text font-size="16px" color="#171717">Le rendez vous est fixé à 11h15 au parking des Remparts dans le vieux bourg de Saillon où Nicolas sera là pour vous accueillir.</mj-text>
              <mj-text font-size="16px" color="#171717">Il vous accompagnera à pieds à la guerite et vous offrira une petite dégustation de certains de ses crus au cœur du vignoble. 
      Crème solaire, chapeaux et baskets sont les bienvenus.</mj-text>
              <mj-text font-size="16px" color="#171717">L’acompte que vous avez payé à la réservation sera déduit de votre note finale le jour J, le solde est à régler en espèces à la guérite.</mj-text>
              <mj-text font-size="16px" color="#171717">Nous nous réjouissons de vous accueillir pour cette nouvelle édition dans ce petit coin de paradis.</mj-text>
              <mj-text font-size="16px" color="#171717">Salutations gourmandes.</mj-text>
              <mj-text font-size="16px" color="#171717">Delphine, Pierre et Nicolas.</mj-text>
              <mj-divider border-color="#42b883" border-width="2px" />
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
      `
  );
  db.collection("mail")
      .add({
        to: data.customerInfos.email,
        message: {
          subject: "Confirmation de votre de réservation !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log(
            "Guerite Checkout Confirm Mail Document written with ID: ",
            docRef.id
        );
        snapshot.ref.set(
            {
              mail_confirm_id: docRef.id,
            },
            {merge: true}
        );
      });
};

const sendGueriteCheckoutEmailAdmin = (snapshot) => {
  const docId = snapshot.id;
  const data = snapshot.data();
  const htmlOutput = mjml2html(
      `
      <mjml>
        <mj-body background-color="#fff">
          <mj-section>
            <mj-column>
              <mj-divider border-color="#42b883"></mj-divider>
              <mj-text font-size="20px" color="#171717" font-family="helvetica">TheAlpinistCollection - Guerite 1814</mj-text>
              <mj-text font-size="16px" color="#171717">Ce mail fait office de confirmation d'une nouvelle réservation sur la guérite.</mj-text>
              <mj-button background-color="#42b883" href="${baseUrl}/guerite1814/booking/${docId}">Voir la réservation</mj-button>
              <mj-text font-size="16px" color="#171717">Référence commande: ${docId}</mj-text>
              <mj-text font-size="16px" color="#171717">Email/tel client: ${data.customerInfos.email} - ${data.customerInfos.phone}</mj-text>
              <mj-divider border-color="#42b883" border-width="2px" />
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
      `
  );
  db.collection("mail")
      .add({
        to: adminEmail,
        message: {
          subject: "Confirmation réservation Guerite 1814 !",
          html: htmlOutput.html,
        },
      })
      .then((docRef) => {
        console.log(
            "Guerite Checkout Admin Confirm Mail Document written with ID: ",
            docRef.id
        );
      });
};

const createGueriteBookingSession = (
    data,
    context,
    secret,
    url,
    isTest,
    bookCost,
    couponData
) => {
  let totalAmount = data.peoples * bookCost;
  if (couponData != null) {
    totalAmount = totalAmount - couponData.couponAmount;
  }
  const stripeInstance = stripe(secret);
  return stripeInstance.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              product_data: {
                name: "Guerite 1814",
                description: "Réservation Guerite chez the Alpinist Collection",
              },
              unit_amount: Math.round(totalAmount * 100),
              currency: "chf",
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: url + "/guerite1814/checkout/{CHECKOUT_SESSION_ID}",
        cancel_url: url + "/guerite1814/booking?error=true",
      })
      .then((sessionId) => {
        const bookRef = db.doc(`gueriteBookings/${data.bookId}`);
        return bookRef.get().then((snap) => {
          const recordData = {
            bookRef: bookRef,
            customerInfos: data.customerInfos,
            peoples: data.peoples,
            date: snap.data().date,
            verified: false,
            checkoutSessionId: sessionId,
            amoutTotal: totalAmount,
            bookCost: bookCost,
            couponAmount: 0,
            couponRef: null,
          };
          if (couponData != null) {
            recordData.couponAmount = couponData.couponAmount;
            recordData.couponRef = couponData.couponRef;
          }
          return db
              .collection("gueriteCustomerBooking")
              .add(recordData)
              .then((documentReference) => {
                console.log(
                    `Added guerite Booking document with name: ${documentReference.id}`
                );

                return {sessionId: sessionId.id};
              });
        });
      });
};

const prepareGueriteBooking = (data, context, secret, url, isTest) => {
  return db
      .doc("bookSettings/guerite")
      .get()
      .then((docSnapshot) => {
        const bookSettings = docSnapshot.data();
        const bookCost = bookSettings.bookAmount;
        if (data.couponRef == null) {
          return createGueriteBookingSession(
              data,
              context,
              secret,
              url,
              isTest,
              bookCost,
              null
          );
        }
        return db
            .doc(`gueriteCoupon/${data.couponRef}`)
            .get()
            .then((couponSnapshot) => {
              const couponData = couponSnapshot.data();
              const couponAmount = couponData.amount;
              const totalAmount = data.peoples * bookCost;
              if (couponAmount < totalAmount) {
                return createGueriteBookingSession(
                    data,
                    context,
                    secret,
                    url,
                    isTest,
                    bookCost,
                    {
                      couponAmount: couponAmount,
                      couponRef: couponSnapshot.ref,
                    }
                );
              }
              const bookRef = db.doc(`gueriteBookings/${data.bookId}`);
              return bookRef.get().then((snap) => {
                const bookingData = snap.data();
                const recordData = {
                  bookRef: bookRef,
                  customerInfos: data.customerInfos,
                  peoples: data.peoples,
                  date: bookingData.date,
                  verified: true,
                  checkoutSessionId: null,
                  amoutTotal: 0,
                  bookCost: bookCost,
                  couponAmount: couponAmount,
                  couponRef: couponSnapshot.ref,
                };
                return db
                    .collection("gueriteCustomerBooking")
                    .add(recordData)
                    .then((documentReference) => {
                      console.log(
                          `Added guerite Booking document with name: ${documentReference.id}`
                      );
                      return documentReference.get().then((snapshot) => {
                        sendGueriteCheckoutEmail(snapshot);
                        sendGueriteCheckoutEmailAdmin(snapshot);
                        const finalCouponAmount = couponAmount - totalAmount;
                        couponSnapshot.ref.set(
                            {
                              amount: finalCouponAmount,
                              used: finalCouponAmount <= 0 ? true : false,
                            },
                            {merge: true}
                        );

                        const newPeoples = bookingData.available - recordData.peoples;
                        bookRef.set(
                            {
                              available: newPeoples,
                              closed: newPeoples <= 0 ? true : false,
                            },
                            {merge: true}
                        );

                        return {bookingId: documentReference.id};
                      });
                    });
              });
            });
      });
};

exports.createGueriteBooking = functions
    .region("europe-west1")
    .runWith({secrets: ["STRIPE_GUERITE_PROD_API"]})
    .https.onCall((data, context) => {
      return prepareGueriteBooking(
          data,
          context,
          process.env.STRIPE_GUERITE_PROD_API,
          baseUrl,
          false
      );
    });

exports.createGueriteBookingTest = functions
    .region("europe-west1")
    .runWith({secrets: ["STRIPE_GUERITE_TEST_API"]})
    .https.onCall((data, context) => {
      return prepareGueriteBooking(
          data,
          context,
          process.env.STRIPE_GUERITE_TEST_API,
          baseTestUrl,
          true
      );
    });

exports.validateGueriteBook = functions
    .region("europe-west1")
    .https.onCall((data, context) => {
      const collectionRef = db.collection("gueriteCustomerBooking");

      return collectionRef
          .where("checkoutSessionId.id", "==", data.sessionId)
          .get()
          .then((querySnapshot) => {
            const snapshot = querySnapshot.docs[0];
            const bookId = snapshot.id;
            const snapData = snapshot.data();
            if (snapData.verified) {
              return {bookId: bookId};
            }
            return snapData.bookRef.get().then((bookingSnapshot) => {
              const bookingData = bookingSnapshot.data();
              const newPeoples = bookingData.available - snapData.peoples;
              snapData.bookRef.set(
                  {
                    available: newPeoples,
                    closed: newPeoples <= 0 ? true : false,
                  },
                  {merge: true}
              );
              snapshot.ref.set(
                  {
                    verified: true,
                  },
                  {merge: true}
              );
              sendGueriteCheckoutEmail(snapshot);
              sendGueriteCheckoutEmailAdmin(snapshot);
              if (snapData.couponRef == null) {
                return {bookId: bookId, bookingId: bookingSnapshot.id};
              }
              return snapData.couponRef.get().then((couponSnapshot) => {
                const couponData = couponSnapshot.data();
                const finalCouponAmount = couponData.amount - snapData.couponAmount;
                couponSnapshot.ref.set(
                    {
                      amount: finalCouponAmount,
                      used: finalCouponAmount <= 0 ? true : false,
                    },
                    {merge: true}
                );
                return {bookId: bookId, bookingId: bookingSnapshot.id};
              });
            });
          });
    });

const getCouponByIdentifier = (identifier, bookAmount) => {
  let finalIdentifier = identifier;
  if (finalIdentifier.startsWith("1842")) {
    finalIdentifier = finalIdentifier.replace("1842", "1814");
  }
  return db
      .collection("gueriteCoupon")
      .where("identifier", "==", finalIdentifier)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new functions.https.HttpsError(
              "invalid-argument",
              "Le bon de réduction est introuvable"
          );
        }
        const snapshot = querySnapshot.docs[0];
        const couponRef = snapshot.id;
        const snapData = snapshot.data();
        if (snapData.used == true) {
          throw new functions.https.HttpsError(
              "failed-precondition",
              "Le bon de réduction a déjà utiliser son crédit"
          );
        }
        return {
          couponRef: couponRef,
          couponId: snapData.identifier,
          couponAmount:
          bookAmount >= snapData.amount ? snapData.amount : bookAmount,
        };
      });
};

exports.checkGueriteCoupon = functions
    .region("europe-west1")
    .https.onCall((data, context) => {
      const settingsRef = db.doc("bookSettings/guerite");
      return settingsRef.get().then((docSnapshot) => {
        const bookingSettings = docSnapshot.data();
        const bookAmount = data.peoples * bookingSettings.bookAmount;
        return getCouponByIdentifier(data.couponId, bookAmount);
      });
    });
