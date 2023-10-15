import React, { useState } from 'react';

const ActivityArea = ({ onActivityAreaChange, selectedValue }) => {
    const activityArea = [
        "Agriculture",
        "Agroalimentaire",
        "Automobile",
        "Aérospatiale et aviation",
        "Banque et services financiers",
        "Bâtiment et construction",
        "Biotechnologie et sciences de la vie",
        "Chimie",
        "Commerce de détail",
        "Communication et médias",
        "Défense et sécurité",
        "Distribution",
        "Éducation et formation",
        "Énergie (électricité, pétrole, gaz)",
        "Environnement et développement durable",
        "Hôtellerie et tourisme",
        "Immobilier",
        "Industrie manufacturière",
        "Informatique et technologie de l'information",
        "Juridique et conseil",
        "Logistique et transport",
        "Marketing et publicité",
        "Pharmaceutique et santé",
        "Services aux entreprises",
        "Sports et loisirs",
        "Télécommunications",
        "Textile et habillement",
        "Vente en ligne et e-commerce",
        "Arts et culture",
        "Secteur public",
        "Secteur associatif",
        "Électronique",
        "Équipements industriels",
        "Finance et investissement",
        "Ingénierie",
        "Assurance",
        "Jeux et divertissements",
        "Médecine et soins de santé",
        "Métallurgie",
        "Plastiques et caoutchoucs",
        "Ressources humaines",
        "Restauration et alimentation",
        "Services environnementaux",
        "Sidérurgie",
        "Technologie propre",
        "Transport maritime et fluvial",
        "Transport ferroviaire",
        "Transport routier",
        "Transport aérien",
        "Énergie renouvelable",
        "Audiovisuel",
        "Construction navale",
        "Cosmétiques et parfums",
        "Éducation supérieure",
        "Fabrication de machines",
        "Gestion des déchets",
        "Imprimerie et édition",
        "Industrie pétrochimique",
        "Industrie pharmaceutique",
        "Informatique de santé",
        "Joaillerie",
        "Laboratoires de recherche",
        "Mode et design",
        "Publicité en ligne",
        "Recherche et développement",
        "Restauration rapide",
        "Services bancaires en ligne",
        "Services de conseil en gestion",
        "Services de sécurité informatique",
        "Services de télécommunications",
        "Services financiers en ligne",
        "Services immobiliers",
        "Services juridiques en ligne",
        "Services publics",
        "Technologies de l'information médicale",
        "Technologies de pointe",
        "Transport public",
        "Vente au détail en ligne",
        "Vente de voitures en ligne",
        "Vente par correspondance",
        "Vins et spiritueux",
        "Aéroports et aviation civile",
        "Agences de voyage",
        "Aménagement paysager",
        "Architecture",
        "Arts du spectacle",
        "Audio et son",
        "Bâtiments commerciaux",
        "Biens de consommation",
        "Centrales électriques",
        "Chaînes de supermarchés",
        "Chirurgie plastique",
        "Construction de routes et d'autoroutes",
        "Construction résidentielle",
        "Écoles de langues",
        "Éducation en ligne",
        "Fabrication automobile",
        "Génie civil",
        "Location de voitures",
        "Musique et divertissement en ligne"
    ];

    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        onActivityAreaChange(e.target.value);
    };

    return (
        <div>
            <input
                style={{
                    borderRadius: 5,
                    fontSize: 17,
                    padding: 5,
                    fontFamily: 'Poppins',
                    textAlign: 'center',
                    border: '1px solid #5A6ACF',
                    color: '#5A6ACF',
                    backgroundColor: 'white',
                    margin: 7,
                    minWidth: '150%',
                    maxWidth: '150%'
                }}
                type="text"
                placeholder="Secteur d'activité"
                value={filterText}
                onChange={handleFilterChange}
                list="activityAreaList" // Lier l'input à la datalist
            />
            <datalist id="activityAreaList"> {/* Créez la datalist */}
                {activityArea.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </datalist>
        </div>
    );
};

export default ActivityArea;