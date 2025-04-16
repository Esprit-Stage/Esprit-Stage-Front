export class Commentaire {
  id!: string;
    content: string;
    timestamp: Date;
    postId: string;  // Identifiant du post auquel ce commentaire appartient
  
    constructor(content: string, timestamp: Date, id: string | null, postId: string) {
      this.content = content;
      this.timestamp = timestamp;
      this.id = this.id || '';  // Si l'ID n'est pas fourni, on le laisse vide
      this.postId = postId;
    }
  }
  