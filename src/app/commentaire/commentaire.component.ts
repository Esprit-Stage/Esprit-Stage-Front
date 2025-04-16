import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commentaire } from '../models/comment.model';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  @Input() postId!: string;

  content: string = '';
  comments: Commentaire[] = [];

  // Pour modification
  commentToEditId: string | null = null;
  editContent: string = '';

  constructor(
    private commentaireService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.postId) {
      this.loadComments();
    }
  }

  // 🔄 Charger les commentaires du post
  loadComments(): void {
    this.commentaireService.getCommentsByPost(this.postId).subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => console.error('Erreur de chargement des commentaires', err)
    });
  }

  // ➕ Ajouter un nouveau commentaire
  addComment(): void {
    if (this.content.trim()) {
      const newComment: Partial<Commentaire> = {
        content: this.content,
        timestamp: new Date(),
        postId: this.postId
      };

      this.commentaireService.addCommentToPost(this.postId, newComment).subscribe({
        next: () => {
          this.content = '';
          this.loadComments(); // Recharger la liste après ajout
        },
        error: (err) => console.error('Erreur lors de l\'ajout du commentaire', err)
      });
    }
  }

  // ❌ Supprimer un commentaire avec confirmation
  deleteComment(commentId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.commentaireService.deleteComment(commentId).subscribe({
        next: () => {
          console.log('Commentaire supprimé');
          this.loadComments(); // Recharger la liste après suppression
        },
        error: (err) => console.error('Erreur lors de la suppression du commentaire', err)
      });
    }
  }

  // ✏️ Activer le mode édition
  editComment(commentId: string, currentContent: string): void {
    this.commentToEditId = commentId;
    this.editContent = currentContent;
  }

  // ✅ Sauvegarder le commentaire modifié
  saveEditedComment(): void {
    if (!this.editContent.trim() || !this.commentToEditId) return;

    const updatedComment: Commentaire = {
      id: this.commentToEditId,
      content: this.editContent,
      postId: this.postId,
      timestamp: new Date()
    };

this.commentaireService.updateComment(updatedComment).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadComments(); // Recharger la liste après modification
      },
      error: (err) => console.error('Erreur lors de la mise à jour du commentaire', err)
    });
  }

  // ❎ Annuler l’édition
  cancelEdit(): void {
    this.commentToEditId = null;
    this.editContent = '';
  }
}