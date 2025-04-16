import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8082/commentaires';
  baseUrl: any;

  constructor(private http: HttpClient) { }

  // 🔁 Obtenir tous les commentaires d’un post
  getCommentsByPost(postId: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/post/${postId}`);
  }

  // ➕ Ajouter un commentaire à un post
  addCommentToPost(postId: string, comment: Partial<Commentaire>): Observable<Commentaire> {
    return this.http.post<Commentaire>(`${this.apiUrl}/post/${postId}`, comment);
  }

  // ✏️ Mettre à jour un commentaire
  updateComment(comment: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiUrl}/update/${comment.id}`, comment);
  }

  // ❌ Supprimer un commentaire (corrigé)
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${commentId}`);
  }

  // 🔍 Récupérer un commentaire par son ID 
  getCommentById(commentId: string): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.apiUrl}/${commentId}`);
  }
}
