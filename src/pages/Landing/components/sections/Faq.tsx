import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQProps {
  question: string
  answer: string
  value: string
}

const FAQList: FAQProps[] = [
  {
    question: "Est-ce que ce j'ai besoin de rentrer ma CB ?",
    answer:
      'Non, vous pouvez tester notre plateforme gratuitement sans rentrer vos informations de paiement.',
    value: 'item-1',
  },
  {
    question:
      'Quels types de filtres sont disponibles pour affiner ma recherche ?',
    answer:
      'Notre plateforme propose des filtres par localisation, secteur d’activité, taille d’entreprise, forme juridique et bien plus. Cela vous permet d’obtenir des résultats très précis en fonction de vos besoins.',
    value: 'item-2',
  },
  {
    question:
      'Les informations sur les dirigeants sont-elles mises à jour régulièrement ?',
    answer:
      'Oui, nous mettons à jour les informations régulièrement pour garantir leur exactitude. Les données sont actualisées en fonction des informations publiques et de nos partenariats.',
    value: 'item-3',
  },
  {
    question: 'Puis-je exporter les données des entreprises trouvées ?',
    answer:
      'Pour le moment, l’exportation des données n’est pas disponible dans la version gratuite. Cependant, les utilisateurs premium peuvent accéder à cette fonctionnalité.',
    value: 'item-4',
  },
  {
    question: 'Comment puis-je contacter une entreprise via votre plateforme ?',
    answer:
      'Vous pouvez obtenir les coordonnées de contact suivant: téléphone, e-mail, site web et réseaux sociaux ( LinkedIn, Twitter, Facebook, Instagram) directement dans les résultats.',
    value: 'item-5',
  },
]

export const FAQSection = () => {
  return (
    <section className="container py-24 sm:py-32 md:w-[700px]" id="faq">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          FAQ
        </h2>

        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Questions fréquentes
        </h2>
      </div>

      <Accordion collapsible className="AccordionRoot" type="single">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
