export class Post {
  id: string;
  titre: string;

  content: string;
  imageUrl: string;
  link: string;
  timestamp: Date;
  etudiant: any; // ou l'entité appropriée
  enseignant: any; // ou l'entité appropriée
  isApproved: boolean;
  rating: number; 
  likeCount: number;  // Propriété pour le nombre de likes
  dislikeCount: number;  // Propriété pour le nombre de dislikes
  showComments: boolean = false; 
  
  constructor(
    id: string,
    titre: string,

    content: string,
    imageUrl: string,
    link: string,
    timestamp: Date,
    etudiant: any,
    enseignant: any,
    isApproved: boolean,
    rating: number,
    likeCount: number = 0,  // Initialisation des likes à 0 par défaut
    dislikeCount: number = 0  // Initialisation des dislikes à 0 par défaut
  ) {
    this.id = id;
    this.titre=titre;
    this.content = content;
    this.imageUrl = imageUrl;
    this.link = link;
    this.timestamp = timestamp;
    this.etudiant = etudiant;
    this.enseignant = enseignant;
    this.isApproved = isApproved;
    this.rating = rating;
    this.likeCount = likeCount;
    this.dislikeCount = dislikeCount;
  }
}
