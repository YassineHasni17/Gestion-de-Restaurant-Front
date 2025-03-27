export default function AboutSection() {
    return (
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-left">
                <h2 className="text-3xl font-serif font-bold mb-2">Notre Histoire</h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-muted-foreground mb-6">
                  Fondé en 2010 par le chef renommé Jean Dupont, notre restaurant s'est rapidement imposé comme une
                  référence gastronomique dans la région. Inspiré par ses voyages à travers le monde et son amour pour les
                  produits locaux, le chef Dupont a créé un lieu où tradition et innovation se rencontrent.
                </p>
                <p className="text-muted-foreground mb-6">
                  Notre philosophie est simple : des ingrédients frais et de saison, préparés avec passion et servis dans
                  une ambiance élégante et chaleureuse. Chaque plat raconte une histoire, celle de notre terroir et de
                  notre engagement pour l'excellence.
                </p>
                <p className="font-medium">
                  "La cuisine est l'art de transformer des ingrédients simples en moments inoubliables." - Chef Jean
                  Dupont
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img src="/placeholder.svg?height=600&width=800" alt="Notre restaurant" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-lg">
                  <p className="font-serif text-xl">Depuis 2010</p>
                  <p className="text-sm">Excellence culinaire</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  