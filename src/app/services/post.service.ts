import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8082/posts';
  baseUrl: any;
  //PUT http://localhost:8082/posts/update/{{id}}

  constructor(private http: HttpClient) { }

  // Récupérer tous les posts
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/list`);
  }

  // Récupérer un post par ID
//  getPostById(id: string): Observable<Post> {
   // return this.http.get<Post>(`${this.apiUrl}/${id}`);
 // }

  // Ajouter un post
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/add`, post);
  }

  // Mettre à jour un post
 // updatePost(id: string, post: Post): Observable<Post> {
 //   return this.http.put<Post>(`${this.apiUrl}/update/${id}`, post);
 // }

  // Supprimer un post
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }
// 'http://localhost:8082/posts';
  //PUT http://localhost:8082/posts/update/{{id}}
  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/update/${post.id}`, post);
  }
  searchPosts(query: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/search?q=${query}`);
  }
  // Mettre à jour le rating d'un post
  updateRating(postId: string, rating: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}/rating?rating=${rating}`, {});
  }
  likePost(id: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}/like`, {});
  }
// ✅ Accepter un post
acceptPost(id: string): Observable<Post> {
  return this.http.put<Post>(`${this.apiUrl}/accepte/${id}`, null);
}

refusePost(id: string): Observable<Post> {
  return this.http.put<Post>(`${this.apiUrl}/refuse/${id}`, null);
}



// 📌 Récupérer tous les posts acceptés
getAcceptedPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/list/accepted`);
}

// ❌ Récupérer tous les posts refusés
getRefusedPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/list/refused`);
}

// ⏳ Récupérer les posts en attente (isApproved = null)
getPendingPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/list/pending`);
}

  // Disliker un post
  dislikePost(id: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}/dislike`, {});
  }
}