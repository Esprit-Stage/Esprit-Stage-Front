import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Post } from '../models/post.model';
import { Commentaire } from '../models/comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | undefined;
  comments: Commentaire[] = [];
  content: string = ''; // Pour nouveau commentaire
  commentToEditId: string | null = null;
  editContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.getPostDetails(postId);
      this.loadComments(postId);
    }
  }

  getPostDetails(postId: string): void {
    this.postService.getPostById(postId).subscribe({
      next: (data) => this.post = data,
      error: (err) => console.error('Erreur lors du chargement du post', err)
    });
  }

  loadComments(postId: string): void {
    this.commentService.getCommentsByPost(postId).subscribe({
      next: (data) => this.comments = data,
      error: (err) => console.error('Erreur lors du chargement des commentaires', err)
    });
  }

  addComment(postId: string): void {
    if (!this.content.trim()) return;

    const newComment: Partial<Commentaire> = {
      content: this.content,
      timestamp: new Date(),
      postId
    };

    this.commentService.addCommentToPost(postId, newComment).subscribe({
      next: (savedComment) => {
        this.comments.push(savedComment);
        this.content = '';
      },
      error: (err) => console.error('Erreur lors de l\'ajout du commentaire', err)
    });
  }

  editComment(commentId: string, content: string): void {
    this.commentToEditId = commentId;
    this.editContent = content;
  }

  saveEditedComment(): void {
    if (!this.editContent.trim() || !this.commentToEditId || !this.post) return;

    const updatedComment: Commentaire = {
      id: this.commentToEditId,
      content: this.editContent,
      timestamp: new Date(),
      postId: this.post.id
    };
    console.log('✏️ Mise à jour du commentaire :', updatedComment);

    this.commentService.updateComment(updatedComment).subscribe({
      
      next: (updated) => {
        const index = this.comments.findIndex(c => c.id === updated.id);
        if (index !== -1) {
          this.comments[index] = updated;
        }
        this.cancelEdit();
      },
      error: (err) => console.error('Erreur lors de la mise à jour du commentaire', err)
    });
  }

  cancelEdit(): void {
    this.commentToEditId = null;
    this.editContent = '';
  }

  deleteComment(commentId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce commentaire ?') && this.post) {
      this.commentService.deleteComment(commentId).subscribe(
        () => {
          console.log('✅ Commentaire supprimé avec succès');
          if (this.post?.id) {
            this.loadComments(this.post.id);
          }
                  },
        (error) => {
          console.error('❌ Erreur lors de la suppression du commentaire', error);
        }
      );
    }
  }
  
  
  likePost(postId: string): void {
    if (this.post) {
      this.postService.likePost(postId).subscribe(() => {
        this.getPostDetails(postId); // Recharger les détails du post pour mettre à jour la note.
      });
    }
  }

  dislikePost(postId: string): void {
    if (this.post) {
      this.postService.dislikePost(postId).subscribe(() => {
        this.getPostDetails(postId); // Recharger les détails du post pour mettre à jour la note.
      });
    }
  }
  
  
  goBackToList(): void {
    window.history.back();
  }}