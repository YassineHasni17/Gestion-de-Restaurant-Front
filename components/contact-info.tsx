import { MapPin, Phone, Clock, Mail } from "lucide-react"

export default function ContactInfo() {
  return (
    <section className="py-20 bg-muted" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold mb-2">Nous Contacter</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pour toute question ou information supplémentaire, n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1616661401195!5m2!1sfr!2sfr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Carte"
            ></iframe>
          </div>

          <div className="grid gap-6">
            <div className="flex items-start">
              <div className="bg-primary rounded-full p-3 mr-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Adresse</h3>
                <p className="text-muted-foreground">123 Avenue de la Gastronomie, 75001 Paris</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary rounded-full p-3 mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Téléphone</h3>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary rounded-full p-3 mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">contact@restaurant.fr</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Horaires d'ouverture</h3>
                <p className="text-muted-foreground">Lundi - Vendredi: 12h00 - 14h30, 19h00 - 22h30</p>
                <p className="text-muted-foreground">Samedi - Dimanche: 12h00 - 15h00, 19h00 - 23h00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

