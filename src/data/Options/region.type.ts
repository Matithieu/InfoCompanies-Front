/**
 * Enum of all regions in France
 */
export enum Region {
  AuvergneRhoneAlpes = 'Auvergne-Rhône-Alpes',
  BourgogneFrancheComte = 'Bourgogne-Franche-Comté',
  Bretagne = 'Bretagne',
  CentreValDeLoire = 'Centre-Val de Loire',
  Corse = 'Corse',
  GrandEst = 'Grand Est',
  HautsDeFrance = 'Hauts-de-France',
  IleDeFrance = 'Île-de-France',
  Normandie = 'Normandie',
  NouvelleAquitaine = 'Nouvelle-Aquitaine',
  Occitanie = 'Occitanie',
  PaysDeLaLoire = 'Pays de la Loire',
  ProvenceAlpesCoteDAzur = "Provence-Alpes-Côte d'Azur",
  Guadeloupe = 'Guadeloupe',
  Martinique = 'Martinique',
  Guyane = 'Guyane',
  LaReunion = 'La Réunion',
  Mayotte = 'Mayotte',
}

/**
 * List of all regions in France
 */
export const listOfRegions: Region[] = Object.values(Region)
